window.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#contactTable tbody");
    const selectElement = document.getElementById('LoaiHD');

    const contactList = Contact;

    function renderContactList(selectedLoaiBH) {
        tbody.innerHTML = '';
        contactList.forEach(hd => {
            if (selectedLoaiBH === "tatCa" || selectedLoaiBH === hd["Loại bảo hiểm"]) {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${hd.maHD}</td>
                    <td>${hd["Loại bảo hiểm"]}</td>
                    <td>${hd.tenNguoiBaoHiem}</td>
                    <td>${hd.ngayThangNamSinh}</td>
                    <td style="padding-right: 10px; text-align: right">
                        <button style="border-radius: 10px;" class="btn-view">Xem chi tiết</button>
                    </td>
                `;
                tbody.appendChild(row);
            }
        });
    }
    
    renderContactList(selectElement.value);

    selectElement.addEventListener('change', function() {
        const selectedLoaiBH = this.value;
        renderContactList(selectedLoaiBH);
    });

    localStorage.removeItem("updatedContactList");
    // Gắn sự kiện Xem
    const table = document.getElementById('contactTable');
    table.addEventListener('click', function (e) {
        const btn = e.target;
        if (btn.classList.contains('btn-view')) {
            const row = btn.closest('tr');
            const maHD = row.children[0].textContent.trim();

            console.log('Xem hợp đồng với mã:', maHD);
            window.location.href = `accountantViewInfo.html?maHD=${encodeURIComponent(maHD)}`;
        }
    });
});