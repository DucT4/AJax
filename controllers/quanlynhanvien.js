var nhanVien = new NhanVien();
console.log(nhanVien)
var nhanVien2 = new NhanVien();
console.log('nhanVien2',nhanVien2);

document.querySelector('#btnHienThi').onclick = function (){
    //input: Những thông tin sinh viên người dùng nhập vào (nhanVien)
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nhanVien.heSoLuong = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = +document.querySelector('#luongCoBan').value;
    nhanVien.soGioLam = +document.querySelector('#soGioLam').value;
    // nhanVien.chucVu = document.querySelector('#tenNhanVien').value;

    //Hướng dẫn lấy innerHTML của thẻ select chứa option được chọn
    var slChucVu = document.querySelector('#chucVu');
    //.selectedIndex: lấy ra vị trí của option được chọn
    var viTriOption = slChucVu.selectedIndex;
    nhanVien.chucVu = slChucVu[viTriOption].innerHTML;
    //output: đối tượng nhân viên sau khi tính lương ...

    document.querySelector('#txt_maNhanVien').innerHTML = nhanVien['maNhanVien'];
    document.querySelector('#txt_tenNhanVien').innerHTML = nhanVien['tenNhanVien'];
    document.querySelector('#txt_heSoLuong').innerHTML = nhanVien['heSoLuong'];
    document.querySelector('#txt_ChucVu').innerHTML = nhanVien['chucVu'];
    document.querySelector('#txt_tongLuong').innerHTML = nhanVien['tinhLuong']();



}