
function togglePassword() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}
function togglePassword() {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

function handleLogin(event) {
    event.preventDefault(); // Ngăn trang reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
  
    //xác thực email và mật khẩu trong dtb 

    if (email && password) {
        switch (role) {
            case "admin":
                window.location.href = "adminView.html";
                break;
            case "seller":
                window.location.href = "seller.html";
                break;
            case "supervisor":
                window.location.href = "./Supervisor/supervisor.html";
                break;
            case "accountant":
                window.location.href = "./AccountantView/accountant.html";
                break;
            case "user":
                window.location.href = "user.html";
                break;
            default:
                alert("Vai trò không hợp lệ!");
        }
    } else {
        alert("Vui lòng nhập email và mật khẩu.");
    }
}

function login(event) {

    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ username: username, password: password})
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
        if (data.error) {
            console.log("Lỗi: " + data.error);
        } else {
            const role = data.user.role;
            if (role === "Admin") {
                window.location.href = "adminView.html";
            }
        }
    })
    .catch(function(error) {
        console.log("Lỗi kết nối: " + error);
    });
}

function logout(event) {

    event.preventDefault();

    const logoutUrl = "http://127.0.0.1:5000/logout";

    fetch(logoutUrl, {
        method: "POST",
        credentials: "include" 
    })
    .then(function(response) {
        
        if (!response.ok) {
            
            return response.json().then(errorData => {
                throw new Error(errorData.error || 'Đăng xuất không thành công.');
            });
        }
        return response.json();
    })
    .then(function(data) {
        window.location.href = "./index.html"; // Thay đổi thành trang đăng nhập 
    })
    .catch(function(error) {
        showMessageBox("Lỗi Đăng Xuất", "Không thể đăng xuất: " + error.message);
    });
}