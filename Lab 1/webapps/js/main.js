document.querySelectorAll('input[name="rval"]').forEach(radio => {
    radio.addEventListener('change', function () {
        drawGraph();
    });
});

document.getElementById("input-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get selected X value (radio button)
    const selectedX = document.querySelector('input[name="xval"]:checked');
    if (!selectedX) {
        alert("Please select a value for X.");
        return;
    }

    // Get Y value (text input)
    const yValue = document.getElementById("y-text-input").value;
    if (!yValue || isNaN(yValue) || yValue < -5 || yValue > 5) {
        alert("Please enter a valid Y value (-5 to 5).");
        return;
    }

    // Get selected R value (radio button)
    const selectedR = document.querySelector('input[name="rval"]:checked');
    if (!selectedR) {
        alert("Please select a value for R.");
        return;
    }

    // Prepare data to send
    const data = {
        x: selectedX.value,
        y: yValue,
        r: selectedR.value
    };

    // Convert to JSON
    const jsonData = JSON.stringify(data);
    console.log("Sending data:", jsonData);

    // Send request to the FastCGI server
    fetch("http://localhost:8080/fcgi-bin/WebProject_1.jar", { // Adjust to your actual endpoint
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // Ensure content type is JSON
        },
        body: jsonData
    })
        .then((response) => response.text()) // Expecting a text response
        .then((responseData) => {
            console.log("Server response:", responseData);
            const parsedData = JSON.parse(responseData); // Parse the response if it's JSON
            fillTable(parsedData); // Display the result in the table
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send data.");
        });
});

function fillTable(data) {
    const table = document.getElementById("result-table").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow(-1);

    const cellX = newRow.insertCell(0);
    const cellY = newRow.insertCell(1);
    const cellR = newRow.insertCell(2);
    const cellDate = newRow.insertCell(3);
    const cellExecuteTime = newRow.insertCell(4);
    const cellHitResult = newRow.insertCell(5);

    cellX.textContent = data.x;
    cellY.textContent = data.y;
    cellR.textContent = data.r;
    cellDate.textContent = data.currTime;
    cellExecuteTime.textContent = data.execTime + " ns";
    cellHitResult.textContent = data.hitResult ? "Hit" : "Miss";
}

function drawGraph() {
    let rElement = document.querySelector('input[name="rval"]:checked');
    if (!rElement) return;
    let r = rElement.value / 2;

    let canvas = document.getElementById("graphCanvas");
    let context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#f0f0f0";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "black";
    context.beginPath();

    context.moveTo(canvas.width / 2, 0);
    context.lineTo(canvas.width / 2, canvas.height);
    context.moveTo(0, canvas.height / 2);
    context.lineTo(canvas.width, canvas.height / 2);
    context.stroke();

    let scale = 80;
    let unit = scale * r;

    context.font = "12px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.strokeStyle = "gray";

    for (let i = -2; i <= 2; i++) {
        if (i !== 0) {
            context.moveTo(canvas.width / 2 + i * unit, canvas.height / 2 - 5);
            context.lineTo(canvas.width / 2 + i * unit, canvas.height / 2 + 5);
            context.stroke();
            context.fillText((i * r).toFixed(1), canvas.width / 2 + i * unit, canvas.height / 2 + 15);
        }
    }

    for (let i = -2; i <= 2; i++) {
        if (i !== 0) {
            context.moveTo(canvas.width / 2 - 5, canvas.height / 2 - i * unit);
            context.lineTo(canvas.width / 2 + 5, canvas.height / 2 - i * unit);
            context.stroke();
            context.fillText((i * r).toFixed(1), canvas.width / 2 + 15, canvas.height / 2 - i * unit);
        }
    }

    context.fillStyle = "blue";
    context.globalAlpha = 0.5;

    // Draw triangle
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2 - scale * r / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2, canvas.height / 2 - scale * r);
    context.fill();

    // Draw rectangle
    context.fillRect(canvas.width / 2, canvas.height / 2, scale * r, scale * r);

    // Draw quarter circle
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.arc(canvas.width / 2, canvas.height / 2, scale * r, Math.PI, Math.PI / 2, true);
    context.fill();
}


