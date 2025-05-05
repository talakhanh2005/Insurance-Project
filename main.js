
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
                window.location.href = "supervisor.html";
                break;
            case "accountant":
                window.location.href = "accountant.html";
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

