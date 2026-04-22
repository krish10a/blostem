import os
import jwt
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
import httpx

load_dotenv()

# Configuration
SUPABASE_JWT_SECRET = os.getenv("SUPABASE_JWT_SECRET")
SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")

security = HTTPBearer()

# JWKS Cache for asymmetric keys (ES256)
_jwks_cache = None

async def get_jwks():
    """Fetches the JSON Web Key Set from Supabase auth service."""
    global _jwks_cache
    if _jwks_cache:
        return _jwks_cache
    
    if not SUPABASE_URL:
        print("Auth Warning: SUPABASE_URL not set, cannot fetch JWKS")
        return None
        
    try:
        # Ensure URL is clean
        base_url = SUPABASE_URL.strip().rstrip('/')
        url = f"{base_url}/auth/v1/.well-known/jwks.json"
        
        async with httpx.AsyncClient() as client:
            resp = await client.get(url, timeout=10.0)
            if resp.status_code == 200:
                _jwks_cache = resp.json()
                print("Successfully fetched and cached JWKS from Supabase")
                return _jwks_cache
            else:
                print(f"JWKS Fetch Failed: HTTP {resp.status_code} from {url}")
    except Exception as e:
        print(f"JWKS Fetch Exception: {str(e)}")
    return None

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """
    Validates the Supabase JWT. 
    Supports both legacy HS256 (using secret) and modern ES256 (using JWKS).
    """
    token = credentials.credentials
    try:
        # 1. Inspect header to determine the signing algorithm
        try:
            header = jwt.get_unverified_header(token)
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid token format")
            
        alg = header.get("alg")
        kid = header.get("kid")

        if alg == "HS256":
            # Symmetric key validation
            if not SUPABASE_JWT_SECRET:
                print("Error: HS256 token received but SUPABASE_JWT_SECRET is not configured")
                raise HTTPException(status_code=500, detail="Backend configuration error (Secret missing)")
            
            payload = jwt.decode(
                token, 
                SUPABASE_JWT_SECRET, 
                algorithms=["HS256"], 
                options={"verify_aud": False}
            )
            
        elif alg == "ES256":
            # Asymmetric key validation (standard for new Supabase projects)
            jwks = await get_jwks()
            if not jwks:
                raise HTTPException(status_code=500, detail="Authentication service temporarily unavailable (JWKS)")
            
            # Find the specific public key used to sign this token
            key_data = next((k for k in jwks.get("keys", []) if k.get("kid") == kid), None)
            if not key_data:
                # If no kid match, the token might be from a different project or rotated
                raise HTTPException(status_code=401, detail="Token signed by unknown authority")
            
            # Convert JWK dict to a usable public key object
            from jwt import PyJWK
            jwk_key = PyJWK.from_dict(key_data)
            
            payload = jwt.decode(
                token,
                jwk_key.key,
                algorithms=["ES256"],
                options={"verify_aud": False}
            )
        else:
            raise HTTPException(status_code=401, detail=f"Unsupported signing algorithm: {alg}")

        # Basic payload verification
        if not payload.get("sub"):
            raise HTTPException(status_code=401, detail="Token payload missing subject")
            
        return payload

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Authentication token has expired")
    except jwt.InvalidTokenError as e:
        print(f"JWT Validation Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Authentication failed: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        print(f"Auth Unexpected Error: {str(e)}")
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication failed")

def get_owner_id(current_user: dict = Depends(get_current_user)) -> str:
    """Helper to extract the Supabase User ID (sub) from the payload."""
    return current_user.get("sub")
