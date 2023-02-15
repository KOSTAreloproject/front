$(() => {
  // -- 비밀번호 입력창 폼 start --
  $('#alert_check_password').hide();

  $('#input05').change(function () {
    if ($('#input05').is(':checked') == false) {
      $('#alert_check_password').hide();
    }
  });

  function hide_panel() {
    $('.alert-box').fadeOut('linear');
  }

  $('#getout').click(function (e) {
    if ($('#input05').is(':checked') == true) {
      $('#alert_check_password').show();
    } else {
      e.preventDefault();
      $('.alert-box').css('z-index', 1000);
      $('.alert-box').css('top', '0%');
      $('.alert-box').css('left', '34%');
      $('.alert-box').show();
      setTimeout(hide_panel, 2000);
    }
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

  //비밀번호 정규식 검사
  function validatePassword(strPassword) {
    const reg_password =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!reg_password.test('' + strPassword)) {
      return false;
    }
    return true;
  }
  // 비밀번호 유효성 검사
  $('#input06').on('input', function (e) {
    filterByDebounce(e, (strPassword) => {
      let error_msg = '';
      if (!validatePassword(strPassword)) {
        error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
        $('#input_pwd').css('color', 'tomato');
        $('#pwd_input_error').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#input_pwd').css('color', '');
        $('#pwd_input_error').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#pwd_input_error').html(error_msg);
    });
  });
  // -- 비밀번호 입력창 폼 end --

  // -- 비밀번호 입력 취소 start --
  $('#cancle_input_pwd').click(function () {});

  $('#no_out').click(function () {
    $('body').css({ overflow: '', height: '' });
    hide_form();
    $('#input05').prop('checked', false);
  });
  // -- 비밀번호 입력 취소 end --

  function hide_form() {
    $('#popup').hide();
    $('#popup_background').hide();
  }

  hide_form();

  $('.alert-box').hide();

  $('#ok_btn').click(function (e) {
    let check1 = $('#input01').is(':checked');
    let check2 = $('#input02').is(':checked');
    let check3 = $('#input03').is(':checked');
    let check4 = $('#input04').is(':checked');

    if (check1 && check2 && check3 && check4) {
      e.preventDefault();
      $('body').css({ overflow: 'hidden', height: '100%' });
      $('#popup').show();
      $('#popup_background').show();
    } else {
      e.preventDefault();
      $('.alert-box').show();
      setTimeout(hide_panel, 2000);
    }
  });

  $('#input04').click(function () {
    let check = $('#input04').is(':checked');
    if (check) {
      $('#input01').prop('checked', true);
      $('#input02').prop('checked', true);
      $('#input03').prop('checked', true);
    } else {
      $('#input01').prop('checked', false);
      $('#input02').prop('checked', false);
      $('#input03').prop('checked', false);
    }
  });

  // -- 'RELO 회원을 탈퇴하겠습니다.' 문구 클릭시 start --
  $('#declare').click(function () {
    let check = $('#input05').is(':checked');
    if (!check) {
      $('#input05').prop('checked', true);
    } else {
      $('#input05').prop('checked', false);
    }
  });
  // -- 'RELO 회원을 탈퇴하겠습니다.' 문구 클릭시 end --

  // -- 비밀번호 입력값 빈 칸인 상태에서 확인 버튼 클릭시 start --
  $('#ok_input_pwd').click(function () {
    if ($('#input06').val() == '') {
      $('#alert_txt').html('비밀번호를 입력해주세요.');
      $('.alert-box').css('z-index', 1000);
      $('.alert-box').css('top', '0%');
      $('.alert-box').css('left', '34%');
      $('.alert-box').show();
      setTimeout(hide_panel, 2000);
      $('#ok_input_pwd').attr('disabled', true);
    }
  });
  // -- 비밀번호 입력값 빈 칸인 상태에서 확인 버튼 클릭시 end --

  // -- 비밀번호 입력 취소시 start --
  $('#cancle_input_pwd').click(function () {
    location.href = './getout.html';
  });
  // -- 비밀번호 입력 취소시 end --

  // -- checkbox 옆 문구 click시 checkbox click start --
  $('#notice1').click(function () {
    $('#input01').click();
  });
  $('#notice2').click(function () {
    $('#input02').click();
  });
  $('#notice3').click(function () {
    $('#input03').click();
  });
  $('#onemore_check').click(function () {
    $('#input04').click();
  });
  // -- checkbox 옆 문구 click시 checkbox click start --
});
