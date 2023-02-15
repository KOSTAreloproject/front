$(() => {
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
      /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (!reg_birth.test('' + strBirth)) {
      return false;
    }
    return true;
  }
  // -- 정규식 검사 end --
});
