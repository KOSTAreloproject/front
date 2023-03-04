$(() => {
  $('.alert_check_password').hide();
  $('.alert-box').hide();
  $('.user_profile').hide();
  $('.profile_info').hide();

  function profiledetail() {
    let url = backUrl + 'member/detail';
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: 'get',
      success: function (result) {
        // 1. 프로필 페이지 요청시, dto 요청
        // 2. dto 응답 성공하면 이미지 재요청함
        $('.desc_email').html(result.email);
        $('.desc_pwd').html(result.pwd);
        $('.desc_name').html(result.name);
        $('.desc_tel').html(result.tel);
        $('.desc_birth').html(result.birth);
        $('#accent').html(result.name);

        $('#alert_check_password').hide();
        $('.user_profile').show();
        $('.profile_info').show();

        showProfile();
      },
      error: function (xhr) {
        alert('비밀번호 다시 입력 바람');
        $('#input06').val('');
      },
    });
  }

  function showProfile() {
    $.ajax({
      url: backUrl + 'member/img',
      xhrFields: {
        responseType: 'blob', //이미지다운로드용 설정
        withCredentials: true,
      },
      cache: false, //이미지다운로드용 설정
      success: function (result) {
        let blobStr = URL.createObjectURL(result);
        if (result == null) {
          $('#user_img').attr('src', '../imgs/defaultProfileImg.png');
        } else {
          $('#user_img').attr('src', blobStr);
        }
      },
    });
  }

  $('#change_img').click(function () {
    $.ajax({
      url: backUrl + 'member/img/3',
      xhrFields: {
        withCredentials: true,
        responseType: 'blob', //이미지다운로드용 설정
      },
      cache: false, //이미지다운로드용 설정
      success: function (result) {
        let blobStr = URL.createObjectURL(result);
        $('#user_img').attr('src', blobStr);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });

  $('#ok_input_pwd').click(profiledetail());

  // -- 엔터 누르면 확인 버튼 클릭됨 start --
  $('input[type=password]').keyup(function (e) {
    if (e.which === 13) {
      $('#ok_input_pwd').click(profiledetail());
    }
  });
  // -- 엔터 누르면 확인 버튼 클릭됨 end --

  $('#change_img').click(function () {
    $('#real_change_img').click();
  });

  $('#del_btn').click(function () {
    $.ajax({
      url: backUrl + 'member/delprofile',
      xhrFields: {
        withCredentials: true,
      },
      method: 'delete',
      success: function () {
        alert('이미지 삭제 성공!');
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });

  //디바운스
  let timer = false; //최초 false
  const filterByDebounce = (e, callback) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      callback('' + e.target.value);
    }, 300); //300ms 이후 반응(디바운스)
  };

  //이메일 정규식 검사
  function validateEmail(strEmail) {
    const reg_email =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!reg_email.test('' + strEmail)) {
      return false;
    }
    return true;
  }

  //이메일 유효성 검사
  $('#new_email').on('input', function (e) {
    filterByDebounce(e, (strEmail) => {
      let error_msg = '';
      if (!validateEmail(strEmail)) {
        error_msg = '이메일 주소를 정확히 입력해주세요.';
        $('#alarm_mail').attr('disabled', true);
        $('#alarm_mail').css('background-color', '#ebebeb');
        $('#alarm_mail').css('cursor', 'default');
        $('#email_txt').css('color', 'tomato');
        $('#error_msg_email').css('color', 'tomato');
        $('#new_email').css('border-bottom', '1px solid tomato');
      } else {
        $('#alarm_mail').attr('disabled', false);
        $('#alarm_mail').css('cursor', 'pointer');
        $('#alarm_mail').css('background-color', '#000000');
        $('#email_txt').css('color', '');
        $('#new_email').css('border-bottom', '');
      }
      $('#error_msg_email').html(error_msg);
    });
  });

  //비밀번호 정규식 검사
  function validatePassword(strPassword) {
    const reg_password =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!reg_password.test('' + strPassword)) {
      return false;
    }
    return true;
  }

  $('#check_pwd').keyup(function (e) {
    filterByDebounce(e, (strPassword) => {
      let error_msg = '';
      if (!validatePassword(strPassword)) {
        error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';

        $('#store1').attr('disabled', true);
        $('#pre_input_pwd').css('color', 'tomato');
        $('#error_msg_pwd1').css('color', 'tomato');
        $('#check_pwd').css('border-bottom', '1px solid tomato');
      } else {
        if ($('#check_pwd').val() != $('.desc_pwd').text()) {
          error_msg = '이전 비밀번호와 일치하지 않습니다.';
          $('#store1').attr('disabled', true);
          $('#pre_input_pwd').css('color', 'tomato');
          $('#error_msg_pwd1').css('color', 'tomato');
          $('#check_pwd').css('border-bottom', '1px solid tomato');
        } else {
          $('#pre_input_pwd').css('color', '');
          $('#check_pwd').css('border-bottom', '');
        }
      }
      $('#error_msg_pwd1').html(error_msg);
    });
  });

  $('#new_pwd').keyup(function (e) {
    filterByDebounce(e, (strPassword) => {
      let error_msg = '';
      if (!validatePassword(strPassword)) {
        error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
        $('#store1').attr('disabled', true);
        $('#new_input_pwd').css('color', 'tomato');
        $('#error_msg_pwd2').css('color', 'tomato');
        $('#new_pwd').css('border-bottom', '1px solid tomato');
      } else {
        if ($(this).val() == $('.desc_pwd').text()) {
          error_msg = '이전 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.';
          $('#store1').attr('disabled', true);
          $('#new_input_pwd').css('color', 'tomato');
          $('#error_msg_pwd2').css('color', 'tomato');
          $('#new_pwd').css('border-bottom', '1px solid tomato');
        } else {
          $('#new_input_pwd').css('color', '');
          $('#new_pwd').css('border-bottom', '');
        }
      }
      $('#error_msg_pwd2').html(error_msg);
    });
  });

  // 비밀번호 저장 버튼 활성화
  $('input[name="check_valid_pwd"]').keyup(function () {
    let pre_pwd = $('#check_pwd').val();
    let new_pwd = $('#new_pwd').val();

    if (
      new_pwd != $('.desc_pwd').text() &&
      validatePassword(pre_pwd) &&
      validatePassword(new_pwd)
    ) {
      $('#store1').attr('disabled', false);
      $('#store1').css('background-color', '#000000');
      $('#store1').css('cursor', 'pointer');
    } else {
      $('#store1').css('background-color', '#ebebeb');
      $('#store1').css('cursor', 'default');
    }
  });

  //휴대폰번호 정규식 검사
  function validateTell(strTell) {
    const reg_tell = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (!reg_tell.test('' + strTell)) {
      return false;
    }
    return true;
  }

  // 휴대폰번호 유효성 검사
  $('#new_tel').on('input', function (e) {
    filterByDebounce(e, (strTell) => {
      let error_msg = '';
      if (!validateTell(strTell)) {
        error_msg = '휴대폰 번호를 정확히 입력해주세요.(' - '제외 후 입력)';
        $('#store3').attr('disabled', true);
        $('#store3').css('background-color', '#ebebeb');
        $('#store3').css('cursor', 'default');
        $('#new_input_tel').css('color', 'tomato');
        $('#error_msg_tel').css('color', 'tomato');
        $('#new_tel').css('border-bottom', '1px solid tomato');
      } else {
        $('#store3').attr('disabled', false);
        $('#store3').css('background-color', '#000000');
        $('#store3').css('cursor', 'pointer');
        $('#new_input_tel').css('color', '');
        $('#new_tel').css('border-bottom', '');
      }
      $('#error_msg_tel').html(error_msg);
    });
  });

  // -- 변경 버튼 클릭시 입력폼 출력 start --

  // -- 이메일 start --
  $('#form_email').hide();

  $('#btn_modify0').click(function () {
    $('#show_email').hide();
    $('#form_email').show();
  });

  $('#cancle1').on('click', function () {
    $('#form_email').hide();
    $('#new_email').val('');
    $('#alarm_mail').css('cursor', 'default');
    $('#alarm_mail').css('background-color', '#ebebeb');
    $('#show_email').show();
  });
  // -- 이메일 end --

  // -- 비밀번호 start --
  $('#form_pwd').hide();

  $('#btn_modify1').click(function () {
    $('#notice_pwd').hide();
    $('#form_pwd').show();
  });

  $('#cancle2').on('click', function () {
    $('#form_pwd').hide();
    $('#check_pwd').val('');
    $('#new_pwd').val('');
    $('#store1').css('background-color', '#ebebeb');
    $('#store1').css('cursor', 'default');
    $('#notice_pwd').show();
  });
  // -- 비밀번호 end --

  // -- 휴대폰번호 start --
  $('#form_tel').hide();

  $('#btn_modify2').click(function () {
    $('#notice_tel').hide();
    $('#form_tel').show();
  });

  $('#cancle3').on('click', function () {
    $('#form_tel').hide();
    $('#new_tel').val('');
    $('#store3').css('background-color', '#ebebeb');
    $('#store3').css('cursor', 'default');
    $('#notice_tel').show();
  });
  // -- 휴대폰번호 end --

  // -- 변경 버튼 클릭시 입력폼 출력 end --

  // -- 이메일 변경 요청 start --
  $('#alarm_mail').click(function () {
    let $email = $('#new_email').val();
    let object = { email: $email };
    $.ajax({
      url: backUrl + 'member/edit',
      xhrFields: {
        withCredentials: true,
      },
      method: 'put',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(object),
      success: function () {
        alert('변경 성공');
        re_detail();
        $('#cancle1').click();
        $('#alarm_mail').attr('disabled', true);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });

  // -- 이메일 변경 요청 end --

  // -- 휴대폰 번호 변경 요청 start --
  $('#store3').click(function () {
    let $tel = $('#new_tel').val();
    let object = { tel: $tel };
    $.ajax({
      url: backUrl + 'member/edit',
      xhrFields: {
        withCredentials: true,
      },
      method: 'put',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(object),
      success: function () {
        alert('변경 성공');
        re_detail();
        $('#cancle3').click();
        $('#store3').attr('disabled', true);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });
  // -- 휴대폰 번호 변경 요청 end --

  // -- 비밀번호 변경 요청 start --
  $('#store1').click(function () {
    let $pwd = $('#new_pwd').val();
    let object = { pwd: $pwd };
    $.ajax({
      url: backUrl + 'member/edit',
      xhrFields: {
        withCredentials: true,
      },
      method: 'put',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(object),
      success: function () {
        alert('변경 성공');
        re_detail();
        $('#cancle2').click();

        $('#store1').attr('disabled', true);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });
  // -- 비밀번호 변경 요청 end --

  // -- 개인정보 수정 후 재요청 start --
  function re_detail() {
    let url = backUrl + 'member/detail';
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: 'get',
      success: function (result) {
        $('.desc_email').html(result.email);
        $('.desc_pwd').html(result.pwd);
        $('.desc_name').html(result.name);
        $('.desc_tel').html(result.tel);
        $('.desc_birth').html(result.birth);
        $('#accent').html(result.name);
      },
    });
  }
  // -- 개인정보 수정 후 재요청 end --
});
