const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    roll_number: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer, // Change type to Buffer
        contentType: String // Store content type for the image
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
