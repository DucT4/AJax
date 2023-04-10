//prototype: Dùng để tạo ra format cho nhiều object (class - Lớp đối tượng)
function NhanVien() {
    this.maNhanVien = '';
    this.tenNhanVien = '';
    this.chucVu = '';
    this.heSoLuong = 0;
    this.luongCoBan = 0;
    this.soGioLam = 0;
    this.tinhLuong = function(){
        var luong = this.luongCoBan * this.heSoLuong * this.soGioLam;
        return luong;
    }
    this.hienThiThongTin = function () {
        console.log(this.tenNhanVien);
    }
}