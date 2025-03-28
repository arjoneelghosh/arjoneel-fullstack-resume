from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_input = data.get("message", "")

    try:
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://your-site.com",  # Optional for public OpenRouter listing
            "Content-Type": "application/json"
        }

        payload = {
            "model": "mistralai/mistral-7b-instruct",  # Free and fast
            "messages": [
                {
                    "role": "system",
                    "content": "You are Arjoneel Ghosh's AI representative. Help users understand his background, projects, and skills. You may reply in English, Hindi, or Bengali based on the input."
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            "temperature": 0.7
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()

        reply = response.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
