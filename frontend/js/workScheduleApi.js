const API_URL = "http://localhost/StudentSystem/Payroll-system/backend/work_schedules/getSchedules.php";

export async function getSchedules() {
    const response = await axios.get(API_URL);

    return response.data
}