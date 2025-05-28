
const roleSelect = document.getElementById("role");
const labelHopDong = document.getElementById("labelHopDong");

// Hiện/ẩn hợp đồng khi chọn role
roleSelect.addEventListener("change", function () {
    const selectedRole = this.value;
    if (selectedRole === "Accountant" || selectedRole === "Supervisor") {
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
        console.log("Đăng ký thành công!");
        if(role === "Accountant"){
            window.location.href = "accountant_employee.html";
        }
        else if(role === "Supervisor"){
            window.location.href = "supervisor_employee.html";
        }
        else{
            window.location.href = "sale_employee.html";
        }
        
    })
    .catch(error => {
        console.error("Lỗi khi gọi API:", error);
        console.log("Có lỗi xảy ra!");
    });

    if (role === "Accountant" || role === "Supervisor") {
        fetch("http://127.0.0.1:5000/assign-role", {
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
    }
});
