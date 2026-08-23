export async function createEmployee(employee) {
    const response = await axios.post("http://localhost/StudentSystem/Payroll-system/backend/index.php", 
                                        employee
    );

    return response.data;
}

export async function getEmployees() {
    const response = await axios.get("http://localhost/StudentSystem/Payroll-system/backend/index.php");

    return response.data;
}


export async function updateEmployee(employee) {
    const response = await axios.put("http://localhost/StudentSystem/Payroll-system/backend/index.php",
        employee);

        return response.data;
}

export async function deleteEmployee(id) {
    const response = await axios.delete("http://localhost/StudentSystem/Payroll-system/backend/index.php", {
                data: {
                    id: id
                }
    });

    return response.data;
}