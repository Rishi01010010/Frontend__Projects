import os
import json
import google.generativeai as genai
from dotenv import load_dotenv
import sys

load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)
generation_config = {
    "temperature": 0.1,        # Lower temperature reduces randomness
    "top_p": 1.0,              # Setting top_p to 1 disables nucleus sampling
    "top_k": 0,                # Setting top_k to 0 disables top-k sampling
    "max_output_tokens": 10000,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
chat_session = model.start_chat(history=[])

def evaluate_answers(prompt):
    response = chat_session.send_message(prompt)
    return response.candidates[0].content.parts[0].text

if __name__ == "__main__":
    input_data = sys.stdin.read()
    data = json.loads(input_data)
    prompt = data['prompt']
    evaluation = evaluate_answers(prompt)
    print(evaluation)
    # print(prompt)
    
