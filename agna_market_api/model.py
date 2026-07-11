import requests, base64, os

from finalize import make_fast_payload
from finalize import generate_analysis
import time
invoke_url = "https://integrate.api.nvidia.com/v1/chat/completions"
stream = False

COMMODITY = 'Potato'
STATE = 'Andhra Pradesh'
MARKET = 'Palamaner APMC'
LANGUAGE = 'Telugu'

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

# Madanapalle Area
LATITUDE = 13.552040
LONGITUDE = 78.505798

def call_gemma(commodity, state, market, latitude, longitude, language="Telugu"):
    gemma_payload = generate_analysis(commodity, state, market, latitude, longitude, language)
    payload_text = make_fast_payload(gemma_payload)
    headers = {
      "Authorization": f"Bearer {NVIDIA_API_KEY}",
      "Accept": "text/event-stream" if stream else "application/json"
    }

    system_prompt = f"""You are Mandi Mitra, a practical agricultural advisory assistant 
    who advices in {language} Language for Indian farmers. Use only verified context. 
    The recommended_decision is authoritative; do not change it.
    Do not predict future prices or invent facts."""

    user_prompt = f"""
    Write a concise farmer advisory from the verified context in {language} language.

    Start with the direct decision.
    Give 2–3 short reasons using actual numbers.
    Give exactly 3 actions for today.
    Include one caution.
    Maximum 150 {language} words.
    Do not return JSON or a table.
    
    VERIFIED CONTEXT:
    {payload_text}
    """

    messages = [{"role":"system", "content": system_prompt},
                {"role":"user", "content": user_prompt}
    ]

    payload = {
      "model": "google/gemma-3n-e4b-it",
      "messages": messages,
      "max_tokens": 256,
      "temperature": 0.20,
      "top_p": 0.70,
      "frequency_penalty": 0.00,
      "presence_penalty": 0.00,
      "stream": stream
    }

    response = requests.post(invoke_url, headers=headers, json=payload)

    if stream:
        for line in response.iter_lines():
            if line:
                print(line.decode("utf-8"))
        return None
    else:
        return response.json()

start = time.time()
print(call_gemma(commodity=COMMODITY, state=STATE, market=MARKET, latitude=LATITUDE, longitude=LONGITUDE, language=LANGUAGE))
end = time.time()

print("Total Time: ", end - start)