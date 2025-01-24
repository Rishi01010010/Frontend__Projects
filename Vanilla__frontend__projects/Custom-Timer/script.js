document.getElementById('newTimer').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.toggle('show');
});

document.getElementById('hourSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createHourSpecificTimer();
});

document.getElementById('minuteSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createMinuteSpecificTimer();
});

document.getElementById('secondSpecific').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createSecondSpecificTimer();
});

document.getElementById('calculateHours').addEventListener('click', function () {
    document.getElementById('timerOptions').classList.remove('show');
    createYearsMonthsDaysToHours();
});

function createYearsMonthsDaysToHours() {
    createInputCard2(['years', 'months', 'days'], (inputs) => {
        let years = parseInt(inputs.years) || 0;
        let months = parseInt(inputs.months) || 0;
        let days = parseInt(inputs.days) || 0;

        // Calculating total hours
        let totalHours = (years * 365 + months * 30 + days) * 24;
        alert(`Total Hours: ${totalHours}`);
    }, false);  // Pass false to indicate no title and description
}

function createHourSpecificTimer() {
    createInputCard(['hours', 'minutes', 'seconds'], (inputs) => {
        let hours = parseInt(inputs.hours) || 0;
        let minutes = parseInt(inputs.minutes) || 0;
        let seconds = parseInt(inputs.seconds) || 0;

        if (minutes >= 60 || seconds >= 60) {
            alert('Minutes and seconds should be less than 60.');
            return;
        }

        let time = (hours * 3600) + (minutes * 60) + seconds;
        createTimerCard(time, inputs.title, inputs.description);
    });
}

function createMinuteSpecificTimer() {
    createInputCard(['minutes', 'seconds'], (inputs) => {
        let minutes = parseInt(inputs.minutes) || 0;
        let seconds = parseInt(inputs.seconds) || 0;

        if (seconds >= 60) {
            alert('Seconds should be less than 60.');
            return;
        }

        let time = (minutes * 60) + seconds;
        createTimerCard(time, inputs.title, inputs.description);
    });
}

function createSecondSpecificTimer() {
    createInputCard(['seconds'], (inputs) => {
        let seconds = parseInt(inputs.seconds) || 0;
        createTimerCard(seconds, inputs.title, inputs.description);
    });
}

function createInputCard(fields, callback) {
    let inputCard = document.createElement('div');
    inputCard.classList.add('input-card');

    // Title input
    let titleLabel = document.createElement('label');
    titleLabel.textContent = 'Enter Timer Title:';
    inputCard.appendChild(titleLabel);

    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    inputCard.appendChild(titleInput);

    // Description input
    let descLabel = document.createElement('label');
    descLabel.textContent = 'Enter Timer Description:';
    inputCard.appendChild(descLabel);

    let descTextarea = document.createElement('textarea');
    descTextarea.id = 'description';
    inputCard.appendChild(descTextarea);

    // Time inputs
    let inputs = {};
    fields.forEach(field => {
        let label = document.createElement('label');
        label.textContent = `Enter ${field}:`;
        inputCard.appendChild(label);

        let input = document.createElement('input');
        input.type = 'number';
        input.id = field;
        inputCard.appendChild(input);

        inputs[field] = input;
    });

    // Submit button
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Start Timer';
    submitButton.addEventListener('click', function () {
        let inputValues = {
            title: titleInput.value || 'Untitled Timer',
            description: descTextarea.value || 'No Description'
        };
        fields.forEach(field => {
            inputValues[field] = inputs[field].value;
        });

        inputCard.remove();  // Remove the input fields
        callback(inputValues);  // Pass the values to the callback
    });
    inputCard.appendChild(submitButton);

    document.getElementById('timers').appendChild(inputCard);
}

