$(() => {
  $("#cal_btn").click(function () {
    window.location.href = "./index.html";
  });

  // checkbox 모두 선택 해제
  let action = true;
  $("#input11").click(function () {
    if (action) {
      $("input[name=check]:checkbox").prop("checked", "checked");
    } else {
      $("input[name=check]:checkbox").prop("checked", false);
    }
    action = !action;
  });

  $("#ok_btn").click(function (event) {
    event.preventDefault();
  });

  // 탈퇴하기 버튼 클릭시 모달창 띄우기
  let pass = "";
  $("#ok_btn").click(function () {
    let object = $("#input03:checked");
    let allobject = $("#input11:checked");
    if (object.length < 3 && allobject) {
      alert("회원탈퇴 내용을 모두 동의해 주셔야 탈퇴가 가능합니다.");
    } else {
      $('input:checkbox[name="check"]').is(":checked") == true;
      pass = window.prompt("비밀번호를 입력하세요.");
      if (pass == null || pass == "") {
        alert("비밀번호 미입력시 탈퇴가 불가합니다.");
        return;
      }
      $(document).ready(function () {
        $("#popup_mask").css("display", "block"); //팝업 뒷배경 display block
        $("#popupDiv").css("display", "block"); //팝업창 display block
        $("body").css("overflow", "hidden"); //body 스크롤바 없애기

        // 엑스 눌렀을때
        $("#popCloseBtn").click(function (event) {
          $("#popup_mask").css("display", "none"); //팝업창 뒷배경 display none
          $("#popupDiv").css("display", "none"); //팝업창 display none
          $("body").css("overflow", "auto"); //body 스크롤바 생성
        });

        // 탈퇴 안 할래요 눌렀을때
        $("#no_btn").click(function (event) {
          $("#popup_mask").css("display", "none"); //팝업창 뒷배경 display none
          $("#popupDiv").css("display", "none"); //팝업창 display none
          $("body").css("overflow", "auto"); //body 스크롤바 생성
        });
      });
    }
  });

  // 레이아웃 탈퇴버튼 클릭
  $(".link_withdrawal").on("click", () => {
    if ($("#undefined").is(":checked")) {
      withdreawal();
    } else {
      alert(
        "탈퇴를 정말로 원하십니까? \n정말로 원하신다면 체크박스를 눌러주십시오."
      );
    }
  });

  // 탈퇴하기
  function withdreawal() {
    let url = backURL + "member/out.do";
    $.ajax({
      url: url,
      method: "post",
      data: {
        pwd: pass,
      },
      success: function (jsonObj) {
        console.log(jsonObj);
        let status = jsonObj.status;
        if (status == 1) {
          alert(jsonObj.message);
          location.href = frontUrl + "index.html";
        } else {
          alert(jsonObj.message);
          location.reload();
        }
      },
      error: function (xhr) {
        $("div#modal>p").html("오류" + xhr.status);
      },
    });
  }
});
