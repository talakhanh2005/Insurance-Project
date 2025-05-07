document.addEventListener("DOMContentLoaded", () => {
    const maHD = localStorage.getItem("editMaHD");
    if (!maHD) {
      alert("Không tìm thấy mã hợp đồng cần sửa");
      window.location.href = "list-contact.html";
      return;
    }
  
    // Tìm hợp đồng từ mảng Contact
    const index = Contact.findIndex(c => c.maHD === maHD);
    if (index === -1) {
      alert("Không tìm thấy hợp đồng tương ứng");
      return;
    }
    console.log(index)
    const hopDong = Contact[index];
  
    // Đổ dữ liệu vào form
    document.getElementById("maHD").value = hopDong.maHD;
    document.getElementById("loaiHD").value = hopDong.loaiHD;
    document.getElementById("nguoiThuHuong").value = hopDong.nguoiThuHuong;
    document.getElementById("ngayKiKet").value = hopDong.ngayKiKet;
    document.getElementById("ngayKetThuc").value = hopDong.ngayKetThuc;
  
    // Lưu thay đổi
    document.getElementById("editForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      Contact[index].loaiHD = document.getElementById("loaiHD").value;
      Contact[index].nguoiThuHuong = document.getElementById("nguoiThuHuong").value;
      Contact[index].ngayKiKet = document.getElementById("ngayKiKet").value;
      Contact[index].ngayKetThuc = document.getElementById("ngayKetThuc").value;
  
      // Lưu mảng Contact mới vào localStorage hoặc cập nhật giao diện
      localStorage.setItem("updatedContactList", JSON.stringify(Contact));
  
      alert("Đã lưu thay đổi!");
      window.location.href = "list-contact.html";
    });
  });
  