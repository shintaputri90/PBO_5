let motors = [];
let currentId = 0;

document.getElementById("motorForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const motor = {
        id: document.getElementById("motorId").value ? parseInt(document.getElementById("motorId").value) : currentId++,
        brand: document.getElementById("motorBrand").value,
        model: document.getElementById("motorModel").value,
        year: document.getElementById("motorYear").value,
        price: document.getElementById("motorPrice").value
    };

    if (motor.id) {
        const index = motors.findIndex(m => m.id === motor.id);
        motors[index] = motor;
    } else {
        motors.push(motor);
    }

    resetForm();
    renderMotors();
});

function resetForm() {
    document.getElementById("motorForm").reset();
    document.getElementById("motorId").value = '';
    document.getElementById("modalTitle").innerText = 'Tambah Motor';
    $('#motorModal').modal('hide');
}

function renderMotors() {
    const motorTableBody = document.getElementById("motorTableBody");
    motorTableBody.innerHTML = '';

    motors.forEach(motor => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${motor.id}</td>
            <td>${motor.brand}</td>
            <td>${motor.model}</td>
            <td>${motor.year}</td>
            <td>${motor.price}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editMotor(${motor.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteMotor(${motor.id})">Hapus</button>
            </td>
        `;
        motorTableBody.appendChild(row);
    });
}

function editMotor(id) {
    const motor = motors.find(m => m.id === id);
    document.getElementById("motorId").value = motor.id;
    document.getElementById("motorBrand").value = motor.brand;
    document.getElementById("motorModel").value = motor.model;
    document.getElementById("motorYear").value = motor.year;
    document.getElementById("motorPrice").value = motor.price;

    document.getElementById("modalTitle").innerText = 'Edit Motor';
    $('#motorModal').modal('show');
}

function deleteMotor(id) {
    motors = motors.filter(m => m.id !== id);
    renderMotors();
}

function deleteMotor(id) {
    const confirmation = window.confirm("Apakah Anda yakin ingin menghapus motor ini?");
    if (confirmation) {
        motors = motors.filter(m => m.id !== id);
        renderMotors();
    }
}
