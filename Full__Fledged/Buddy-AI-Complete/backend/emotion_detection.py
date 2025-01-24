import cv2
import time
from deepface import DeepFace
import json
import sys

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print(json.dumps({"error": "Could not open webcam"}))
    sys.exit()

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
# Filtered emotion set for tracking only required emotions
emotion_data = {emotion: 0 for emotion in ["happy", "sad", "angry", "fear"]}
frame_count = 0
start_time = time.time()

while True:
    ret, frame = cap.read()
    if not ret:
        print(json.dumps({"error": "Failed to grab frame"}))
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) > 0:
        for (x, y, w, h) in faces:
            face = frame[y:y + h, x:x + w]
            analysis = DeepFace.analyze(face, actions=['emotion'], enforce_detection=False)
            emotions = analysis[0]['emotion']

            # Only increment values for the specified emotions
            for emotion in ["happy", "sad", "angry", "fear"]:
                if emotion in emotions:
                    emotion_data[emotion] += emotions[emotion]
            frame_count += 1

    elapsed_time = time.time() - start_time
    if elapsed_time >= 5:
        avg_emotions = {emotion: emotion_data[emotion] / frame_count for emotion in emotion_data}
        dominant_emotion = max(avg_emotions, key=avg_emotions.get)
        output = {"emotions": avg_emotions, "dominant_emotion": dominant_emotion}

        print(json.dumps(output))  # Output emotion data to be captured by Node.js backend
        sys.stdout.flush()  # Ensure immediate output
        emotion_data = {emotion: 0 for emotion in emotion_data}
        frame_count = 0
        start_time = time.time()

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
