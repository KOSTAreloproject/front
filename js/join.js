$(() => {
  $('input[name=ok]').removeAttr('name');

  $('#input_id').on('keyup', function (e) {
    let $id = $('#input_id').val();

    if (e.which === 32) {
      let trimed_val = $('#input_id').val().replace(/\s/gi, '');
      $('#input_id').val(trimed_val);
      $('#input_id').attr('name', '');
      $('#label_id').css('color', 'tomato');
      $('#id_input_error').css('color', 'tomato');
      $(e.target).css('border-bottom', '1px solid tomato');
      $('#id_input_error').html('빈 칸은 입력할 수 없습니다.');
      return;
    }

    if ($id == null) {
      $('#input_id').attr('name', '');
      $('#label_id').css('color', 'tomato');
      $('#id_input_error').css('color', 'tomato');
      $(e.target).css('border-bottom', '1px solid tomato');
      $('#id_input_error').html('아이디를 입력해주세요.');
      return;
    }

    filterByDebounce(e, (strId) => {
      $.ajax({
        url: backUrl + 'member/idcheck',
        xhrFields: {
          withCredentials: true,
        },
        data: { id: $id },
        success: function (jsonObj) {
          if (jsonObj == 'no') {
            $('#input_id').attr('name', '');
            $('#id_input_error').html('중복된 아이디로, 사용할 수 없습니다.');
            $('#label_id').css('color', 'tomato');
            $('#id_input_error').css('color', 'tomato');
            $(e.target).css('border-bottom', '1px solid tomato');
          } else {
            $('#input_id').attr('name', 'ok');
            $('#id_input_error').html('사용 가능한 아이디입니다.');
            $('#label_id').css('color', '');
            $('#id_input_error').css('color', 'green');
            $(e.target).css('border-bottom', '');
          }
        },
      });
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
    }, 200); //200ms 이후 반응(디바운스)
  };

  // -- 정규식 검사 start --

  //비밀번호 정규식 검사
  function validatePassword(strPassword) {
    const reg_password =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!reg_password.test('' + strPassword)) {
      return false;
    }
    return true;
  }

  //이메일 정규식 검사
  function validateEmail(strEmail) {
    const reg_email =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!reg_email.test('' + strEmail)) {
      return false;
    }
    return true;
  }

  // 이름 정규식 검사
  function validateName(strName) {
    const reg_name = /^[가-힣]{2,6}$/;
    if (!reg_name.test('' + strName)) {
      return false;
    }
    return true;
  }

  //휴대폰번호 정규식 검사
  function validateTell(strTell) {
    const reg_tell = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (!reg_tell.test('' + strTell)) {
      return false;
    }
    return true;
  }

  // 생일 정규식 검사
  function validateBirth(strBirth) {
    const reg_birth =
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!reg_birth.test('' + strBirth)) {
      return false;
    }
    return true;
  }
  // -- 정규식 검사 end --

  // -- 유효성 검사 start --

  // 전화번호 유효성 검사

  $(document).on('keyup', '#input_tel', function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '')
    );
  });

  $('#input_tel').on('input', (e) => {
    filterByDebounce(e, (strTell) => {
      let errorMsg = '';

      let strTell_filtered = strTell.replace(/[^0-9]/g, '');
      if (!validateTell(strTell_filtered)) {
        errorMsg = "휴대폰 번호를 정확히 입력해주세요.('-'제외 후 입력)";
        $('#input_tel').attr('name', '');
        $('#label_tel').css('color', 'tomato');
        $('#tel_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_tel').attr('name', 'ok');
        $('#label_tel').css('color', '');
        $('#tel_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#tel_input_error').html(errorMsg);
    });
  });

  // 이름 유효성 검사
  $('#input_name').on('input', (e) => {
    filterByDebounce(e, (strName) => {
      let errorMsg = '';
      if (!validateName(strName)) {
        errorMsg = '올바른 이름을 입력해주세요. (2 - 6자)';
        $('#input_name').attr('name', '');
        $('#label_name').css('color', 'tomato');
        $('#name_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_name').attr('name', 'ok');
        $('#label_name').css('color', '');
        $('#name_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#name_input_error').html(errorMsg);
    });
  });

  // 이메일 유효성 검사
  $('#input_email').on('input', (e) => {
    filterByDebounce(e, (strEmail) => {
      let errorMsg = '';
      if (!validateEmail(strEmail)) {
        errorMsg = '이메일 주소를 정확히 입력해주세요.';
        $('#input_email').attr('name', '');
        $('#label_email').css('color', 'tomato');
        $('#email_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_email').attr('name', 'ok');
        $('#label_email').css('color', '');
        $('#email_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#email_input_error').html(errorMsg);
    });
  });

  // 비밀번호 유효성 검사
  $('#input_pwd').on('input', function (e) {
    filterByDebounce(e, (strPassword) => {
      let error_msg = '';
      if (!validatePassword(strPassword)) {
        error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
        $('#input_pwd').attr('name', '');
        $('#label_pwd').css('color', 'tomato');
        $('#pwd_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_pwd').attr('name', 'ok');
        $('#label_pwd').css('color', '');
        $('#pwd_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#pwd_input_error').html(error_msg);
    });
  });

  // 생일 유효성 검사

  $(document).on('keyup', '#input_birth', function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')
    );
  });

  $('#input_birth').on('input', (e) => {
    filterByDebounce(e, (strBirth) => {
      let errorMsg = '';

      let strBirth_filtered = strBirth.replace(/[^0-9]/g, '');
      if (!validateBirth(strBirth_filtered)) {
        errorMsg = '생일을 정확히 입력해주세요.';
        $('#input_birth').attr('name', '');
        $('#label_birth').css('color', 'tomato');
        $('#birth_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_birth').attr('name', 'ok');
        $('#label_birth').css('color', '');
        $('#birth_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#birth_input_error').html(errorMsg);
    });
  });

  // -- 유효성 검사 end --

  $('.checkbox_sub').hide();

  // -- +, - 이모티콘 변경 start --
  $('#plus_btn_1').click(function () {
    $('#term_sub1').toggle();
  });

  $('#minus_btn_2').hide();
  $('#plus_btn_2').click(function () {
    $('#plus_btn_2').hide();
    $('#minus_btn_2').show();
    $('#term_sub2').show();
  });
  $('#minus_btn_2').click(function () {
    $('#minus_btn_2').hide();
    $('#plus_btn_2').show();
    $('#term_sub2').hide();
  });

  $('#minus_btn_1').hide();
  $('#plus_btn_1').click(function () {
    $('#plus_btn_1').hide();
    $('#minus_btn_1').show();
    $('#term_sub1').show();
  });
  $('#minus_btn_1').click(function () {
    $('#minus_btn_1').hide();
    $('#plus_btn_1').show();
    $('#term_sub1').hide();
  });
  // -- +, - 이모티콘 변경 end --

  // -- 체크 박스 전체 선택 & 전체 해제 start --
  $('#cbx_chkAll').click(function () {
    if ($('#cbx_chkAll').is(':checked')) {
      $('input[name=chk]').prop('checked', true);
    } else $('input[name=chk]').prop('checked', false);
  });

  // $('input[name=chk]').click(function () {
  //   var total = $('input[name=chk]').length;
  //   var checked = $('input[name=chk]:checked').length;

  //   if (total != checked) {
  //     $('#cbx_chkAll').prop('checked', false);
  //   } else $('#cbx_chkAll').prop('checked', true);
  // });

  $('#agree_big2').click(function () {
    if ($('#agree_big2').is(':checked'))
      $('input[name=chk1]').prop('checked', true);
    else $('input[name=chk1]').prop('checked', false);
  });

  $('input[name=chk1]').click(function () {
    var total = $('input[name=chk1]').length;
    var checked = $('input[name=chk1]:checked').length;

    if (total != checked) {
      $('#agree_big2').prop('checked', false);
    } else $('#agree_big2').prop('checked', true);
  });

  // -- 체크 박스 전체 선택 & 전체 해제 end --

  // span 태그 사이 글 클릭시 체크박스 클릭 start --
  $('#term1').click(function () {
    $('#cbx_chkAll').click();
    if ($('#cbx_chkAll').prop('checked') == true) {
      $('#cbx_chkAll').prop('checked', true);
    } else {
      $('#cbx_chkAll').prop('checked', false);
    }
  });

  $('#agree_use').click(function () {
    $('#agree_use_check').click();
  });

  $('#agree_user_info').click(function () {
    $('#agree_user_info_check').click();
  });

  $('#term2').click(function () {
    $('#agree_big2').click();
  });

  $('#email').click(function () {
    $('#email_check').click();
  });

  $('#msg').click(function () {
    $('#msg_check').click();
  });
  // span 태그 사이 글 클릭시 체크박스 클릭 end --

  // -- 휴대폰 인증번호 보내기 start --
  $('#tel_auth').click(function () {
    let $req_val = {
      tel: $('#input_tel')
        .val()
        .replace(/[^0-9]/g, ''),
    };
    $.ajax({
      url: backUrl + 'member/phoneAuth',
      xhrFields: {
        withCredentials: true,
      },
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify($req_val),
      success: function () {
        alert('인증번호가 발송되었습니다.');
        $('.join_term').css('margin-top', '50px');
        $('#verify').show();
      },
    });
    return false;
  });
  // -- 휴대폰 인증번호 보내기 end --

  // -- 휴대폰 인증번호 일치한지 확인하기 start --
  let varify_result = null;
  $('#confirm').click(function () {
    let $req_val = { code: $('#input_tel_auth').val() };
    $.ajax({
      url: backUrl + 'member/phoneAuthOk',
      xhrFields: {
        withCredentials: true,
      },
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify($req_val),
      success: function (result) {
        varify_result = result;
        console.log(varify_result);
        $('.join_term').css('margin-top', '');
        $('#verify').hide();
        alert('본인인증 성공');
      },
      error: function () {
        alert('본인인증 실패');
      },
    });
    return false;
  });
  // -- 휴대폰 인증번호 일치한지 확인하기 end --

  // -- 가입하기 버튼 활성화 start --
  $('input').on('blur', function () {
    console.log($('#cbx_chkAll').prop('checked'));
    if ($('#cbx_chkAll').prop('checked') == true && varify_result == true) {
      $('#join_btn').attr('disabled', false);
      $('#join_btn').css('background-color', '#000000');
      $('#join_btn').css('cursor', 'pointer');
    } else {
      $('#join_btn').attr('disabled', true);
      $('#join_btn').css('background-color', '#ebebeb');
      $('#join_btn').css('cursor', 'default');
    }
  });
  // -- 가입하기 버튼 활성화 end --

  // -- 가입 요청 start --
  $('#join_btn').click(function () {
    if (!$('#cbx_chkAll').is(':checked')) {
      return;
    }
    let $req_val = {
      id: $('#input_id').val(),
      pwd: $('#input_pwd').val(),
      email: $('#input_email').val(),
      name: $('#input_name').val(),
      birth: $('#input_birth').val(),
      tel: $('#input_tel').val(),
      check: $('#cbx_chkAll').is(':checked'),
    };
    $.ajax({
      url: backUrl + 'member/join',
      xhrFields: {
        withCredentials: true,
      },
      method: 'post',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify($req_val),
      success: function () {
        alert('가입되었습니다.');
        location.href = document.referrer;
      },
      error: function () {
        alert('조건 불충분으로 가입 불가');
      },
    });
  });
  // -- 가입 요청 end --
});
