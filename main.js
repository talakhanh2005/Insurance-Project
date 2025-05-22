
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
        alert("Lỗi: " + data.error);
      } else {
        alert("✅ " + data.message + "\nXin chào " + data.user.full_name);
        // Bạn có thể lưu thông tin người dùng nếu cần
        console.log("Người dùng:", data.user);
      }
    })
    .catch(function(error) {
      alert("Lỗi kết nối: " + error);
    });
}