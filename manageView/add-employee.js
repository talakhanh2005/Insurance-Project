
const roleSelect = document.getElementById("role");
const labelHopDong = document.getElementById("labelHopDong");

// Hiện/ẩn hợp đồng khi chọn role
roleSelect.addEventListener("change", function () {
    const selectedRole = this.value;
    if (selectedRole === "accountant" || selectedRole === "supervisor") {
    labelHopDong.style.display = "block";
    } else {
    labelHopDong.style.display = "none";
    }
});

// Xử lý khi submit form
document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById('username').value;
    const fullName = document.getElementById('full_name').value;
    const pass = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ 
            username: username, 
            password: pass,
            full_name: fullName,
            role: role
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessageBox("Đăng ký thành công!");
            if(role === "Accountant"){
                window.location.href = "accountant_employee.html";
            }
            else if(selectedRole === "Supervisor"){
                window.location.href = "supervisor_employee.html";
            }
            else{
                window.location.href = "sale_employee.html";
            }
        } else {
            showMessageBox("Đăng ký thất bại: " + data.message);
        }
    })
    .catch(error => {
        console.error("Lỗi khi gọi API:", error);
        showMessageBox("Có lỗi xảy ra!");
    });
});
