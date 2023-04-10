
// Tạo ra biến array sinh viên để lưu trữ tất cả thông tin sinh viên
var arrSinhVien = [];

document.querySelector('#frmSinhVien').onsubmit = function (event) {
    // event.target
    event.preventDefault(); //Chặn sự kiện reload lại trang
    //input: thông tin sinh viên object sinhVien
    var sv = new SinhVien();
    sv.maSinhVien = document.querySelector('#maSinhVien').value;
    sv.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sv.email = document.querySelector('#email').value;
    sv.soDienThoai = document.querySelector('#soDienThoai').value;
    sv.diemHoa = +document.querySelector('#diemHoa').value;
    sv.diemToan = +document.querySelector('#diemToan').value;
    sv.diemLy = +document.querySelector('#diemLy').value;
    sv.diemRenLuyen = +document.querySelector('#diemRenLuyen').value;
    sv.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    //output: sinhVien
    console.log(sv);

    var valid = true;
valid =kiemTraRong(sv.maSinhVien,'maSinhVien') & kiemTraRong(sv.tenSinhVien,'tenSinhVien') & kiemTraRong(sv.email,'email') & kiemTraRong(sv.soDienThoai,'soDienThoai') & kiemTraEmail(sv.email,'email') & kiemTraSo(sv.soDienThoai,'soDienThoai') & kiemTraKiTu(sv.tenSinhVien,'tenSinhVien') & kiemTraDoDai(sv.maSinhVien,'maSinhVien',1,10);
valid += kiemTraGiaTri(sv.diemRenLuyen,'diemRenLuyen',0,10) &kiemTraGiaTri(sv.diemToan,'diemToan',0,10)& kiemTraGiaTri(sv.diemHoa,'diemHoa',0,10) & kiemTraGiaTri(sv.diemLy,'diemLy',0,10)




    if (!valid) {
        return;
    }
    //Trước khi đưa giá trị vào mảng và đưa ra table thì kt tính hợp lệ

    //Đưa dữ liệu sinh viên vào array sau mỗi lần thêm dữ liệu
    arrSinhVien.push(sv);
    //Gọi hàm tạo table sinh viên = html 

    renderSinhVien(arrSinhVien)

    //Lữu vào localstorage
    saveStorage();

    console.log('arrSinhVien', arrSinhVien);


    {
        //Sau khi có thông tin sinh viên => Tạo ra các thẻ 
        // var trSinhVien = document.createElement('tr');

        // //Tạo thẻ td chứa nội dung 
        // var tdMaSinhVien = document.createElement('td');
        // tdMaSinhVien.innerHTML = sv.maSinhVien;

        // var tdTenSinhVien = document.createElement('td');
        // tdTenSinhVien.innerHTML = sv.tenSinhVien;

        // var tdEmail = document.createElement('td');
        // tdEmail.innerHTML = sv.email;

        // var tdSoDienThoai = document.createElement('td');
        // tdSoDienThoai.innerHTML = sv.soDienThoai;

        // var tdDiemTrungBinh = document.createElement('td');
        // tdDiemTrungBinh.innerHTML = sv.tinhDiemTrungBinh();


        // var tdChucNang = document.createElement('td');
        // var btnXoa = document.createElement('button');
        // btnXoa.innerHTML = 'xoá';
        // btnXoa.className = 'btn btn-danger';
        // btnXoa.onclick = function () {
        //     //parentElement: dom đến thẻ cha của thẻ hiện tại
        //     //tag.remove(): xoá đi tag đó khỏi dom
        //     // btnXoa.parentElement.parentElement.remove();
        //     //.closest(selector) : dom đến selector gần nhất chứa thẻ đó
        //     btnXoa.closest('tr').remove();
        // }


        // tdChucNang.appendChild(btnXoa);


        // trSinhVien.appendChild(tdMaSinhVien);
        // trSinhVien.appendChild(tdTenSinhVien);
        // trSinhVien.appendChild(tdEmail);
        // trSinhVien.appendChild(tdSoDienThoai);
        // trSinhVien.appendChild(tdDiemTrungBinh);
        // trSinhVien.appendChild(tdChucNang);

        //  document.querySelector('#tblSinhVien').appendChild(trSinhVien);
    }
}


/**
 * Hàm nhận vào 1 arrSinhVien 
 * [
 * {maSinhVien:1,tenSinhVien:'A',...}, 0
 * {maSinhVien:2,tenSinhVien:'B',...}, 1
 * {maSinhVien:3,tenSinhVien:'C',...}  2
 * ] và trả về htmlstring
 * <tr>
 *  <td>1</td>
 *  <td>A</td>
 * ...
 * </tr>
 * @param {*} arrSV là mảng [
    {maSinhVien:1,tenSinhVien:'A',...}, 0
    {maSinhVien:2,tenSinhVien:'B',...}, 1
    {maSinhVien:3,tenSinhVien:'C',...}  2
  ]
 */
