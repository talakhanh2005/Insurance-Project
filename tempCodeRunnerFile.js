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