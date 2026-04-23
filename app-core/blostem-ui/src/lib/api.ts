import { createClient } from "./supabase";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const headers = new Headers(options.headers);
  if (session?.access_token) {
    console.log("Auth: Token found, attaching to request.");
    headers.set("Authorization", `Bearer ${session.access_token}`);
  } else {
    console.warn("Auth: No active session found. Request will be unauthenticated.");
  }
  
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
}
