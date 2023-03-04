$(() => {
  $('.alert-box').hide();

  $('#popup_background').click(function (e) {
    if (!$('#popup').has(e.target).length) {
      $('#popup').hide();
      $(this).hide();
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

  // ---- 휴대폰 start ----

  //휴대폰번호 정규식 검사
  function validateTell(strTell) {
    const reg_tell = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (!reg_tell.test('' + strTell)) {
      return false;
    }
    return true;
  }

  $(document).on('keyup', '.input_tel', function (e) {
    $(this).val(
      $(this)
        .val()
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, '')
    );
  });

  $('#tel1').on('input', (e) => {
    filterByDebounce(e, (strTell) => {
      let errorMsg = '';

      let strTell_filtered = strTell.replace(/[^0-9]/g, '');

      if (!validateTell(strTell_filtered)) {
        errorMsg = "휴대폰 번호를 정확히 입력해주세요.('-'제외 후 입력)";
        $('#label_tel1').css('color', 'tomato');
        $('#alert_valid_tel1').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
        $('#findid').attr('disabled', true);
        $('#findid').css('cursor', 'default');
        $('#findid').css('background-color', '#ebebeb');
        $('#findid').css('color', '#fff');
      } else {
        $('#label_tel1').css('color', '');
        $('#alert_valid_tel1').css('color', '');
        $(e.target).css('border-bottom', '');
        $('#findid').attr('disabled', false);
        $('#findid').css('cursor', 'pointer');
        $('#findid').css('background-color', '#000000');
        $('#findid').css('color', '#fff');
      }
      $('#alert_valid_tel1').html(errorMsg);
    });
  });

  $('#tel2').on('input', (e) => {
    filterByDebounce(e, (strTell) => {
      let errorMsg = '';

      let strTell_filtered = strTell.replace(/[^0-9]/g, '');

      if (!validateTell(strTell_filtered)) {
        errorMsg = "휴대폰 번호를 정확히 입력해주세요.('-'제외 후 입력)";
        $('#label_tel2').css('color', 'tomato');
        $('#alert_valid_tel2').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#label_tel2').css('color', '');
        $('#alert_valid_tel2').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#alert_valid_tel2').html(errorMsg);
    });
  });
  // ---- 휴대폰 end ----

  // ---- 이메일 start ----

  //이메일 정규식 검사
  function validateEmail(strEmail) {
    const reg_email =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!reg_email.test('' + strEmail)) {
      return false;
    }
    return true;
  }

  // 이메일 유효성 검사
  $('#email').on('input', (e) => {
    filterByDebounce(e, (strEmail) => {
      let errorMsg = '';
      if (!validateEmail(strEmail)) {
        errorMsg = '이메일 주소를 정확히 입력해주세요.';
        $('#findpwd').attr('disabled', true);
        $('#label_email').css('color', 'tomato');
        $('#alert_valid_email').css('color', 'tomato');
        $(e.target).css('border-bottom', '1px solid tomato');
      } else {
        $('#findpwd').attr('disabled', false);
        $('#label_email').css('color', '');
        $('#alert_valid_email').css('color', '');
        $(e.target).css('border-bottom', '');
      }
      $('#alert_valid_email').html(errorMsg);
    });
  });
  // ---- 이메일 end ----

  $('#tel2').on('keyup', check_valid_btn);
  $('#email').on('keyup', check_valid_btn);

  function check_valid_btn() {
    disactiveEvent();
    if ($('#findpwd').attr('disabled') === undefined) {
      activeEvent();
    }
  }

  // -- '비밀번호 찾기' 버튼 비활성화 start --
  function disactiveEvent() {
    if ($('#tel2').val() == '' || $('#email').val() == '') {
      $('#findpwd').attr('disabled', true);
      $('#findpwd').css('cursor', 'default');
      $('#findpwd').css('background-color', '#ebebeb');
      $('#findpwd').css('color', '#fff');
    }

    let strTell_filtered = $('#tel2')
      .val()
      .replace(/[^0-9]/g, '');
    if (!validateTell(strTell_filtered) || !validateEmail($('#email').val())) {
      $('#findpwd').attr('disabled', true);
      $('#findpwd').css('cursor', 'default');
      $('#findpwd').css('background-color', '#ebebeb');
      $('#findpwd').css('color', '#fff');
    }
  }
  // -- '비밀번호 찾기' 버튼 비활성화 end --

  // -- '비밀번호 찾기' 버튼 활성화 start --
  function activeEvent() {
    $('#findpwd').attr('disabled', false);
    $('#findpwd').css('cursor', 'pointer');
    $('#findpwd').css('background-color', '#000000');
    $('#findpwd').css('color', '#fff');
  }
  // -- '비밀번호 찾기' 버튼 비활성화 end --

  $('#findid').click(function () {
    alert($('#tel1').val());
    $.ajax({
      url: backUrl + 'member/findidandpwd',
      method: 'post',
      data: 'tel=' + $('#tel1').val(),
      success: function (result) {
        location.href = './success_find_id.html?id=' + result;
      },
      error: function () {
        alert('일치하는 정보가 없습니다.');
      },
    });
  });
});
