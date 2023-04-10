
// var soDienThoaiSV1 ='090909099';
// var hoTenSV1 = 'Nguyen Van A';

// var hoTenSV2 = 'Nguyen Van B';
// var soDienThoaiSV2 = '0908080808';
// var diemToan = 9;
// var diemLy = 8;
// var diemHoa = 10;


//Tổ chức đối tượng object
/**
 *  object = {key: value} 
 *  key (tên biến): tên thuộc tính, value (giá trị) là giá trị
 * 
 */
//Khai báo đối tượng
var thongTinSV = {
    ma:'SV001',
    hoTen: 'Nguyen Van A',
    soDienThoai:'09090909',
    diemToan:1,
    diemLy:2,
    diemHoa:3,
    hienThi: function () {
        console.log('Họ tên',hoTen)
    },
    tinhDiemTrungBinh: function(){
        return (thongTinSV.diemHoa + thongTinSV.diemLy + thongTinSV.diemToan)/3
    }
    
}
var lopHoc = {
    ma: 'BC45',
    tenLop:'BootCamp45'
}


/* Truy xuất biến trong đối tượng (Hay còn gọi là thuộc tính). Biến (thuộc tính, property ) trong đối tượng nào thì đối tượng đó sử dụng được thôi
   Cách 1: [ten_doi_tuong].[ten_thuoc_tinh]
   Cách 2: [ten_doi_tuong]["ten_thuoc_tinh"]
*/
console.log('Họ tên',thongTinSV.hoTen);
console.log('Mã Sinh Viên', thongTinSV.ma);
console.log('Mã lớp', lopHoc.ma)

console.log('Số điện thoại', thongTinSV["soDienThoai"])
/*
    Truy xuất hàm trong đối tượng (phương thức - method). 
    Cách 1: [ten_doi_tuong].[ten_phuong_thuc]();
       Cách 2: [ten_doi_tuong]["ten_phuong_thuc"] ()
*/

thongTinSV.tinhDiemTrungBinh();
thongTinSV["tinhDiemTrungBinh"]();

/*
    => Khai báo theo hướng đối tượng là đưa biến và hàm về đúng vị trí của nó
    object chứa:
    + Biến: Thuộc tính (property - key)
    + Hàm: Phương thức (method - key)
    Truy xuất thuộc tính và phương thức thì phải thông qua đối tượng

*/

/* ----------------------------- */
/*
    Khi giải quyết 1 task, chức năng của frontend
    B1: Dàn layout (100%)
    B2: Xác định chức năng (onclick, onchange, ...)
    B3: Phân tích giao diện đó có các input nào cần lưu trữ, và output là gì => Tổ chức đối tượng lưu trữ
    B4: Xác định output
    B5: Xử lý sự kiện 
*/
var sinhVien = {
    maSinhVien:'',
    tenSinhVien:'',
    loaiSinhVien:'',
    diemToan:0,
    diemVan:0,
    tinhDiemTrungBinh: function () { //input: điểm toán: number, diem van:number
        //output:
        var dtb = 0;
        dtb = (this.diemToan + this.diemVan)/2;
        return dtb;
    },
    xepLoaiSV: function () {
        var diemTB = this.tinhDiemTrungBinh();
        var xepLoai = ''; //output
        if(diemTB >= 5) {
            xepLoai = 'Đậu';
        }else {
            xepLoai = 'Rớt';
        }
        return xepLoai;
    }
}
//Các giá trị tính toán được sẽ không đưa vào lưu trữ


document.getElementById('btnHienThi').onclick = function () {
    //input: ?? maSinhVien, tenSinhVien, ...
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    
    sinhVien.diemToan = +document.querySelector('#diemToan').value;
    sinhVien.diemVan = +document.querySelector('#diemVan').value;
    console.log('sinhVien', sinhVien);
    //output: ??? sinhVien
    document.querySelector('#txt_maSinhVien').innerHTML = sinhVien.maSinhVien;
    document.querySelector('#txt_tenSinhVien').innerHTML = sinhVien.tenSinhVien;
    document.querySelector('#txt_loaiSinhVien').innerHTML = sinhVien.loaiSinhVien;
    var diemTrungBinh = sinhVien.tinhDiemTrungBinh();
    document.querySelector('#txt_diemTrungBinh').innerHTML = diemTrungBinh;
    document.querySelector('#txt_xepLoai').innerHTML = sinhVien.xepLoaiSV();
}

