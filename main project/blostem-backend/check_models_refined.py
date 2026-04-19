import os
from google import genai
from dotenv import load_dotenv

load_dotenv()
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

try:
    print("Listing all available models...")
    models = client.models.list()
    for m in models:
        # Check for flash or pro in the ID
        if "flash" in m.name.lower() or "pro" in m.name.lower():
            print(f"Model ID: {m.name}, Display: {m.display_name}")
except Exception as e:
    print(f"Error listing models: {e}")
