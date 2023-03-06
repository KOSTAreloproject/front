$(() => {
  //디바운스
  let timer = false; //최초 false
  const filterByDebounce = (e, callback) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      callback('' + e.target.value);
    }, 100); //100ms 이후 반응(디바운스)
  };

  //비밀번호 정규식 검사
  function validatePassword(strPassword) {
    const reg_password = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,16}$/;
    if (!reg_password.test('' + strPassword)) {
      return false;
    }
    return true;
  }

  // -- 아이디&비밀번호 빈 칸 체크 및 비밀번호 유효성 검사 start --

  $('input').on('input', function () {
    let $id = $('#id').val();
    let $pwd = $('#pwd').val();

    if ($id == '' || $pwd == '') {
      $('#login').attr('disabled', true);
      $('#login').css('background-color', '');
      $('#login').css('color', '');
      $('#login').css('cursor', '');
    } else if (validatePassword($pwd)) {
      $('#login').attr('disabled', false);
      $('#login').css('background-color', '#000000');
      $('#login').css('color', '#fff');
      $('#login').css('cursor', 'pointer');
    }
  });

  $('#pwd').on('input', function (e) {
    filterByDebounce(e, (strPassword) => {
      let error_msg = '';
      if (!validatePassword(strPassword)) {
        error_msg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
        $('#login').attr('disabled', true);
        $('#title_pwd').css('color', 'tomato');
        $('#pwd').css('border-bottom', '1px solid tomato');
        $('#error_msg_pwd').css('color', 'tomato');
        $('#login').css('background-color', '');
        $('#login').css('color', '');
        $('#login').css('cursor', '');
      } else {
        $('#title_pwd').css('color', '');
        $('#pwd').css('border-bottom', '');
      }
      $('#error_msg_pwd').html(error_msg);
    });
  });

  // -- 아이디&비밀번호 빈 칸 체크 및 비밀번호 유효성 검사 end --

  // -- 로그인 start --

  $('#login').on('click', function () {
    let url = backUrl + 'member/login';

    let $id = $('#id').val();
    let $pwd = $('#pwd').val();

    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: 'post',
      data: {
        id: $id,
        pwd: $pwd,
      },
      success: function () {
        location.href = document.referrer;
      },
      error: function (xhr) {
        alert('로그인 실패');
      },
    });
  });
  // -- 로그인 end --

  // -- 엔터 누르면 로그인 버튼 클릭됨 start --
  $('.input_val').keyup(function (e) {
    if (e.which === 13) {
      $('#login').click();
    }
  });
  // -- 엔터 누르면 로그인 버튼 클릭됨 end --
});
