let presentCount = 0;
let absentCount = 0;

function addStudent() {
    const nameInput = document.getElementById("studentName");
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter student name");
        return;
    }

    const table = document.getElementById("attendanceList");
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = name;

    const statusCell = document.createElement("td");
    statusCell.textContent = "Absent";
    statusCell.classList.add("absent");

    const actionCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Mark Present";

    toggleBtn.onclick = function () {
        if (statusCell.textContent === "Absent") {
            statusCell.textContent = "Present";
            statusCell.className = "present";
            toggleBtn.textContent = "Mark Absent";
            presentCount++;
            absentCount--;
        } else {
            statusCell.textContent = "Absent";
            statusCell.className = "absent";
            toggleBtn.textContent = "Mark Present";
            absentCount++;
            presentCount--;
        }
        updateCount();
    };

    actionCell.appendChild(toggleBtn);
    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    table.appendChild(row);

    absentCount++;
    updateCount();
    nameInput.value = "";
}

function updateCount() {
    document.getElementById("presentCount").textContent = presentCount;
    document.getElementById("absentCount").textContent = absentCount;
}
