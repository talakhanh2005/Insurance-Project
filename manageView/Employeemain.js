// Chức năng tượng trưng cho chưa kết nối vào DTB
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("employeeTable");

    table.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("btn-delete")) {
        const row = target.closest("tr");
        const name = row.cells[1].textContent;
        if (confirm(`Bạn có chắc muốn xoá nhân viên "${name}"?`)) {
        row.remove();
        alert("Đã xoá thành công!");
        }
    }
    // Đang cần tối ưu thêm nhập form để sửa thông tin nhân viên
    if (target.classList.contains("btn-edit")) {
        const row = target.closest("tr");

        const currentName = row.cells[1].textContent;
        const currentPosition = row.cells[2].textContent;

        const newName = prompt("Nhập tên mới:", currentName);
        const newPosition = prompt("Nhập vị trí mới:", currentPosition);

        if (newName && newPosition) {
            row.cells[1].textContent = newName;
            row.cells[2].textContent = newPosition;

            alert("Đã cập nhật thông tin!");
        } else {
            alert("Dữ liệu không hợp lệ hoặc đã huỷ!");
        }
    }
    });
});
