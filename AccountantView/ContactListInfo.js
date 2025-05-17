window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const maHD = urlParams.get('maHD');

    if (maHD) {
        maHDBH.textContent += `${maHD}`;
        const contactList = Contact;
        const hopDongTimThay = contactList.find(item => item.maHD === maHD)
        if (hopDongTimThay) {
            hoTen.textContent += `${hopDongTimThay.tenNguoiBaoHiem}`;
            gioiTinh.textContent += `${hopDongTimThay.gioiTinh}`;
            ngaySinh.textContent += `${hopDongTimThay.ngayThangNamSinh}`;
        }
    }else {
        console.log("ko tim thay maHD")
    }

    
});