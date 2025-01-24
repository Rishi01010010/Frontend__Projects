# analogy.py
import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel(model_name="gemini-1.5-flash", generation_config={"temperature": 0.1, "max_output_tokens": 10000})

def generate_analogy(text, concept):
    prompt = f"Provide an analogy to explain {concept}."
    response = model.start_chat().send_message(prompt + text)
    return response.candidates[0].content.parts[0].text

if __name__ == "__main__":
    concept = sys.argv[1]
    file_path = sys.argv[2]
    with open(file_path, 'r') as file:
        concatenated_text = file.read().strip()
    print(generate_analogy(concatenated_text, concept))
