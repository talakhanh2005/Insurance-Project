// const roleSelect = document.getElementById("role");
//   const labelHopDong = document.getElementById("labelHopDong");

//   // Hiện/ẩn hợp đồng khi chọn role
//   roleSelect.addEventListener("change", function () {
//     const selectedRole = this.value;
//     if (selectedRole === "accountant" || selectedRole === "supervisor") {
//       labelHopDong.style.display = "block";
//     } else {
//       labelHopDong.style.display = "none";
//     }
//   });

document.addEventListener("DOMContentLoaded", function () {
    

    // Xử lý khi submit form
    document.getElementById("contractForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const contract_number = document.getElementById('contract_number').value;
        const insurance_type_id = document.getElementById('insurance_type_id').value;
        const insured_person_id = document.getElementById('insured_person_id').value;
        const start_date = document.getElementById('start_date').value;
        const end_date = document.getElementById('end_date').value;
        const insurance_value = document.getElementById('insurance_value').value;
        const premium_amount = document.getElementById('premium_amount').value;
        const payment_frequency = document.getElementById('payment_frequency').value;
        const status = document.getElementById('status').value;

        fetch("http://127.0.0.1:5000/insurance-contracts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ 
                contract_number: contract_number,
                insurance_type_id: insurance_type_id,
                insured_person_id: insured_person_id,
                start_date: start_date,
                end_date: end_date,
                insurance_value: insurance_value,
                premium_amount: premium_amount,
                payment_frequency: payment_frequency,
                status: status
            })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => {
                    throw new Error(err.error || "Có lỗi xảy ra khi tạo hợp đồng");
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                alert("thanh cong " + data.message);
                window.location.href = "employee.html"; // Chuyển hướng khi thành công
            } else {
                alert("Đã gửi yêu cầu nhưng không có phản hồi rõ ràng.");
            }
        })
        .catch(error => {
            console.error("Lỗi khi gửi dữ liệu:", error);
            alert("Không thể tạo hợp đồng: " + error.message);
        });
    });
});