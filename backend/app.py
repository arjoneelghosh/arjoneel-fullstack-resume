from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Compute absolute base directory for this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_file(filename):
    """
    Loads and returns the content of a file located in backend/data/.
    """
    full_path = os.path.join(BASE_DIR, "data", filename)
    with open(full_path, "r", encoding="utf-8") as f:
        return f.read()

# Load all grounding content from markdown files
RESUME = load_file("resume.md")
PROJECTS = load_file("projects.md")
CERTIFICATIONS = load_file("certifications.md")
VOLUNTEERING = load_file("volunteering.md")

@app.route('/api/chat', methods=['POST'])
def chat():
    # Parse JSON request body; force parsing in case headers are not perfect
    data = request.get_json(force=True)
    if not data or "message" not in data:
        return jsonify({"reply": "Invalid request: 'message' field is missing."}), 400

    user_input = data["message"]

    # Build system prompt with all relevant info
    system_prompt = f"""
You are Arjoneel Ghosh's AI representative. Use the following verified and structured information to answer any questions about him.

### Resume
{RESUME}

### Projects
{PROJECTS}

### Certifications
{CERTIFICATIONS}

### Volunteering and Leadership
{VOLUNTEERING}

Always ground your answers in the above data. Respond professionally and clearly in English, Hindi, or Bengali depending on the user's input.
"""

    headers = {
        "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-frontend-domain.com"  # optional
    }

    payload = {
        "model": "mistralai/mistral-7b-instruct",  # free model via OpenRouter
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input}
        ],
        "temperature": 0.7
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=payload)
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        print("Error in /api/chat:", e)
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)
