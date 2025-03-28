from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    user_input = data.get("message", "")

    try:
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are Arjoneel Ghosh's AI representative. Help users understand his background, projects, and experience. You can respond in English, Hindi, and Bengali."
                },
                {
                    "role": "user",
                    "content": user_input
                }
            ],
            temperature=0.7
        )

        reply = response.choices[0].message.content
        return jsonify({"reply": reply})

    except Exception as e:
        return jsonify({"reply": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