function renderSinhVien(arrSV) {
    let htmlContent = '';
    for (var index = 0; index < arrSV.length; index++) {
        var svNew = new SinhVien();
        /* svNew = {maSinhVien:'',tenSinhVien:'',..., tinhDiemTrungBinh: f{}} */
        var sv = arrSV[index]; /// {maSinhVien:1,tenSinhVien:'A',...}
        Object.assign(svNew, sv);
        htmlContent += `
            <tr>
                <td>${svNew.maSinhVien}</td>
                <td>${svNew.tenSinhVien}</td>
                <td>${svNew.email}</td>
                <td>${svNew.soDienThoai}</td>
                <td>${svNew.tinhDiemTrungBinh()}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${index}')">Xoá</button></td>
                <td>
                <button class="btn btn-danger mx-2" onclick="xoaSinhVienTheoMa('${svNew.maSinhVien}')">Xoá</button>
                <button class="btn btn-primary mx-2" onclick="suaSinhVien('${svNew.maSinhVien}')">chỉnh sửa</button>
                </td>
            </tr>
        `
    }

    document.querySelector('#tblSinhVien').innerHTML = htmlContent;
    return htmlContent;
}
/*
    [
    {maSinhVien:1,tenSinhVien:'A',...}, 0
    {maSinhVien:2,tenSinhVien:'B',...}, 1
    {maSinhVien:3,tenSinhVien:'C',...}  2
  ]
*/

function suaSinhVien(maSVClick) {
    console.log(maSVClick);

    var indexEdit = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        if (maSVClick === arrSinhVien[index].maSinhVien) {
            indexEdit = index;
            break;
        }
    }
    //Tìm thấy sinh viên object trong mảng ở vị trí edit => load lên input form
    if (indexEdit !== -1) {
        document.querySelector('#maSinhVien').value = arrSinhVien[indexEdit].maSinhVien;
        document.querySelector('#tenSinhVien').value = arrSinhVien[indexEdit].tenSinhVien;
        document.querySelector('#loaiSinhVien').value = arrSinhVien[indexEdit].loaiSinhVien;
        document.querySelector('#email').value = arrSinhVien[indexEdit].email;
        document.querySelector('#soDienThoai').value = arrSinhVien[indexEdit].soDienThoai;
        document.querySelector('#diemToan').value = arrSinhVien[indexEdit].diemToan;
        document.querySelector('#diemLy').value = arrSinhVien[indexEdit].diemLy;
        document.querySelector('#diemHoa').value = arrSinhVien[indexEdit].diemHoa;
        document.querySelector('#diemRenLuyen').value = arrSinhVien[indexEdit].diemRenLuyen;

        document.querySelector('#maSinhVien').disabled = true;
        document.querySelector('#btnThemSinhVien').disabled = true;


    }

}


document.querySelector('#btnLuu').onclick = function () {
    //Lấy thông tin sau khi người dùng edit giao diện
    var sinhVienEdit = new SinhVien();
    sinhVienEdit.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVienEdit.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVienEdit.email = document.querySelector('#email').value;
    sinhVienEdit.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVienEdit.diemToan = document.querySelector('#diemToan').value;
    sinhVienEdit.diemLy = document.querySelector('#diemLy').value;
    sinhVienEdit.diemHoa = document.querySelector('#diemHoa').value;
    sinhVienEdit.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVienEdit.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log('sinhVienEdit', sinhVienEdit);
    for (var index = 0; index < arrSinhVien.length; index++) {
        if (arrSinhVien[index].maSinhVien === sinhVienEdit.maSinhVien) {
            //Tại vị trí sinh viên trong mảng trùng mã với sinh vien edit => lấy giá trị trong mảng gán = edit
            var svMang = arrSinhVien[index];
            svMang.tenSinhVien = sinhVienEdit.tenSinhVien;
            svMang.email = sinhVienEdit.email;
            svMang.soDienThoai = sinhVienEdit.soDienThoai;
            svMang.diemHoa = sinhVienEdit.diemHoa;
            svMang.diemToan = sinhVienEdit.diemToan;
            svMang.diemLy = sinhVienEdit.diemLy;
            svMang.diemRenLuyen = sinhVienEdit.diemRenLuyen;
            svMang.loaiSinhVien = sinhVienEdit.loaiSinhVien;
            break;
        }
    }
    //Sau khi thay đổi xong render lại bảng mới
    renderSinhVien(arrSinhVien);
    //Lưu vào storage
    saveStorage();

    //Mở lại control btnLuu và maSinhVien
    document.querySelector('#maSinhVien').disabled = false;
    document.querySelector('#btnThemSinhVien').disabled = false;
    //reset tất cả input của thẻ form
    document.querySelector('form').reset();
}


function xoaSinhVien(indexXoa) {
    console.log(indexXoa);
    //Xoá object trong mảng dựa vào index
    arrSinhVien.splice(indexXoa, 1);
    //Gọi lại logic renderSinhVien với mảng sau khi xoá
    renderSinhVien(arrSinhVien);
}
/*
* @param {*} arrSV là mảng [
    {maSinhVien:1,tenSinhVien:'A',...}, 0
    {maSinhVien:2,tenSinhVien:'B',...}, 1
    {maSinhVien:3,tenSinhVien:'C',...}  2
  ]
 */
