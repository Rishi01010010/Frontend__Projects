from flask import Flask, render_template, request, jsonify
import os
from werkzeug.utils import secure_filename
from PIL import Image
import pytesseract
import language_tool_python
import google.generativeai as genai
from dotenv import load_dotenv

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Load environment variables and configure Gemini
load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=gemini_api_key)

# Setup generation configuration
generation_config = {
    "temperature": 0.5,
    "max_output_tokens": 200,
    "response_mime_type": "text/plain",
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if file and allowed_file(file.filename):
        try:
            # Save the uploaded file
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Extract text
            extracted_text = extract_text(filepath)
            
            # Correct text
            corrected_text = correct_text(extracted_text)
            
            # Summarize text
            summarized_text = summarize_text_with_gemini(corrected_text)
            
            # Clean up uploaded file
            os.remove(filepath)
            
            return jsonify({
                'extracted_text': extracted_text,
                'corrected_text': corrected_text,
                'summarized_text': summarized_text
            })
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    return jsonify({'error': 'Invalid file type'}), 400

# Your existing functions remain the same
def extract_text(image_path):
    """Extract text from image using pytesseract"""
    image = Image.open(image_path)
    text = pytesseract.image_to_string(image)
    return text

def correct_text(input_text):
    """Correct text using LanguageTool"""
    tool = language_tool_python.LanguageTool('en-US')
    matches = tool.check(input_text)
    return language_tool_python.utils.correct(input_text, matches)

def summarize_text_with_gemini(text):
    """Summarize text using Gemini"""
    summary_prompt = f"Refer and analyze the given text and draw a simple summary out of this text in simpler words:\n\n{text}"
    model = genai.GenerativeModel(model_name="gemini-1.5-flash", generation_config=generation_config)
    chat_session = model.start_chat(history=[])
    summary_response = chat_session.send_message(summary_prompt)
    return summary_response.text

if __name__ == '__main__':
    app.run(debug=True)