import os
from PyPDF2 import PdfReader
import google.generativeai as genai
from dotenv import load_dotenv
import json

# Load environment variables
load_dotenv()

# Configure Google Generative AI
API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)

generation_config = {
    "temperature": 0.1,        # Lower temperature reduces randomness
    "top_p": 1.0,              # Setting top_p to 1 disables nucleus sampling
    "top_k": 0,                # Setting top_k to 0 disables top-k sampling
    "max_output_tokens": 20000,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

chat_session = model.start_chat(history=[])

# The path to the PDF file should be passed as a command-line argument
import sys
if len(sys.argv) != 2:
    raise ValueError("Please provide the path to the PDF file.")
file_path = sys.argv[1]

# Question prompt
question = """List down the important concepts mentioned in this text in the below format.
Make sure that you don't repeat the topics/concepts twice or more.
1. Tom
2. Jerry
3. Bob
without any additional text"""

def get_pdf_page_count(file_path):
    try:
        with open(file_path, 'rb') as file:
            pdf = PdfReader(file)
            return len(pdf.pages)
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def extract_pdf_text_and_store(file_path):
    page_count = get_pdf_page_count(file_path)
    if page_count is None:
        return page_count
    
    concatenated_text = ""
    try:
        with open(file_path, 'rb') as file:
            pdf = PdfReader(file)
            for i in range(page_count):
                page_text = pdf.pages[i].extract_text()
                concatenated_text += page_text + " "
    except Exception as e:
        print(f"An error occurred while extracting text: {e}")
    return concatenated_text.strip()

def get_important_concepts(file_path, question):
    concatenated_text = extract_pdf_text_and_store(file_path)
    response = chat_session.send_message(concatenated_text + " " + question)
    concepts = response.candidates[0].content.parts[0].text.split('\n')
    return [concept.strip() for concept in concepts if concept.strip()], concatenated_text

# Example usage
if __name__ == "__main__":
    important_concepts, concatenated_text = get_important_concepts(file_path, question)
    output = {
        "concepts": important_concepts,
        "concatenatedText": concatenated_text
    }
    print(json.dumps(output))
