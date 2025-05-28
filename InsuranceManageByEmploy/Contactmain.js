window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#contactTable tbody");

    fetch("http://127.0.0.1:5000/insurance-types", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Không thể lấy danh sách loại bảo hiểm");
        }
        return response.json();
    })
    .then(data => {
        // Kiểm tra nếu có lỗi từ backend
        if (data.error) {
            alert(data.error);
            return;
        }

        // Dữ liệu hợp lệ
        data.forEach(users => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${users.id ?? "rong"}</td>
            <td>"rong"</td>
            <td>${users.name ?? "rong"}</td>
            <td>"rong"</td>
            <td>"rong"</td>
            <td>
                <button class="btn btn-edit">Sửa</button>
                <button class="btn btn-delete">Xoá</button>
            </td>
        `;
        tbody.appendChild(row);
    });
    })
    .catch(err => {
        console.error(err);
        alert("Đã xảy ra lỗi khi tải loại bảo hiểm");
    });
    
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
