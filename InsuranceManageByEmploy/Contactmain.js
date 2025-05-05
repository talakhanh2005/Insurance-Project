document.addEventListener("DOMContentLoaded", function () {
    const dsHopDong = JSON.parse(localStorage.getItem("dsHopDong")) || [];

    // Hiển thị danh sách hợp đồng
    const tbody = document.querySelector("#contractTable tbody");
    if (tbody) {
        dsHopDong.forEach(h => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${h.maHD}</td>
                <td>${h.nguoiThuHuong}</td>
                <td>${h.nhanVien}</td>
                <td>${h.ngayBatDau}</td>
                <td>${h.ngayKetThuc}</td>
                <td>
                    <button class="btn-edit">Chỉnh sửa</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Xử lý sự kiện click
    const table = document.getElementById("contactTable");
    if (table) {
        table.addEventListener("click", function (e) {
            const target = e.target;

            if (target.classList.contains("btn-delete")) {
                const row = target.closest("tr");
                const name = row.cells[1].textContent;
                if (confirm(`Bạn có chắc muốn xoá hợp đồng "${name}"?`)) {
                    row.remove();
                    alert("Đã xoá thành công!");
                }
            }

            if (target.classList.contains("btn-edit")) {
                const row = target.closest("tr");
                const maHD = row.cells[0].textContent.trim();
                window.location.href = `edit-contact.html?maHD=${encodeURIComponent(maHD)}`;
            }
        });
    }
});
