const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Example Mongoose model for a Student
const Student = mongoose.model('Student', new mongoose.Schema({
    name: String,
    roll_number: String
}));

app.delete('/attendance/stud_db', async (req, res) => {
    const { name, roll_number } = req.body;

    try {
        // Attempt to find and delete the student
        const student = await Student.findOneAndDelete({ name, roll_number });

        if (!student) {
            // If no student is found, send a 404 response with a message
            return res.status(404).json({
                success: false,
                message: `No student with name "${name}" and roll number "${roll_number}" exists.`
            });
        }

        // If student is found and deleted, send a success response
        res.json({ success: true, data: student });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});

// Connect to the database and start the server
mongoose.connect('mongodb://localhost:27017/attendance', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(3000, () => console.log('Server is running on http://localhost:3000')))
    .catch(err => console.error('Database connection error:', err));
