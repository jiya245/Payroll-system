const API_URL = "http://localhost/StudentSystem/Payroll-system/backend/index.php";

export async function createEmployee(employee) {
    const response = await axios.post(API_URL, 
                                        employee
    );

    return response.data;
}

export async function getEmployees() {
    const response = await axios.get(API_URL);

    return response.data;
}


export async function updateEmployee(employee) {
    const response = await axios.put(API_URL,
        employee);

        return response.data;
}

export async function deleteEmployee(id) {
    const response = await axios.delete(API_URL, {
                data: {
                    id: id
                }
    });

    return response.data;
}