function createInputCard2(fields, callback) {
    let inputCard = document.createElement('div');
    inputCard.classList.add('input-card');

    // Title input
    let titleLabel = document.createElement('label');
    // titleLabel.textContent = 'Enter Timer Title:';
    // inputCard.appendChild(titleLabel);

    let titleInput = document.createElement('input');
    // titleInput.type = 'text';
    titleInput.id = 'title';
    // inputCard.appendChild(titleInput);

    // Description input
    let descLabel = document.createElement('label');
    // descLabel.textContent = 'Enter Timer Description:';
    // inputCard.appendChild(descLabel);

    let descTextarea = document.createElement('textarea');
    // descTextarea.id = 'description';
    // inputCard.appendChild(descTextarea);

    // Time inputs
    let inputs = {};
    fields.forEach(field => {
        let label = document.createElement('label');
        label.textContent = `Enter ${field}:`;
        inputCard.appendChild(label);

        let input = document.createElement('input');
        input.type = 'number';
        input.id = field;
        inputCard.appendChild(input);

        inputs[field] = input;
    });

    // Submit button
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Calculate Hours';
    submitButton.addEventListener('click', function () {
        let inputValues = {
            title: titleInput.value || 'Untitled Timer',
            description: descTextarea.value || 'No Description'
        };
        fields.forEach(field => {
            inputValues[field] = inputs[field].value;
        });

        inputCard.remove();  // Remove the input fields
        callback(inputValues);  // Pass the values to the callback
    });
    inputCard.appendChild(submitButton);

    document.getElementById('timers').appendChild(inputCard);
}

function createTimerCard(time, title, description) {
    let timerCard = document.createElement('div');
    timerCard.classList.add('timer-card');

    let nameSpan = document.createElement('span');
    nameSpan.textContent = title;
    timerCard.appendChild(nameSpan);

    let nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = title;
    nameInput.style.display = 'none';
    timerCard.appendChild(nameInput);

    let descSpan = document.createElement('span');
    descSpan.textContent = description;
    timerCard.appendChild(descSpan);

    let descTextarea = document.createElement('textarea');
    descTextarea.value = description;
    descTextarea.style.display = 'none';
    timerCard.appendChild(descTextarea);

    let timeSpan = document.createElement('p');
    timeSpan.textContent = formatTime(time);
    timerCard.appendChild(timeSpan);

    let timeInput = document.createElement('input');
    timeInput.type = 'text';
    timeInput.value = formatTime(time);
    timeInput.style.display = 'none';
    timerCard.appendChild(timeInput);

    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('editButton');
    timerCard.appendChild(editButton);

    let stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';
    stopButton.classList.add('stopButton');
    timerCard.appendChild(stopButton);

    document.getElementById('timers').appendChild(timerCard);

    let timerInterval = setInterval(function () {
        if (time <= 0) {
            clearInterval(timerInterval);
            timeSpan.textContent = "Another Failure?";
            timeInput.style.display = 'none';
            return;
        }
        time--;
        timeSpan.textContent = formatTime(time);
    }, 1000);

    editButton.addEventListener('click', function () {
        if (editButton.textContent === 'Edit') {
            nameSpan.style.display = 'none';
            nameInput.style.display = 'block';
            descSpan.style.display = 'none';
            descTextarea.style.display = 'block';
            timeSpan.style.display = 'none';
            timeInput.style.display = 'block';
            editButton.textContent = 'Save';
        } else {
            nameSpan.textContent = nameInput.value;
            descSpan.textContent = descTextarea.value;
            let timeParts = timeInput.value.split(':').map(Number);
            time = (timeParts[0] * 3600) + (timeParts[1] * 60) + timeParts[2];
            timeSpan.textContent = formatTime(time);
            nameSpan.style.display = 'block';
            nameInput.style.display = 'none';
            descSpan.style.display = 'block';
            descTextarea.style.display = 'none';
            timeSpan.style.display = 'block';
            timeInput.style.display = 'none';
            editButton.textContent = 'Edit';
        }
    });

    stopButton.addEventListener('click', function () {
        clearInterval(timerInterval);
        if (confirm('Do you want to stop the timer?')) {
            timerCard.remove();
        } else {
            timerInterval = setInterval(function () {
                if (time <= 0) {
                    clearInterval(timerInterval);
                    timeSpan.textContent = "Another Failure?";
                    timeInput.style.display = 'none';
                    return;
                }
                time--;
                timeSpan.textContent = formatTime(time);
            }, 1000);
        }
    });

    timeInput.addEventListener('input', function () {
        let timeParts = timeInput.value.split(':').map(Number);
        if (timeParts.length === 3) {
            time = (timeParts[0] * 3600) + (timeParts[1] * 60) + timeParts[2];
        }
    });
}

function formatTime(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    return `${h.toString().padStart(2, '0')} : ${m.toString().padStart(2, '0')} : ${s.toString().padStart(2, '0')}`;
}
