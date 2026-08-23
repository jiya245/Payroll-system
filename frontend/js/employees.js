import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from "./employeeApi.js";

const form = document.getElementById("employeeForm");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editEmployeeForm");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const addModal = document.getElementById("addModal");
const deleteModal = document.getElementById("deleteModal");
const deleteId = document.getElementById("deleteId");
let employees = [];


function displayEmployees(employeeList) {
    employees = employeeList;
    const tbody = document.getElementById("tbody");

    tbody.innerHTML = "";
    employeeList.forEach((employee) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.fullname}</td>
            <td>${employee.email}</td>
            <td>${employee.phone}</td>
            <td>${employee.position}</td>
            <td>${employee.department}</td>
            <td>${employee.basic_salary}</td>
            <td>${employee.status}</td>
            <td>${employee.created_at}</td>
            <td>
                <button class="editBtn" data-id="${employee.id}">Edit</button>
                <button class="deleteBtn" data-id="${employee.id}">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    })
}

document.getElementById("tbody").addEventListener("click", function(event) {
    if (event.target.classList.contains("editBtn")) {
        const employeeId = event.target.dataset.id;

        const employee = employees.find(employee => employee.id == employeeId);

        document.getElementById("editId").value = employee.id;
        document.getElementById("editFullname").value = employee.fullname;
        document.getElementById("editEmail").value = employee.email;
        document.getElementById("editPhone").value = employee.phone;
        document.getElementById("editPosition").value = employee.position;
        document.getElementById("editDepartment").value = employee.department;
        document.getElementById("editSalary").value = employee.basic_salary;
        document.getElementById("editStatus").value = employee.status;

        editModal.style.display = "block";
    ;}

    if (event.target.classList.contains("deleteBtn")) {
        const employeeId = event.target.dataset.id;
        deleteId.value = employeeId;
        console.log(employeeId);
        deleteModal.style.display = "block";
    }
})

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    try {
        const formData = new FormData(form);

        const employee = Object.fromEntries(formData.entries());
    
        const response = await createEmployee(employee);
    
        if (response.success) {
            showMessage(response.message, "success");

            addModal.style.display = "none";
            form.reset();
            loadEmployee();
        } else {
            showMessage(response.message, "error");
        }
    } catch (error) {
        console.error("Failed to create employee", error);

        showMessage("Something went wrong. Please try again.", "error");
    }
}) 

addEmployeeBtn.addEventListener("click", function() {
    addModal.style.display = "block";
})
document.getElementById("cancelAddBtn").addEventListener("click", function() {
    addModal.style.display = "none";
})

editForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    try {
        const formData = new FormData(editForm);
        const employee = Object.fromEntries(formData.entries());
        const response = await updateEmployee(employee);
    
        if (response.success) {
            showMessage(response.message, "success");

            editModal.style.display = "none";
            editForm.reset();
            loadEmployee();
        } else {
            showMesasge(response.message, "error");
        }
    } catch (error) {
        console.error("Failed to update employee: ", error);

        showMessage("Something went wrong. Please try again.", "error");
    }

    
});

document.getElementById("cancelEditBtn").addEventListener("click", function() {
    editModal.style.display = "none";
})

document.getElementById("confirmDeleteBtn").addEventListener("click", async function() {
    const id = deleteId.value;

    try {
        const response = await deleteEmployee(id);
    
        if (response.success) {
            showMessage(response.message, "success");

            deleteModal.style.display = "none";
    
            loadEmployee();
        } else {
            showMessage(response.message, "error");
        }
    } catch (error) {
        console.error("Failed to delete employee", error);

        showMessage("Something went wrong. Please try again.", "error");
    }
})

document.getElementById("cancelDeleteBtn").addEventListener("click", function() {
    deleteModal.style.display = "none";
})


async function loadEmployee() {
    const response = await getEmployees();


    if (response.success) {
        displayEmployees(response.data);
    } 
}

function showMessage(message, type) {
    const messageBox = document.getElementById("message");

    messageBox.textContent = message;
    messageBox.className = type;

    setTimeout(function() {

        messageBox.textContent = "";
        messageBox.className = "";

    }, 3000);

}

document.addEventListener("keydown", function(event) {
    if (event.key === "escape") {
        addModal.style.display = "none";
        editModal.style.display = "none";
        deleteModal.style.display = "none";
    }
});

window.addEventListener("click", function(event) {
    if (event.target === addModal) {
        addModal.style.display = "none";
    }

    if (event.target === editModal) {
        editModal.style.display = "none";
    }

    if (event.target === deleteModal) {
        deleteModal.style.display = "none"
    }
});

loadEmployee();
    
