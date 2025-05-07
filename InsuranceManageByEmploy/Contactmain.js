window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#contactTable tbody");

    // Lấy danh sách hợp đồng từ localStorage nếu có
    const stored = localStorage.getItem("updatedContactList");
    const contactList = stored ? JSON.parse(stored) : Contact;

    contactList.forEach(hd => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${hd.maHD}</td>
            <td>${hd["Bảo hiểm nhân thọ"]}</td>
            <td>${hd.nguoiThuHuong}</td>
            <td>${hd.ngayKiKet}</td>
            <td>${hd.ngayKetThuc}</td>
            <td>
                <button class="btn btn-edit">Sửa</button>
                <button class="btn btn-delete">Xoá</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    localStorage.removeItem("updatedContactList");
    // Gắn sự kiện sửa
    const table = document.getElementById('contactTable');
    table.addEventListener('click', function (e) {
        const btn = e.target;
        if (btn.classList.contains('btn-edit')) {
            const row = btn.closest('tr');
            const maHD = row.children[0].textContent.trim();

            console.log('Sửa hợp đồng với mã:', maHD);
            localStorage.setItem('editMaHD', maHD);
            window.location.href = 'edit-contact.html';
        }
    });
});
