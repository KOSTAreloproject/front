$(() => {
    $('.alert-box').hide();
    $('.user_profile').hide();
    $('.profile_info').hide();
  
    $('#ok_input_pwd').click(function () {
      $.ajax({
        url: backUrl + 'member/detail.do',
        xhrFields: {
          withCredentials: true,
        },
        success: function (jsonObj) {
          console.log(jsonObj);
          if ($('#input06').val() == jsonObj.pwd) {
            $('#alert_check_password').hide();
            $('.user_profile').show();
            $('.profile_info').show();
          } else {
            $('.alert-box').show();
            $('.alert-box').fadeIn(100);
            $('.alert-box').fadeOut(1500);
          }
        },
        error: function (xhr) {
          alert('오류' + xhr.status);
        },
      });
    });
  
    $('#change_img').click(function () {
      $('#real_change_img').click();
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
          $('#email_txt').css('color', 'tomato');
          $('#error_msg_email').css('color', 'tomato');
          $('#new_email').css('border-bottom', '1px solid tomato');
        } else {
          $('#alarm_mail').attr('disabled', false);
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
  
    //새 비밀번호 유효성 검사
    $('#new_pwd').on('input', function (e) {
      filterByDebounce(e, (strPassword) => {
        let error_msg = '';
        if (!validatePassword(strPassword)) {
          error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
          $('#store1').attr('disabled', true);
          $('#new_input_pwd').css('color', 'tomato');
          $('#error_msg_pwd2').css('color', 'tomato');
          $('#new_pwd').css('border-bottom', '1px solid tomato');
        } else {
          $('#store1').attr('disabled', false);
          $('#new_input_pwd').css('color', '');
          $('#new_pwd').css('border-bottom', '');
        }
        $('#error_msg_pwd2').html(error_msg);
      });
    });
  
    //이전 비밀번호 유효성 검사
    $('#check_pwd').on('input', function (e) {
      filterByDebounce(e, (strPassword) => {
        let error_msg = '';
        if (!validatePassword(strPassword)) {
          error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
          $('#store1').attr('disabled', true);
          $('#pre_input_pwd').css('color', 'tomato');
          $('#error_msg_pwd1').css('color', 'tomato');
          $('#check_pwd').css('border-bottom', '1px solid tomato');
        } else {
          $('#store1').attr('disabled', false);
          $('#pre_input_pwd').css('color', '');
          $('#check_pwd').css('border-bottom', '');
        }
        $('#error_msg_pwd1').html(error_msg);
      });
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
          $('#new_input_tel').css('color', 'tomato');
          $('#error_msg_tel').css('color', 'tomato');
          $('#new_tel').css('border-bottom', '1px solid tomato');
        } else {
          $('#store3').attr('disabled', false);
          $('#new_input_tel').css('color', '');
          $('#new_tel').css('border-bottom', '');
        }
        // alert(isNaN(error_msg));
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
  
    $('#cancle1').click(function () {
      $('#form_email').hide();
      $('#show_email').show();
    });
    // -- 이메일 end --
  
    // -- 비밀번호 start --
    $('#form_pwd').hide();
  
    $('#btn_modify1').click(function () {
      $('#notice_pwd').hide();
      $('#form_pwd').show();
    });
  
    $('#cancle2').click(function () {
      $('#form_pwd').hide();
      $('#notice_pwd').show();
    });
    // -- 비밀번호 end --
  
    // -- 휴대폰번호 start --
    $('#form_tel').hide();
  
    $('#btn_modify2').click(function () {
      $('#notice_tel').hide();
      $('#form_tel').show();
    });
  
    $('#cancle3').click(function () {
      $('#form_tel').hide();
      $('#notice_tel').show();
    });
    // -- 휴대폰번호 end --
  
    // -- 변경 버튼 클릭시 입력폼 출력 end --
  });