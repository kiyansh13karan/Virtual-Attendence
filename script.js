// Global attendance array
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

/* ================= EMPLOYEE ================= */

function loginEmp() {
    const empId = document.getElementById("empId").value;
    if (empId === "") {
        alert("Please enter Employee ID");
        return;
    }
    localStorage.setItem("currentEmp", empId);
    document.getElementById("panel").style.display = "block";
    document.getElementById("empName").innerText = "Welcome, " + empId;
}

function checkIn() {
    const emp = localStorage.getItem("currentEmp");
    if (!emp) {
        alert("Login first");
        return;
    }

    attendance.push({
        emp: emp,
        date: new Date().toLocaleDateString(),
        in: new Date().toLocaleTimeString(),
        out: ""
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Check-In Successful");
}

function checkOut() {
    if (attendance.length === 0) {
        alert("No check-in found");
        return;
    }

    attendance[attendance.length - 1].out =
        new Date().toLocaleTimeString();

    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Check-Out Successful");
}

/* ================= ADMIN ================= */

function loginAdmin() {
    const pass = document.getElementById("adminPass").value;
    if (pass !== "admin") {
        alert("Wrong password");
        return;
    }

    document.getElementById("adminPanel").style.display = "block";
    loadRecords();
}

function loadRecords() {
    const table = document.getElementById("records");
    table.innerHTML = "";

    attendance.forEach(a => {
        table.innerHTML += `
            <tr>
                <td>${a.emp}</td>
                <td>${a.date}</td>
                <td>${a.in}</td>
                <td>${a.out}</td>
            </tr>
        `;
    });
}

/* ================= CSV DOWNLOAD ================= */

function downloadCSV() {
    let csv = "Employee ID,Date,Check-In,Check-Out\n";
    attendance.forEach(a => {
        csv += `${a.emp},${a.date},${a.in},${a.out}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
}

/* ================= BUTTON ANIMATION ================= */
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => btn.style.transform = "scale(1)", 150);
    });
});
