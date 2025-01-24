async function deleteStudent() {
    const name = document.getElementById('name').value;
    const roll_number = document.getElementById('roll_number').value; // Use the correct id

    try {
        const response = await fetch('/attendance/stud_db', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, roll_number }) // Ensure this matches your model
        });

        const result = await response.json();
        if (result.success) {
            alert(`Deleted student: ${result.data.name}`);
            // Optionally, clear the form after successful deletion
            document.getElementById('name').value = '';
            document.getElementById('roll_number').value = '';
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}
