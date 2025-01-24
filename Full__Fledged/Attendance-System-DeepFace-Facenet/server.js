const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const Student = require("./models/student.js");
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.memoryStorage();


mongoose.connect('mongodb://localhost:27017/attendance', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, './frontend')));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

app.get('/attendance', (req, res) => {
    res.render('home');
});

app.get('/attendance/upload', (req, res) => {
    res.render('upload');
});

app.get('/', (req, res) => {
    console.log("root")
});

app.post('/attendance/upload/upload-photo', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const photoPath = req.file.path;
    console.log('File path:', photoPath);

    const pythonProcess = spawn('python', ['E:\\My_Projects\\Attendance-System-DeepFace-Facenet\\face_recognition1.py', photoPath]);

    let scriptOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        scriptOutput += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (code === 0) {
            try {
                const result = JSON.parse(scriptOutput.trim());
                console.log('Parsed result:', result);
                res.json(result);
            } catch (e) {
                console.error('Error parsing JSON from Python script output:', e);
                res.status(500).send('Error parsing Python script output');
            }
        } else {
            res.status(500).send('Python script exited with error');
        }
    });

    pythonProcess.on('error', (err) => {
        console.error(`Failed to start subprocess: ${err}`);
        res.status(500).send(`Failed to start subprocess: ${err.message}`);
    });
});

app.get('/attendance/student', (req, res) => {
    res.render('student');
});

app.post('/attendance', upload.single('student[photo]'), async (req, res) => {
    try {
        console.log('Form Data:', req.body);
        console.log('Uploaded File:', req.file);

        const newStudent = new Student({
            name: req.body.student.name,
            roll_number: req.body.student.roll_number,
            photo: {
                data: fs.readFileSync(req.file.path), // Read file data as Buffer
                contentType: req.file.mimetype // Store content type
            }
        });

        await newStudent.save();
        res.redirect("/attendance/stud_db");

    } catch (error) {
        console.error('Error saving student:', error);
        res.status(500).send('Error saving student');
    }
});

app.get('/attendance/stud_db', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('stud_db', { students });
    } catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
});



app.delete("/attendance/stud_db", async (req, res) => {
    const { nam, rol } = req.body;
    console.log(req.body);

    try {
        
        const student = await Student.findOneAndDelete({ name:nam, roll_number:rol });
        if (student) {
            console.log(student);
            res.json({ success: true, message: `Student with name "${nam}" and roll number "${rol}" deleted.` });
            // res.json({ success: true, data: student });
            // res.redirect("/attendance/stud_db");
        } else {
            res.status(404).json({ success: false, message: `No student with name "${nam}" and roll number "${rol}" exists.` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete student.' });
    }
});

// Route to delete a student
// app.delete("/attendance/stud_db", async (req, res) => {
//     const { nam, rol } = req.body;
//     console.log(req.body);

//     try {
        
//         const student = await Student.findOneAndDelete({ name:nam, roll_number:rol });
//         if (student) {
//             console.log(student);
//             res.json({ success: true, message: `Student with name "${nam}" and roll number "${rol}" deleted.` });
//             // res.json({ success: true, data: student });
//         } else {
//             res.status(404).json({ success: false, message: `No student with name "${nam}" and roll number "${rol}" exists.` });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Failed to delete student.' });
//     }
// });





















// app.get('/attendance/stud_db', async (req, res) => {
//     try {
//         const students = await Student.find();
//         res.render('stud_db', { students });
//     } catch (err) {
//         res.status(500).send('Database query failed');
//     }
// });

// app.post('/attendance/stud_db', async (req, res) => {
//     const { name, roll_number } = req.body;

//     // Debugging: Check the received body
//     console.log('Request Body:', req.body);

//     if (!name || !roll_number) {
//         return res.json({ success: false, message: 'Name and roll number are required.' });
//     }

//     try {
//         const student = await Student.findOneAndDelete({ name, roll_number });
//         if (student) {
//             res.json({ success: true, data: student });
//         } else {
//             res.json({ success: false, message: `No student with name "${name}" and roll number "${roll_number}" exists.` });
//         }
//     } catch (err) {
//         res.status(500).send('Database query failed');
//     }
// });

// app.post('/delete', async (req, res) => {
//     const { name, rollNumber } = req.body;
//     try {
//         const student = await Student.findOneAndDelete({ name, roll_number: rollNumber });
//         if (student) {
//             res.json({ success: true, name: student.name });
//         } else {
//             res.status(404).json({ success: false, message: `No student with name "${name}" and roll number "${rollNumber}" exists.` });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Failed to delete student.' });
//     }
// });