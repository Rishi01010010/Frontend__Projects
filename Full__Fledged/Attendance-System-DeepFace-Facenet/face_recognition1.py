import sys
import pymongo
import json
from io import BytesIO
from PIL import Image
import io
from deepface import DeepFace

def fetch_student_photos():
    try:
        client = pymongo.MongoClient("mongodb://localhost:27017/")
        db = client["attendance"]
        students = db["students"].find({}, {"name": 1, "roll_number": 1, "photo.data": 1})

        student_list = []
        for student in students:
            if 'photo' in student and 'data' in student['photo']:
                # Extract name, roll_number, and photo data
                name = student.get('name')
                roll_number = student.get('roll_number')
                photo_data = student['photo']['data']
                student_list.append({'name': name, 'roll_number': roll_number, 'photo_data': photo_data})
            else:
                print("Skipping student with missing or incomplete photo data")

        return student_list

    except pymongo.errors.PyMongoError as err:
        return {"error": f"Error: {err}"}


def recognize_faces(class_photo_path, students):
    class_image = Image.open(class_photo_path)

    attendance = []
    for student in students:
        name = student['name']
        roll_number = student['roll_number']
        photo_data = student['photo_data']  # Change this line to use photo_data

        student_image = Image.open(io.BytesIO(photo_data))
        student_image_path = 'student_image_temp.jpg'
        student_image.save(student_image_path)

        result = DeepFace.verify(img1_path=class_photo_path, img2_path=student_image_path, model_name='Facenet', detector_backend='opencv')

        status = 'Present' if result['verified'] else 'Absent'

        attendance.append({
            'name': name,
            'roll_number': roll_number,
            'status': status
        })

    return attendance


if __name__ == "__main__":
    class_photo_path = sys.argv[1]
    students = fetch_student_photos()

    if "error" in students:
        print(json.dumps(students))
    elif not students:
        print(json.dumps({"error": "No student data found."}))
    else:
        attendance = recognize_faces(class_photo_path, students)
        print(json.dumps(attendance))
