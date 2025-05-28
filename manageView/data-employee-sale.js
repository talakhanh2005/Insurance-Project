function loadEmployeeList() {
    const tableBody = document.querySelector("#employeeTable tbody");
    urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");

    fetch(`http://127.0.0.1:5000/users/role/${role}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Dữ liệu nhận được:", data); 
        tableBody.innerHTML = ""; // xoa du lieu cu

        data.forEach(nv => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${nv.user_id}</td>
                <td>${nv.full_name}</td>
                <td>${nv.role}</td>
                <td><span class="status-online">${nv.is_active ? "Hoat dong" : "Khong hoat dong"}</span></td>
                <td>
                    <button class="btn btn-edit btn-sm btn-warning" onclick="editEmployee('${nv.user_id}', '${nv.full_name}')">Sửa</button>
                    <button class="btn btn-delete btn-sm btn-danger" onclick="deleteEmployee('${nv.user_id}')">Xoá</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Lỗi khi lấy danh sách nhân viên:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    loadEmployeeList();
});

function editEmployee(manv, name) {
    window.location.href = `edit-employee.html?manv=${manv}&role=ContractCreator&name=${name}`;
}

function deleteEmployee(manv) {
    if (!confirm("Bạn có chắc chắn muốn xoá nhân viên này?")) return;

    fetch(`http://127.0.0.1:5000/users/${manv}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error); });
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Thông báo thành công
        // Tải lại danh sách nhân viên (gọi lại fetch chính)
        loadEmployeeList();
    })
    .catch(error => {
        console.error("Lỗi khi xóa người dùng:", error);
        console.log("Lỗi: " + error.message);
    });
}



