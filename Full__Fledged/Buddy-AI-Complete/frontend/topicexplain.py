# import cv2
# import time
# from deepface import DeepFace
# import numpy as np

# # Initialize video capture (use 0 for default webcam)
# cap = cv2.VideoCapture(0)

# # Ensure the webcam is open
# if not cap.isOpened():
#     print("Error: Could not open webcam.")
#     exit()

# # Time tracking variables
# start_time = time.time()

# # To store cumulative emotion probabilities
# emotion_data = {
#     "angry": 0,
#     "disgust": 0,
#     "fear": 0,
#     "happy": 0,
#     "sad": 0,
#     "surprise": 0,
#     "neutral": 0
# }

# frame_count = 0

# while True:
#     ret, frame = cap.read()
#     if not ret:
#         print("Failed to grab frame.")
#         break

#     # Convert the frame to grayscale
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Load pre-trained face detection model from OpenCV
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

#     # Detect faces in the frame
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     if len(faces) > 0:
#         for (x, y, w, h) in faces:
#             # Draw rectangle around the face
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

#             # Crop face from the frame for emotion analysis
#             face = frame[y:y + h, x:x + w]
            
#             # Perform emotion analysis
#             analysis = DeepFace.analyze(face, actions=['emotion'], enforce_detection=False)

#             # Get emotion probabilities
#             emotions = analysis[0]['emotion']

#             # Accumulate emotion probabilities
#             for emotion, probability in emotions.items():
#                 emotion_data[emotion] += probability

#             # Increase frame count
#             frame_count += 1

#     # Show the image
#     cv2.imshow("Face Detection and Emotion Analysis", frame)

#     # Check if 30 seconds have passed to compute the average
#     elapsed_time = time.time() - start_time
#     if elapsed_time >= 30:
#         start_time = time.time()

#         # Compute average emotion probabilities over the last 30 seconds
#         avg_emotions = {emotion: emotion_data[emotion] / frame_count for emotion in emotion_data}

#         # Display the results in the desired format
#         print([{'emotion': avg_emotions, 'dominant_emotion': max(avg_emotions, key=avg_emotions.get)}])

#         # Reset emotion data and frame count for the next 30 seconds
#         emotion_data = {emotion: 0 for emotion in emotion_data}
#         frame_count = 0

#     # Break the loop if 'q' is pressed
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# # Release the capture and close the window
# cap.release()
# cv2.destroyAllWindows()





import cv2
import time
from deepface import DeepFace
import numpy as np

# Initialize video capture (use 0 for default webcam)
cap = cv2.VideoCapture(0)

# Ensure the webcam is open
if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

# Time tracking variables
start_time = time.time()

# To store cumulative emotion probabilities
emotion_data = {
    "angry": 0,
    "disgust": 0,
    "fear": 0,
    "happy": 0,
    "sad": 0,
    "surprise": 0,
    "neutral": 0
}

frame_count = 0

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame.")
        break

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Load pre-trained face detection model from OpenCV
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) > 0:
        for (x, y, w, h) in faces:
            # Draw rectangle around the face
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Crop face from the frame for emotion analysis
            face = frame[y:y + h, x:x + w]
            
            # Perform emotion analysis
            analysis = DeepFace.analyze(face, actions=['emotion'], enforce_detection=False)

            # Get emotion probabilities
            emotions = analysis[0]['emotion']

            # Accumulate emotion probabilities
            for emotion, probability in emotions.items():
                emotion_data[emotion] += probability

            # Increase frame count
            frame_count += 1

    # Show the image
    cv2.imshow("Face Detection and Emotion Analysis", frame)

    # Check if 30 seconds have passed to compute the average
    elapsed_time = time.time() - start_time
    if elapsed_time >= 30:
        start_time = time.time()

        # Compute average emotion probabilities over the last 30 seconds
        avg_emotions = {emotion: emotion_data[emotion] / frame_count for emotion in emotion_data}

        # Display the results in the desired format
        print([{'emotion': avg_emotions, 'dominant_emotion': max(avg_emotions, key=avg_emotions.get)}])

        # Reset emotion data and frame count for the next 30 seconds
        emotion_data = {emotion: 0 for emotion in emotion_data}
        frame_count = 0

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close the window
cap.release()
cv2.destroyAllWindows()
