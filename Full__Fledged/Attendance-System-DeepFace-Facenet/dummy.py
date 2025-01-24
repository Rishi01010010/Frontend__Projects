import sys
import mysql.connector
import json
from PIL import Image
import io
from deepface import DeepFace


class_photo_path ="C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\Srujala.jpeg"




student_image_path = "C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\WhatsApp Image 2024-05-23 at 12.17.02.jpeg"

result = DeepFace.verify(img1_path=class_photo_path, img2_path=student_image_path, model_name='Facenet', detector_backend='opencv')

if result['verified']:
    print("-------------------------")
    print("-------------------------")
    print('Present')
    print("-------------------------")
    print("-------------------------")
else:
    print("-------------------------")
    print("-------------------------")
    print('Absent')
    print("-------------------------")
    print("-------------------------")
        


