import os
import sys
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
if not API_KEY:
    raise ValueError("API_KEY is missing in the environment variables.")

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

def generate_questions(text, number, type, level, topic):
    question_prompt = f"""
    Imagine you are a teacher who has explained the topic {topic} from the above text to a 20-year-old student. Now refer to the above text and frame {number} {level} level {type} questions in the below format. Please avoid any additional text, instructions, or characters like "*" or "#", etc. in your response. Provide the response in the format below without any additional text or characters or newline characters.don't want any newline characters at the end.
    What is the name of the Red Hat tool that allows you to boot a system from a network?
    What is the purpose of using redboot?
    """
    response = chat_session.send_message(text + question_prompt)
    return response.candidates[0].content.parts[0].text.strip()

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python qanda.py <numQuestions> <type> <level> <concept>")
        sys.exit(1)

    numQuestions = int(sys.argv[1])
    type = sys.argv[2]
    level = sys.argv[3]
    concept = sys.argv[4]

    sample_text = "Your sample text goes here."  # Ideally, you should get this text from somewhere or pass it as an argument
    questions = generate_questions(sample_text, numQuestions, type, level, concept)
    print(questions)
