# Imports
from flask import Flask, request, jsonify  # Flask web framework
from dotenv import load_dotenv  # For loading environment variables
import os  # For accessing environment variables
import requests  # For making HTTP requests to Gemini API

# Load environment variables from .env file
load_dotenv()

# Flask app initialization
app = Flask(__name__)

# Read Gemini API key from environment
GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

@app.route('/recommend', methods=['POST'])
def recommend_outfit() -> 'flask.Response':
    data = request.get_json()
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({"error": "Missing prompt"}), 400
    try:
        gemini_response = call_gemini_api(prompt)
        if not gemini_response:
            return jsonify({"error": "Gemini API returned no response"}), 502
        outfit = parse_gemini_response(gemini_response)
        return jsonify(outfit)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def call_gemini_api(prompt: str) -> dict:
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{
            "role": "user",
            "parts": [{"text": f"You are a fashion assistant. Given this prompt: '{prompt}', suggest an outfit in this format:\n\nTitle: <name>\nTop: <item>\nBottom: <item>\nShoes: <item>\nAccessories: <items>\nTip: <style tip>"}]
        }]
    }
    params = {"key": GEMINI_API_KEY}
    response = requests.post(url, headers=headers, params=params, json=payload, timeout=15)
    response.raise_for_status()
    return response.json()

def parse_gemini_response(response: dict) -> dict:
    # Try to extract the text from the Gemini response
    try:
        text = response["candidates"][0]["content"]["parts"][0]["text"]
    except Exception:
        return {"error": "Malformed Gemini response"}
    # Parse the text into structured fields
    lines = text.split('\n')
    result = {"title": "", "top": "", "bottom": "", "shoes": "", "accessories": "", "tip": ""}
    for line in lines:
        if line.lower().startswith("title:"):
            result["title"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("top:"):
            result["top"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("bottom:"):
            result["bottom"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("shoes:"):
            result["shoes"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("accessories:"):
            result["accessories"] = line.split(":", 1)[1].strip()
        elif line.lower().startswith("tip:"):
            result["tip"] = line.split(":", 1)[1].strip()
    return result 