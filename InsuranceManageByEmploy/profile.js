document.addEventListener("DOMContentLoaded", function () {
    fetch("http://127.0.0.1:5000/current-user", {credentials: "include"})
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể lấy thông tin người dùng");
            }
            return response.json();
        })
        .then(user => {
            // Kiểm tra nếu có lỗi từ backend
            if (user.error) {
                alert(user.error);
                window.location.href = "../index.html"; // chuyển về trang login
                return;
            }

            // Gán thông tin vào giao diện
            document.getElementById("fullName").innerText = user.full_name || "Không rõ";
            document.getElementById("id").innerText = user.user_id;
            document.getElementById("role").innerText = convertRole(user.role) || "Chưa có";
            document.getElementById("activate").innerText = user.is_active;
        })
        .catch(err => {
            console.error(err);
            alert("Đã xảy ra lỗi khi tải thông tin");
        });
});

// Hàm chuyển role thành tiếng Việt
function convertRole(role) {
    switch (role) {
        case "Admin": return "Quản trị viên";
        case "ContractCreator": return "Nhân viên tạo hợp đồng";
        case "Supervisor": return "Nhân viên giám sát";
        case "Accountant": return "Nhân viên kế toán";
        default: return role;
    }
}
