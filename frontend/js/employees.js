import { createEmployee, getEmployees, updateEmployee, deleteEmployee } from "./employeeApi.js";

const form = document.getElementById("employeeForm");
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editEmployeeForm");
const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const addModal = document.getElementById("addModal");
const deleteModal = document.getElementById("deleteModal");
const deleteId = document.getElementById("deleteId");
const deleteMessage = document.getElementById("deleteMessage");
const searchInp = document.getElementById("searchInp");
let employees = [];


function displayEmployees(employeeList) {
    const tbody = document.getElementById("tbody");

    tbody.innerHTML = "";

    if (employeeList.length === 0) {
        tbody.innerHTML = `<tr>
                                <td colspan="10">No employees found.</td>
                            </tr>`;

                            return;
    }

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
        const employee = employees.find(employee => employee.id == employeeId);
        deleteId.value = employeeId;

        deleteMessage.textContent =  `Are you sure you want to delete ${employee.fullname}?`;

        deleteModal.style.display = "block";
    }
})

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");

    submitBtn.disabled = true;
    submitBtn.textContent = "Adding...";

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
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Add Employee";
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

    const submitBtn = editForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

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
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Save Changes";
    }

    
});

document.getElementById("cancelEditBtn").addEventListener("click", function() {
    editModal.style.display = "none";
})

document.getElementById("confirmDeleteBtn").addEventListener("click", async function() {
    const id = deleteId.value;
    const deleteBtn = document.getElementById("confirmDeleteBtn");

    deleteBtn.disabled = true;
    deleteBtn.textContent = "Deleting...";

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
    } finally {
        deleteBtn.disabled = false;
        deleteBtn.textContent = "Delete";
    }
})

document.getElementById("cancelDeleteBtn").addEventListener("click", function() {
    deleteModal.style.display = "none";
})


async function loadEmployee() {

    const tbody = document.getElementById("tbody");

    tbody.innerHTML = `<tr><td colspan="10">Loading employees...</td></tr>`;

try {
    const response = await getEmployees();

    if (response.success) {
        employees = response.data;

        displayEmployees(employees);
    } else {
        tbody.innerHTML = `<tr><td colspan="10">Failed to load employees.</td></tr>`;
    }
} catch (error) {
    console.error("Failed to load employees:", error);

    tbody.innerHTML = `<td><td colspan="10">Something went wrong while loading employees</td></td>`;
    }
}

function searchFeature() {
    const searchValue = searchInp.value.toLowerCase().trim();

    if (searchValue === "") {
        displayEmployees(employees);
        return;
    }

    const filtered = employees.filter(employee =>
        employee.fullname.toLowerCase().includes(searchValue)
    );


    displayEmployees(filtered);
}

searchInp.addEventListener("input", searchFeature);

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
    if (event.key === "Escape") {
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
    
