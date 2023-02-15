$(() => {
  // 멤버 디테일 정보 뿌리기
  function profiledetail() {
    let url = backUrl + "member/detail.do";
    $.ajax({
      url: url,
      method: "get",
      success: function (jsonObj) {
        console.log(jsonObj);
        $("#show_userid_title").html(jsonObj.id);
        $("#show_userid").html(jsonObj.mname);

        $("div.unit>p.desc.email").html(jsonObj.email);

        $("div.unit>p.desc.password").html(jsonObj.pwd);
        $("#show_hp").html(jsonObj.tel);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }

  profiledetail();

  // 변경 사항 ajax로 요청
  function update() {
    let url = backUrl + "member/edit.do";
    let $email = $("#email_input").val();
    let $pwd = $("#password_input2").val();
    let $mName = $("#name_input").val();
    let $tel = $("#hp_input").val();
    if ($pwd == "") {
      $pwd = $(".desc.password").text();
    }
    if ($email == "") {
      $email = $(".desc.email").text();
    }
    if ($mName == "") {
      $mName = $("#show_userid").text();
    }
    if ($tel == "") {
      $tel = $("#show_hp").text();
    }

    $.ajax({
      url: url,
      method: "post",
      dataType: "text",
      data: {
        pwd: $pwd,
        email: $email,
        mName: $mName,
        tel: $tel,
      },
      success: function (jsonObj) {
        alert(jsonObj);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    }).then(profiledetail());
  }

  // Enter 방지
  // $('input[type="text"]').on('keypress', function (event) {
  //   if (event.keyCode === 13) {
  //     event.preventDefault();
  //   }
  // });

  // 이메일 변경
  $("#sendEmailBtn").click(function () {
    update();
  });
  // 비밀번호 변경
  $("#sendPasswordBtn").click(function () {
    update();
  });
  // 이름 변경
  $("#sendNameBtn").click(function () {
    update();
  });
  // 휴대폰 번호 변경
  $("#sendHpBtn").click(function () {
    update();
  });

  // 사진 변경 버튼 클릭 이벤트
  // $('#upImage').on('click', function (e) {
  //   e.preventDefault();
  //   $('#imageFileInput').click();
  // });

  // let image = null;
  // const fileData = new FormData();
  // const imageFileInput = document.querySelector('#imageFileInput');
  // imageFileInput.addEventListener('change', (e) => {
  //   // 파일경로 + 파일명
  //   image = '/lib/img/' + imageFileInput.value.replace(/C:\\fakepath\\/i, '');
  //   update();

  //   // 서버로 처리
  //   for (let i = 0; i < imageFileInput.files.length; i++) {
  //     fileData.append('uploadfile'.imageFileInput.files[i]);
  //   }
  //   console.log(fileData);

  //   var xhr = new XMLHttpRequest();
  //   //xhr.open('post', '/api/test_upload/', true);
  //   xhr.setRequestHeader('Content-Type', 'multipart/formed-data');
  //   xhr.onreadystatechange = function () {
  //     // Call a function when the state changes.
  //     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
  //       alert('서버로 데이터 전송 완료');
  //     } else {
  //       alert('Error');
  //     }
  //   };
  //   xhr.send(fileData);
  // });

  // // 사진 삭제 버튼 클릭 이벤트
  // document.querySelector('#delImage').addEventListener('click', () => {
  //   image = '';
  //   update();
  // });

  //디바운스
  let timer = false; //최초 false
  const filterByDebounce = (e, callback) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      callback("" + e.target.value);
    }, 200); //200ms 이후 반응(디바운스)
  };

  //이메일 유효성검사
  function validateEmail(strEmail) {
    const reg_email =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!reg_email.test("" + strEmail)) {
      return false;
    }
    return true;
  }

  //비밀번호 유효성 검사
  function validatePassword(strPassword) {
    const reg_password =
      /^.*(?=^.{8,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if (!reg_password.test("" + strPassword)) {
      return false;
    }
    return true;
  }

  //휴대폰번호 유효성 검사
  function validateTell(strTell) {
    const reg_tell = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (!reg_tell.test("" + strTell)) {
      return false;
    }
    return true;
  }

  // 이름 유효성검사
  function validateName(strName) {
    const reg_name = /^[가-힣a-zA-Z]+$/;
    if (!reg_name.test("" + strName)) {
      return false;
    }
    return true;
  }

  // 이메일 변경 버튼 클릭시 modify 출력
  $("#openEmailBtn").click(function (event) {
    $("#modify_email").show();
    $("#unit_email").hide();
  });

  // 취소하기
  $("#closeEmailBtn").click(function (event) {
    $("#unit_email").show();
    $("#email_input").val("");
    $("#modify_email").hide();
  });

  // 메일 변경 버튼
  $("#sendEmailBtn").click(function (event) {
    email = $("#email_input").val();
    update();
    $("#unit_email").show();
    $("#email_input").val("");
    $("#modify_email").hide();
  });

  // 이메일 유효성 검사
  document.querySelector("#email_input").addEventListener("input", (e) => {
    filterByDebounce(e, (strEmail) => {
      let errorMsg = "";
      if (!validateEmail(strEmail)) {
        errorMsg = "이메일 주소를 정확히 입력해주세요.";
        document.querySelector("#email_input_box").className =
          "input_box has_error";
        document.querySelector("#sendEmailBtn").className =
          "btn solid medium disabled";
        document.querySelector("#sendEmailBtn").disabled = true;
      } else {
        document.querySelector("#email_input_box").className = "input_box fill";
        document.querySelector("#sendEmailBtn").className = "btn solid medium";
        document.querySelector("#sendEmailBtn").disabled = false;
      }
      document.querySelector("#email_input_error").innerHTML = errorMsg;
    });
  });

  // 비밀번호 변경 버튼 클릭시 modify 출력
  $("#openPasswordBtn").click(function (event) {
    $("#modify_password").show();
    $("#unit_password").hide();
  });

  // 취소하기
  $("#closePasswordBtn").click(function (event) {
    $("#unit_password").show();
    $("#password_input1").val("");
    $("#password_input2").val("");
    $("#modify_password").hide();
  });

  // 이전 비밀번호 확인
  // let isCorrect = false; // 비밀번호 일치여부 확인 위함
  // userpw = $('#password_input2').val();

  // document.getElementById('password_input2').addEventListener('input', () => {
  //   let prePwd = $('.desc.password').text(); // 기존의 비밀번호
  //   let checkPwd = $('#password_input1').val(); // 이전 비밀번호 확인
  //   if (prePwd == checkPwd) {
  //     document.querySelector('#sendPasswordBtn').disabled = false;
  //     isCorrect = true;
  //   } else {
  //     isCorrect = false;
  //     $('#password_input1').html('');
  //     $('#password_input_error1').html('이전 비밀번호와 일치하지 않습니다.');
  //     document.querySelector('#sendPasswordBtn').disabled = true;
  //   }
  // });

  // 저장하기
  document.getElementById("sendPasswordBtn").addEventListener("click", () => {
    // if (isCorrect) {
    newuserpw = document.getElementById("password_input2").value;
    update();
    $("#unit_password").show();
    $("#password_input1").val("");
    $("#password_input2").val("");
    $("#modify_password").hide();
    // } else {
    // alert('비밀번호 변경이 취소되었습니다.');
    //alert('이전 비밀번호 확인버튼을 눌러주세요.');
    // }
  });

  // 이전 비밀번호 유효성 검사
  // document.querySelector('#password_input1').addEventListener('input', (e) => {
  //   filterByDebounce(e, (strPassword) => {
  //     let errorMsg = '';
  //     if (!validatePassword(strPassword)) {
  //       errorMsg = '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)';
  //       // document.querySelector('#password_input_box1').className =
  //       //   'input_box has_error';
  //       // document.querySelector('#sendPasswordBtn').className =
  //       //   'btn solid medium disabled';
  //       // document.querySelector('#sendPasswordBtn').disabled = true;
  //       // document.querySelector('#confirmPasswordBtn').className =
  //       //   'btn solid small disabled';
  //       // document.querySelector('#confirmPasswordBtn').disabled = true;
  //       document.querySelector('#sendPasswordBtn').disabled = true;
  //     } else {
  //       document.querySelector('#sendPasswordBtn').disabled = false;
  //       // document.querySelector('#password_input_box1').className =
  //       //   'input_box fill';
  //       // document.querySelector('#confirmPasswordBtn').className =
  //       // ('btn solid small');
  //       // document.querySelector('#confirmPasswordBtn').disabled = false;
  //       // if(document.querySelector('#password_input_box2').classList.contains('fill')){
  //       //     document.querySelector('#sendPasswordBtn').className='btn solid medium';
  //       //     document.querySelector('#sendPasswordBtn').disabled=false;
  //       // } else {
  //       //     document.querySelector('#sendPasswordBtn').className='btn solid medium disabled';
  //       //     document.querySelector('#sendPasswordBtn').disabled=true;
  //       // }
  //     }
  //     document.querySelector('#password_input_error1').innerHTML = errorMsg;
  //   });
  // });

  let isCorrect = false;
  // 변경 비밀번호 유효성 검사
  document.querySelector("#password_input2").addEventListener("input", (e) => {
    filterByDebounce(e, (strPassword) => {
      let errorMsg = "";
      if (!validatePassword(strPassword)) {
        errorMsg = "영문, 숫자, 특수문자를 조합해서 입력해주세요. (8-16자)";
        document.querySelector("#password_input_box2").className =
          "input_box has_error";
        document.querySelector("#sendPasswordBtn").className =
          "btn solid medium disabled";
        document.querySelector("#sendPasswordBtn").disabled = true;
      } else {
        isCorrect = true;
        document.querySelector("#password_input_box2").className =
          "has_button input_box fill";
        document.querySelector("#sendPasswordBtn").disabled = false;
        // if (
        //   document
        //     .querySelector('#confirmPasswordBtn')
        //     .classList.contains('confirmed')
        // ) {
        //   document.querySelector('#sendPasswordBtn').className =
        //     'btn solid medium';
        //   document.querySelector('#sendPasswordBtn').disabled = false;
        // } else {
        //   document.querySelector('#sendPasswordBtn').className =
        //     'btn solid medium disabled';
        //   document.querySelector('#sendPasswordBtn').disabled = true;
        // }
      }
      document.querySelector("#password_input_error2").innerHTML = errorMsg;
    });
  });

  // 이름 modify 출력
  $("#openNamedBtn").click(function (event) {
    $("#modify_name").css("display", "block");
    $("#unit_name").hide();
  });

  // 취소하기
  $("#closeNameBtn").click(function (event) {
    $("#unit_name").show();
    $("#name_input").val("");
    $("#modify_name").hide();
  });

  // 저장하기
  document.getElementById("sendNameBtn").addEventListener("click", () => {
    userid = $("#name_input").val();
    update();
    $("#unit_name").show();
    $("#name_input").val("");
    $("#modify_name").hide();
  });

  // 이름 유효성 검사
  document.querySelector("#name_input").addEventListener("input", (e) => {
    filterByDebounce(e, (strName) => {
      let errorMsg = "";
      if (!validateName(strName)) {
        errorMsg = "올바른 이름을 입력해주세요. (2 - 50자)";
        document.querySelector("#name_input_box").className =
          "input_box has_error";
        document.querySelector("#sendNameBtn").className =
          "btn solid medium disabled";
        document.querySelector("#sendNameBtn").disabled = true;
      } else {
        document.querySelector("#name_input_box").className = "input_box fill";
        document.querySelector("#sendNameBtn").className = "btn solid medium";
        document.querySelector("#sendNameBtn").disabled = false;
      }
      document.querySelector("#name_input_error").innerHTML = errorMsg;
    });
  });

  // 휴대폰 번호 modify 출력
  $("#openHpBtn").click(function (event) {
    $("#modify_hp").css("display", "block");
    $("#unit_hp").hide();
  });

  // 취소하기
  $("#closeHpBtn").click(function (event) {
    $("#unit_hp").show();
    $("#hp_input").val("");
    $("#modify_hp").hide();
  });

  // 저장하기
  document.querySelector("#sendHpBtn").addEventListener("click", () => {
    hp = $("#hp_input").val();
    update();
    $("#unit_hp").show();
    $("#hp_input").val("");
    $("#modify_hp").hide();
  });

  // 전화번호 유효성 검사
  document.querySelector("#hp_input").addEventListener("input", (e) => {
    filterByDebounce(e, (strTell) => {
      let errorMsg = "";
      if (!validateTell(strTell)) {
        errorMsg = "휴대폰 번호를 정확히 입력해주세요.('-'제외 후 입력)";
        document.querySelector("#hp_input_box").className =
          "input_box has_error";
        document.querySelector("#sendHpBtn").className =
          "btn solid medium disabled";
        document.querySelector("#sendHpBtn").disabled = true;
      } else {
        document.querySelector("#hp_input_box").className = "input_box fill";
        document.querySelector("#sendHpBtn").className = "btn solid medium";
        document.querySelector("#sendHpBtn").disabled = false;
      }
      document.querySelector("#hp_input_error").innerHTML = errorMsg;
    });
  });
});
