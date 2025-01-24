from flask import Flask, request, jsonify
import os
import imp_concepts
import topicexplain
import doubtchat
import qanda
import evaluate

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload():
    if 'pdfFile' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['pdfFile']
    file_path = os.path.join('uploads', file.filename)
    file.save(file_path)
    
    concepts = imp_concepts.get_important_concepts(file_path, imp_concepts.question)
    return jsonify({'concepts': concepts})

@app.route('/explain', methods=['GET'])
def explain():
    concept = request.args.get('concept')
    explanation = topicexplain.get_explanation(concept)
    return jsonify({'explanation': explanation})

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get('question')
    concept = data.get('concept')
    answer = doubtchat.answer_question(concept, question)
    return jsonify({'answer': answer})

@app.route('/test', methods=['POST'])
def test():
    data = request.get_json()
    num_questions = data.get('numQuestions')
    question_type = data.get('type')
    difficulty_level = data.get('level')
    concept = data.get('concept')
    
    questions = qanda.generate_questions(concept, num_questions, question_type, difficulty_level)
    return jsonify({'questions': questions})

@app.route('/evaluate', methods=['POST'])
def evaluate_answers():
    data = request.get_json()
    answers = data.get('answers')
    evaluation = evaluate.evaluate_answers(answers)
    return jsonify({'evaluation': evaluation})

if __name__ == '__main__':
    app.run(debug=True)
