// async function uploadPhoto() {
//   const formData = new FormData();
//   const fileInput = document.getElementById('class-photo');
//   formData.append('photo', fileInput.files[0]);

//   const response = await fetch('http://localhost:3000/upload', {
//       method: 'POST',
//       body: formData
//   });

//   const result = await response.json();
//   updateTable(result);
// }

// function updateTable(data) {
//   const tbody = document.getElementById('attendance-table').querySelector('tbody');
//   tbody.innerHTML = '';
//   data.forEach(student => {
//       const row = document.createElement('tr');
//       row.innerHTML = `
//           <td>${student.name}</td>
//           <td>${student.roll_number}</td>
//           <td>${student.status}</td>
//       `;
//       tbody.appendChild(row);
//   });
// }

console.log("this is .............................")

async function uploadPhoto() {
    const formData = new FormData();
    const fileInput = document.getElementById('class-photo');
    const uploadButton = document.getElementById('upload-button');
    const photoPreview = document.getElementById('photo-preview');
    
    formData.append('photo', fileInput.files[0]);
    
    // Display the selected photo
    const reader = new FileReader();
    reader.onload = function(e) {
        photoPreview.src = e.target.result;
    }
    reader.readAsDataURL(fileInput.files[0]);

    // Disable the upload button
    uploadButton.classList.add('disabled');
    uploadButton.disabled = true;

    const response = await fetch('http://localhost:3000/attendance/upload/upload-photo', {
        method: 'POST',
        body: formData
    });

    const result = await response.json();
    updateTable(result);
    
    // Enable the upload button after the table is built
    uploadButton.classList.remove('disabled');
    uploadButton.disabled = false;
}

function updateTable(data) {
    const tbody = document.getElementById('attendance-table').querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll_number}</td>
            <td>${student.status}</td>
        `;
        tbody.appendChild(row);
    });
}


