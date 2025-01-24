import sys
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)
generation_config = {
    "temperature": 0.0,        # Lower temperature reduces randomness
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

def answer_question(conversation_history, question):
    response = chat_session.send_message(conversation_history + "\nUser: " + question)
    return response.candidates[0].content.parts[0].text

if __name__ == "__main__":
    explanation = sys.argv[4]
    concept = sys.argv[2]
    file_path = sys.argv[3]
    question = sys.argv[1]
    conversation_history = sys.argv[5]

    with open(file_path, 'r', encoding='utf-8') as file:
        concatenated_text = file.read().strip()

    text = f"""Please keep your responses concise, ideally no longer than two lines unless necessary.
    Refer to the below text:
    {concatenated_text}

    Also refer to your explanation on the topic {concept}: 
    {explanation}.

    \n\nI'll be asking some questions regarding this concept. Please answer the following question about '{concept}':\n"""
    conversation_history += text + "User: " + question + "\nBot: "
    answer = answer_question(conversation_history, question)
    print(answer)
