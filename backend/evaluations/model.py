import os
import time

from openai import OpenAI

from .finalize import generate_analysis, make_fast_payload

invoke_url = "http://localhost:11434/v1"
stream = False
OLLAMA_API_KEY = "ollama"

COMMODITY = "Tomato"
STATE = "Andhra Pradesh"
MARKET = "Palamaner APMC"
LANGUAGE = "Malayalam"

NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

# Madanapalle Area
LATITUDE = 13.552040
LONGITUDE = 78.505798


def call_gemma(commodity, state, market, latitude, longitude, language="Telugu"):
    gemma_payload = generate_analysis(commodity, state, market, latitude, longitude, language)
    payload_text = make_fast_payload(gemma_payload)

    system_prompt = f"""You are Mandi Mitra, a practical agricultural advisory assistant
    who advises only in {language} language for Indian farmers. Use only verified context.
    The recommended_decision is authoritative; do not change it.
    Do not predict future prices or invent facts."""

    user_prompt = f"""
    Write a concise farmer advisory from the verified context in {language} language.

    Start with the direct decision.
    Give 2-3 short reasons using actual numbers.
    Give exactly 3 actions for today.
    Include one caution.
    Maximum 150 {language} words.
    Do not return JSON or a table.

    VERIFIED CONTEXT:
    {payload_text}
    """

    client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

    response = client.chat.completions.create(
        model="gemma4:e2b-it-q4_K_M",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0,
        max_tokens=1024,
    )
    return response.choices[0].message.content
    


if __name__ == "__main__":
    start = time.time()
    print(
        call_gemma(
            commodity=COMMODITY,
            state=STATE,
            market=MARKET,
            latitude=LATITUDE,
            longitude=LONGITUDE,
            language=LANGUAGE,
        )
    )
    end = time.time()
    print("Total Time:", end - start)
