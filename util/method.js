//Chứa các hàm sử dụng chung cho hệ thống

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function stringToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, "-");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');

    return slug;
}


//validation
function kiemTraRong(value, name) {
    if (value.trim() === '') {
        document.querySelector(`#error_required-${name}`).innerHTML = 'khong duoc bo trong!';
        return false;
    }

    document.querySelector(`#error_required-${name}`).innerHTML = '';
    return true;
}
function kiemTraEmail(value, name) {
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
        document.querySelector(`#error_regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error_regex-${name}`).innerHTML = 'khong hop le !';
    return false;
}

//kiemtra ki tu
function kiemTraKiTu(value, name) {
    var regexKT = /^[A-Z a-z]+$/;
    if (regexKT.test(value)) {
        document.querySelector(`#error_regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error_regex-${name}`).innerHTML = 'khong hop le !';
    return true;

}
function kiemTraSo(value, name) {
    var regexNumber = /^[0-9]+$/;
    if (regexNumber.test(value)) {
        document.querySelector(`#error_regex-${name}`).innerHTML = '';
        return true;
    }
    document.querySelector(`#error_regex-${name}`).innerHTML = 'khong hop le !';
    return false;
}

function kiemTraDoDai(value, name, lengthMin, lengthMax) {
    if (value.trim() < lengthMin || value.trim() > lengthMax) {
        document.querySelector(`#error_length-${name}`).innerHTML = `nhap tu ${lengthMin} - ${lengthMax} ki tu !!`;
        return false;
    }
    document.querySelector(`#error_length-${name}`).innerHTML = '';
    return true;
}


function kiemTraGiaTri(value, name, minValue, maxValue) {
    if (Number.isNaN(value) || value < minValue || value > maxValue) {
        document.querySelector(`#error_value-${name}`).innerHTML = `gia tri tu ${minValue} - ${maxValue} !!`;
        return false;
    }
    document.querySelector(`#error_value-${name}`).innerHTML = '';
    return false;
}