function exportToExcel(maHD) {
    console.log("export to excel ", maHD);

    let dataToExport;
    if (maHD === "tatCa") {
        dataToExport = Contact;
    }else {
        const fonudContact = Contact.find(item => item.maHD === maHD);
        dataToExport = [fonudContact];
    }
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);; 
    const workbook = XLSX.utils.book_new();        
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1"); 

    XLSX.writeFile(workbook, "du_lieu_ke_toan.xlsx");
}