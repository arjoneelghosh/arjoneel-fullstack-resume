from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

# Get your OpenRouter API key from environment variable
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json(force=True)  # Parses JSON safely
        if not data or "message" not in data:
            return jsonify({"reply": "Invalid request: No message provided."}), 400

        user_input = data["message"]

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://arjoneel.vercel.app/",
            "X-Title": "Arjoneel's Resume Assistant"
        }

        payload = {
            "model": "openrouter/auto",  # You can use 'mistralai/mixtral' or other OpenRouter models
            "messages": [
                {"role": "system", "content": "You are Arjoneel Ghosh's AI representative. Help users understand his projects, resume, and career background. Answer in English, Hindi, or Bengali as needed."},
                {"role": "user", "content": user_input}
            ]
        }

        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()

        ai_reply = response.json()["choices"][0]["message"]["content"]

        return jsonify({"reply": ai_reply})

    except requests.exceptions.HTTPError as e:
        return jsonify({"reply": f"API Error: {str(e)}"}), 500
    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
