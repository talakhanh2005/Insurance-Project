document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const maHD = params.get("maHD");
  
    const dsHopDong = JSON.parse(localStorage.getItem("dsHopDong")) || [];
    const hopDong = dsHopDong.find(h => h.maHD.trim() === maHD?.trim());
  
    if (!hopDong) {
      alert("Không tìm thấy hợp đồng để chỉnh sửa!");
      return;
    }
  
    document.getElementById("maHD").value = hopDong.maHD;
    document.getElementById("nguoiThuHuong").value = hopDong.nguoiThuHuong;
    document.getElementById("nhanVien").value = hopDong.nhanVien;
    document.getElementById("ngayBatDau").value = hopDong.ngayBatDau;
    document.getElementById("ngayKetThuc").value = hopDong.ngayKetThuc;
  
    document.getElementById("maHD").readOnly = true;
    document.getElementById("nguoiThuHuong").readOnly = true;
    document.getElementById("nhanVien").readOnly = true;
  
    document.getElementById("editForm").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const newBD = document.getElementById("ngayBatDau").value;
      const newKT = document.getElementById("ngayKetThuc").value;
  
      const index = dsHopDong.findIndex(h => h.maHD.trim() === maHD?.trim());
      if (index !== -1) {
        dsHopDong[index].ngayBatDau = newBD;
        dsHopDong[index].ngayKetThuc = newKT;
        localStorage.setItem("dsHopDong", JSON.stringify(dsHopDong));
        alert("Cập nhật thành công!");
        window.location.href = "list-contact.html";
      } else {
        alert("Không tìm thấy hợp đồng để cập nhật!");
      }
    });
  });
  