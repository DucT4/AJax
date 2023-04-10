

//_-------------------GET:Lấy(đọc) dữ liệu từ phía server
function layDanhSachSinhVien() {
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
        method: 'GET'
    })
    promise.then(function (ketQua) {
        console.log(ketQua.data);
        var arrSinhVien = ketQua.data;
        renderSinhVien(arrSinhVien);
    })

    promise.catch(function (err) {
        console.log(err);
    })
}
layDanhSachSinhVien();

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
//---------------------Post:thêm dữ liệu từ phía server -------
document.querySelector('#frmSinhVien').onsubmit = function (event) {
    event.preventDefault();
    var sinhVien = new SinhVien();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    console.log(sinhVien)

    //dung ajax gui du lieu ve server
    var promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien ',
        method: 'POST',
        data: sinhVien  //format đúng như format BE yêu cầu
    })
    promise.then(function (ketQua) {
        //sau khi thêm thành công
        console.log(ketQua.data);
        //gọi lại api để load lại table từ api layDanhSachSinhVien
        layDanhSachSinhVien(sinhVien);
    })


    promise.catch(function (err) {
        console.log(err)
    })
}

//------delete-----
function xoaSinhVienTheoMa(maSVClick) {
    console.log(maSVClick);
    let promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSVClick,
        method: 'DELETE',

    })
    promise.then(function (ketQua) {
        console.log(ketQua)
    })
    promise.catch(function (err) {
        console.log(err)
    })
    layDanhSachSinhVien();

}


function suaSinhVien(maSVClick) {
    console.log(maSVClick);
    let promise = axios({
        url: 'https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=' + maSVClick,
        method: 'GET'
    })
    promise.then(function (ketQua) {
        console.log(ketQua);
        var sv = ketQua.data;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;

    })
    promise.catch(function (err) {
        console.log(err);
    })
    layDanhSachSinhVien();
}
//////PUT
document.querySelector('#btnLuu').onclick = function () {
    var svCN = new SinhVien();
    svCN.maSinhVien = document.querySelector('#maSinhVien').value;
    svCN.tenSinhVien = document.querySelector('#tenSinhVien').value;
    svCN.email = document.querySelector('#email').value;
    svCN.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    svCN.diemHoa = document.querySelector('#diemHoa').value;
    svCN.diemLy = document.querySelector('#diemLy').value;
    svCN.diemToan = document.querySelector('#diemToan').value;
    svCN.soDienThoai = document.querySelector('#soDienThoai').value;
    svCN.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    console.log('svCn', svCN);
    var promise = axios({
        url: ' https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=' + svCN.maSinhVien,
        method: 'PUT',
        data: svCN  //dung format BE can
    })
    promise.then(function (ketQua) {
        console.log(ketQua);
        layDanhSachSinhVien();
    })
    promise.catch(function (err) {
        console.log(err);
    })
}


//hàm setInterval: từ động thực thi sau 1 khoảng thời gian quy định
setInterval(function () {
    layDanhSachSinhVien()
}, 3000);

//-----status code thông dụng ------
/*
200: dữ liệu gửi đến server và đc xử lí thành công
201: dữ liệu tạo thành công
400: bad request (dữ liệu không tìm thấy trên server)-request api có 
param tuy nhiên dựa vào param đó server không tìm thyấy dữ liệu
404: Request trên 1 api không tồn tại (not found). Request dựa trên param
ko tìm thấy dữ liệu hoặc link server không tồn tại.
500: Lỗi xảy ra tại server (Error in server). Lỗi xảy ra logic phía backend không 
được xử lí. Lỗi có thể do FE hoặc BE gây ra.
=> xác định lỗi khi có status 500
  +Test post man có thành công không, nếu lỗi => BE sai
  +Test post man có thành công không, nếu không => FE lỗi => kiểm tra format dữ liệu fontend
  (đúng các giát trị dữ liệu hay chưa thường sai kiểu dữ liệu hoặc các dữ liệu tham chiếu category)
401: request đến api nhưng chưa được cấp quyền truy cập (Unauthorize)
403: Forbiden có quyền truy cập nhưng chưa đủ quyền truy cập vào aip này






*/

( async function loadPhim() {
    try { //bắt lỗi
    var res = await axios({
        url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05',
        method: 'GET',
        headers: {
            TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjI1MjgwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyNDAwNDAwfQ.koJoVYBtMkaBZLooaJxN6_nhD2HZvLLsyYZwdpdnD1U'
        }
    });
    var mangPhim = res.data.content;
        var content = '';
        for (var index = 0; index < mangPhim.length; index++) {
            var phim = mangPhim[index];
            content += `
            <div class="col-4">
                 <div class="card">
                    <img src="${phim.hinhAnh}" alt="...">
    
                    <div class="card-body">
                      <h5>${phim.tenPhim}</h5>
                      <p>${phim.moTa}</p>
                    </div>
                </div> 
            </div>
           `;
        }
        document.querySelector('#danh-sach-phim').innerHTML = content;
    } catch(err){
        console.log(err)
    }
})() 
/*
khi nào sử dụng async await và then catch
 + có thể sd cả 2 khi chỉ có 1 api
 + đối với các api không phụ thuộc vào nhau thì nên sử dụng promise  
 + đối vớii các api phụ thuộc vào nhau thì nên sử dụng async await (Để code dễ đọc) 


*/
// (function loadPhim() {
//     var promise = axios({
//         url: 'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP05',
//         method: 'GET',
//         headers: {
//             TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0NSIsIkhldEhhblN0cmluZyI6IjExLzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMjI1MjgwMDAwMCIsIm5iZiI6MTY3MjA3NDAwMCwiZXhwIjoxNzAyNDAwNDAwfQ.koJoVYBtMkaBZLooaJxN6_nhD2HZvLLsyYZwdpdnD1U'
//         }
//     }).then(function (res) {
//         console.log(res.data)
//         var mangPhim = res.data.content;
//         var content = '';
//         for (var index = 0; index < mangPhim.length; index++) {
//             var phim = mangPhim[index];
//             content += `
//             <div class="col-4">
//                  <div class="card">
//                     <img src="${phim.hinhAnh}" alt="...">
    
//                     <div class="card-body">
//                       <h5>${phim.tenPhim}</h5>
//                       <p>${phim.moTa}</p>
//                     </div>
//                 </div> 
//             </div>


// `;
//         }
//         document.querySelector('#danh-sach-phim').innerHTML = content;

//     }).catch(function (err) {


//         console.log(err.response.data)

//     })
// })() //IIFE function