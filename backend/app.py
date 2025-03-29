from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# Load static content from markdown files
def load_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

PROJECTS = load_file("backend/data/projects.md")
CERTIFICATIONS = load_file("backend/data/certifications.md")
VOLUNTEERING = load_file("backend/data/volunteering.md")

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_input = data.get("message", "")

    try:
        system_prompt = f"""
You are Arjoneel Ghosh's AI representative. Use the following verified information to answer questions about him.

### Projects
{PROJECTS}

### Certifications
{CERTIFICATIONS}

### Volunteering and Leadership
{VOLUNTEERING}

You may reply in English, Hindi, or Bengali based on user input.
"""

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://your-site.com",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "mistralai/mistral-7b-instruct",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_input}
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
