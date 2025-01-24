import os
import sys
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=API_KEY)
generation_config = {
    "temperature": 0.1,
    "top_p": 1.0,
    "top_k": 0,
    "max_output_tokens": 10000,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)
chat_session = model.start_chat(history=[])

def get_explanation(text, concept):
    question = f"""
    Imagine you are a teacher explaining the topic {concept} from the below text to a 20-year-old student.

Refer to the below text completely and explain the concept in depth at an intermediate level (not too easy, not too complex).
Explain each and every important point mentioned about the {concept} in the text.

I want the response  to contain only the 4 fields they are explanation, analogy, example, flowchart(mermaid code) all seperated by a "***".
I am using your response in a code so no extra characters please.
The response should not contain any "*" or "#" or any highlighted headings like * **Definition:**
Please avoid overloading with extra information and do not include any additional introductory text or characters like "*" or "#", etc.
Please use simple terms for in-depth explanation.

Make sure to return the response in the below format.

"
 Explanation: Pluripotent stem cells are like master cells that have the potential to develop into almost any type of cell in the body. They can be guided to become specialized cells, like muscle cells, nerve cells, or blood cells. Pluripotent stem cells are undifferentiated cells that can self-renew and differentiate into various cell types, except for cells that make up the placenta. They hold great promise for treating diseases and injuries by replacing damaged or diseased cells.***
Example: Embryonic stem cells are a type of pluripotent stem cell found in early embryos. These cells have the potential to develop into any cell type in the body.***
Analogy: Imagine a tree. The seed is like a pluripotent stem cell. It has the potential to grow into a whole tree with branches, leaves, and roots. The seed can be guided to develop into different parts of the tree depending on the environment and signals it receives.***
graph TD
A[Pluripotent Stem Cells] --> B[Muscle Cells]
A --> C[Nerve Cells]
A --> D[Blood Cells]
A --> E[Other Cell Types]
A --> F[Not Placenta Cells]
A --> G[Self-Renewal]
A --> H[Differentiation]
H --> B
H --> C
H --> D
H --> E

    please don't give the full mermaid code in a single line, give it correctly after double checking add all the characters that is required.
    add the newline characters properly wherever it is required.
Text:
{text}
    """
    response = chat_session.send_message(question)
    return response.candidates[0].content.parts[0].text

if __name__ == "__main__":
    concept = sys.argv[1]
    file_path = sys.argv[2]

    # Read the concatenated text from the file
    with open(file_path, 'r', encoding='utf-8') as file:
        concatenated_text = file.read().strip()

    explanation = get_explanation(concatenated_text, concept)
    
    # Ensure output is printed in utf-8 encoding
    sys.stdout.buffer.write(explanation.encode('utf-8'))
