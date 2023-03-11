$(() => {
  $('#alert_check_password').hide();
  $('input[name*=ok]').removeAttr('name');

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
      $('.alert-box').show();
      setTimeout(hide_panel, 2000);
    }
  });

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

  // -- 탈퇴 안 할래요 클릭시 start --
  $('#no_out').click(function () {
    $('#popup_background').hide();
    $('#popup').hide();
    $('body').css({ overflow: '', height: '' });
  });
  // -- 탈퇴 안 할래요 클릭시 end --

  // -- 탈퇴하기 요청 start --
  $('#getout').click(function () {
    let checkCnt = $('input[type=checkbox]:checked').length;
    if (checkCnt < 5) {
      return;
    }
    $.ajax({
      url: backUrl + 'member/out/' + checkCnt,
      xhrFields: {
        withCredentials: true,
      },
      method: 'put',
      success: function () {
        alert('탈퇴되었습니다.');
        location.href = './index.html';
      },
      error: function () {
        alert('탈퇴 불가');
        location.href = './getout.html';
      },
    });
  });
  // -- 탈퇴하기 요청 end --

  // 체크박스 전체 선택
  $('.checkbox_group').on('click', '#input04', function () {
    $(this)
      .parents('.checkbox_group')
      .find('input')
      .prop('checked', $(this).is(':checked'));
  });

  // 체크박스 개별 선택
  $('.checkbox_group').on('click', '.normal', function () {
    var is_checked = true;

    $('.checkbox_group .normal').each(function () {
      is_checked = is_checked && $(this).is(':checked');
    });

    $('#input04').prop('checked', is_checked);
  });

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