function xoaSinhVienTheoMa(maSVClick) { //2
    // alert(maSVClick);
    var indexDel = -1;
    for (var index = 0; index < arrSinhVien.length; index++) {
        var sinhVien = arrSinhVien[index];
        if (sinhVien.maSinhVien === maSVClick) {
            indexDel = index;
            break;
        }
    }
    if (indexDel !== -1) {
        arrSinhVien.splice(indexDel, 1);
        renderSinhVien(arrSinhVien);
    }
}

// arrSinhVien.splice(index,1)

function saveStorage() {
    //B1: Xác định được dữ liệu cần lưu là arr,object hay string,bool,number
    var sArrSinhVien = JSON.stringify(arrSinhVien); //Biến đổi arrSinhVien => chuỗi
    console.log(sArrSinhVien);
    //B2: Đem string arrSinhVien vào localstorage lưu trữ
    localStorage.setItem('arrSinhVien', sArrSinhVien);
    //Lưu dữ liệu vào cookie
    setCookie('arrSinhVien', sArrSinhVien, 30);

}


function getStorage() {

    if (localStorage.getItem('arrSinhVien')) {
        //Lấy chuỗi đã lưu trong localstorage gán cho biến stringArrSinhVien
        var stringArrSinhVien = localStorage.getItem('arrSinhVien');
        //Chuyển đổi stringArrSinhViên thành object và gán vào arrSinhVien
        arrSinhVien = JSON.parse(stringArrSinhVien);
        console.log('arrSinhVien', arrSinhVien);
    }
}




//Gọi hàm khi trình duyệt load xong js
getStorage();


//Gọi hàm renderSinhVien từ mã đã load
renderSinhVien(arrSinhVien);



/*Tính chất của object */
/*
    Nếu object có 2 key trùng nhau thì giá key sau sẽ đè lên giá trị key đầu
*/
// var prod = {
//     id: 1,
//     name: 'Iphone',
//     id: 2
// }

// console.log(prod);
// var prod2 = {
//     price: 1000,
//     name: 'Iphone 10'
// }
/*
    Object.assign cho phép gộp object gốc với các giá trị thuộc tính object khác
*/
// Object.assign(prod, prod2);

// console.log(prod);

/*
    object new sinhvien
    svNew = {
        maSinhVien:'',
        tenSinhVien:'',
        ...
        tinhDiemTrungBinh : func () {

        },
          maSinhVien : 1,
        tenSinhVien: 'Nguyễn Văn A'
    }

    //object storage
    sv = {
        maSinhVien : 1,
        tenSinhVien: 'Nguyễn Văn A'

    }

    // => object.assign 

*/



document.querySelector('#txtTuKhoa').oninput = function () {
    var tuKhoa = document.querySelector('#txtTuKhoa').value.trim();

    tuKhoa = stringToSlug(tuKhoa); //Nguyễn Văn A => nguyen-van-a
    console.log('Từ khoá', tuKhoa);
    var arrSinhVienTK = [];
    for (var index = 0; index < arrSinhVien.length; index++) {
        //Mỗi lần duyệt lấy ra 1 sinh viên
        var sv = arrSinhVien[index];

        if (stringToSlug(sv.tenSinhVien.trim()).search(tuKhoa) !== -1) {
            //Tìm ra tenSinhVien nào chứa từ khoá thì đưa object sinh vien đó vào mảng tìm kiếm
            arrSinhVienTK.push(sv);
        }
    }
    renderSinhVien(arrSinhVienTK);
}


// nguyễn văn a = nguyen-van-a 
// NGUYỄN vĂn A = nguyen-van-a
// arr = [{name:'A'},{name:'C'},{name:'H'},{name:'B'},{name:'D'}]
// console.log(_.orderBy(arr,['name'],['desc']))//asc sx thuan, desc sx nguoc

function xapSep(tagDangClick, name) {
    var order = tagDangClick.getAttribute('order');
    var arrSinhNew = [];
    for (var index = 0; index < arrSinhVien.length; index++) {
        sv = arrSinhVien[index];
        var svNew = new SinhVien();
        Object.assign(svNew, sv);
        svNew.alias = stringToSlug(sv.tenSinhVien);
        svNew.diemTrungBinh = svNew.tinhDiemTrungBinh();
        arrSinhNew.push(svNew);
    }




    var orrArr = _.orderBy(arrSinhNew, [name], [order]);
    //sai khi xắp sếp xong thì gán lại attribute ngược lại
    if (order == 'asc') {
        tagDangClick.getAttribute('order', 'desc')
    } else {
        tagDangClick.getAttribute('order', 'asc')
    }
    renderSinhVien(orrArr);
}
// kiểm tra tính hợp lệ của dữ liệu đầu vào (validation)

