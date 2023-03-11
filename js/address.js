$(() => {
  //--내 주소록 목록 불러오기 START--
  function showList() {
    let url = backUrl + "address/list";
    let $origin = $("div.address").first();
    $("div.address").not(":first-child").remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "get",
      success: function (jsonObj) {
        let list = jsonObj;
        let $parent = $("div.addresslist");
        $(list).each((index, a) => {
          let addrNum = a.addrNum;
          let addrName = a.addrName;
          let addrPostNum = a.addrPostNum;
          let addrTel = a.addrTel;
          let addr = a.addr;
          let addrDetail = a.addrDetail;
          let addrRecipient = a.addrRecipient;
          let addrType = a.addrType;
          let $copy = $origin.clone();

          $copy.find("input#modifyDefalt").attr("id", "editBtn_" + addrNum);
          $copy.find("input#deleteDefalt").attr("id", "delBtn_" + addrNum);
          $copy.find("div.addrNum").html(addrNum);
          $copy.find("div.addrRecipient").html(addrRecipient + "  ");
          if (addrType == 0) {
            $copy
              .find("div.addrRecipient")
              .append('<span id="addr_default">기본배송지</span>');
          }
          $copy.find("div.addrTel").html(addrTel);
          $copy
            .find("div.addr")
            .html("(" + addrPostNum + ")" + addr + " " + addrDetail);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--내 주소록 목록 불러오기 END--
  showList();

  $("#popupDiv").hide();
  $("#modal2").hide();

  //--새 주소록 추가 클릭시 폼 보이기 START--
  $("#UpdateOnClick").click(function () {
    $("#popupDiv").show();
    $("#edit_btn").attr("style", "display:none");
    $("#save_btn").attr("style", "");
    $("#edit").attr("style", "display:none");
    $("#save").attr("style", "");
    $("#edit_address_title").attr("style", "display:none");
    $("#new_address_title").attr("style", "");
    resetData();
  });

  //--새 주소록 추가 취소 버튼 클릭시 폼 숨기기 START--
  function resetData() {
    $("#addressname_input").val("");
    $("#zipcode_input").val("");
    $("#hp_input").val("");
    $("#address1_input").val("");
    $("#address2_input").val("");
    $("#name_input").val("");
    document.querySelector("#name_input_error").innerHTML = "";
    document.querySelector("#hp_input_error").innerHTML = "";
    $("#input_title_name").css("display", "");
    $("#input_title_name_error").css("display", "none");
    $("#name_input").css("border-bottom", "");
    $("#input_title_hp").css("display", "");
    $("#input_title_hp_error").css("display", "none");
    $("#hp_input").css("border-bottom", "");
    $("#input_button_check").prop("checked", false);
  }
  //--새 주소록 추가 취소 버튼 클릭시 폼 숨기기 END--
  //--주소 수정 클릭시 폼 데이터 출력 START--
  function setData(addrNum) {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + "/address/select/" + addrNum,
      success: function (jsonObj) {
        $("#num_input").val(jsonObj.addrNum);
        $("#name_input").val(jsonObj.addrRecipient);
        $("#hp_input").val(jsonObj.addrTel);
        $("#zipcode_input").val(jsonObj.addrPostNum);
        $("#addressname_input").val(jsonObj.addrName);
        $("#address1_input").val(jsonObj.addr);
        $("#address2_input").val(jsonObj.addrDetail);
        if (jsonObj.addrType == 0) {
          $("#input_button_check").prop("checked", true);
        } else {
          $("#input_button_check").prop("checked", false);
        }
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--주소 수정 클릭시 폼 데이터 출력 END--
  //--폼에서 저장하기 클릭 START--
  $("#save").click(function () {
    let url = backUrl + "address/add";
    let $addrRecipient = $("#name_input").val();
    let $addrPostNum = $("#zipcode_input").val();
    let $addrTel = $("#hp_input").val();
    let $addr = $("#address1_input").val();
    let $addrDetail = $("#address2_input").val();
    let $addrName = $("#addressname_input").val();
    let addrType = 1;
    if ($("#input_button_check").is(":checked") == true) {
      addrType = 0;
    }
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "post",
      data: JSON.stringify({
        addrName: $addrName,
        addrPostNum: $addrPostNum,
        addrTel: $addrTel,
        addr: $addr,
        addrDetail: $addrDetail,
        addrRecipient: $addrRecipient,
        addrType: addrType,
      }),
      contentType: "application/json",
      success: function () {
        // $('#modal1').hide();
        // $('div.jquery-modal blocker current').hide();
        resetData();
        showList();
        $("#input_button_check").attr("checked", false);
      },
      error: function (jsonObj) {
        alert('잘못 입력하셨습니다!');
      },
    });
  });
  //--폼에서 저장하기 클릭 END--
  //--주소록 수정 버튼 클릭 START--
  $(document).on(
    "click",
    "input[class='btn outlinegrey small edit']",
    function () {
      let addrNum = $(this).attr("id").split("_")[1];
      $(".modalbtn").get(0).click();
      $("#save_btn").attr("style", "display:none");
      $("#edit_btn").attr("style", "");
      $("#save").attr("style", "display:none");
      $("#edit").attr("style", "");
      $("#edit_address_title").attr("style", "");
      $("#new_address_title").attr("style", "display:none");
      document.querySelector("#name_input_error").innerHTML = "";
      document.querySelector("#hp_input_error").innerHTML = "";
      $("#input_title_name").css("display", "");
      $("#input_title_name_error").css("display", "none");
      $("#name_input").css("border-bottom", "");
      $("#input_title_hp").css("display", "");
      $("#input_title_hp_error").css("display", "none");
      $("#hp_input").css("border-bottom", "");
      $("#popupDiv").show();
      $("#input_button_check").attr("checked", false);
      setData(addrNum);
    }
  );
  //--주소록 수정 버튼 클릭 END--
  // //--주소록 삭제 버튼 클릭 START--
  $(document).on(
    "click",
    "input[class='btn outlinegrey small test']",
    function () {
      let addrNum = $(this).attr("id").split("_")[1];
      $("#del_addrnum_input").val(addrNum);
    }
  );
  $("#delete_addr").click(function () {
    let $addrNum = $("#del_addrnum_input").val();
    let url = backUrl + "address/" + $addrNum;
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "delete",
      success: function () {
        showList();
        $("div#ex2.modal").attr("style", "display:none");
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  });
  //--주소록 삭제 버튼 클릭 END--
  //--주소록 수정 폼에서 수정하기 버튼 클릭 START--
  $("#edit").click(function () {
    let url = backUrl + "address/";
    let $addrNum = $("#num_input").val();
    let $addrRecipient = $("#name_input").val();
    let $addrPostNum = $("#zipcode_input").val();
    let $addrTel = $("#hp_input").val();
    let $addr = $("#address1_input").val();
    let $addrDetail = $("#address2_input").val();
    let $addrName = $("#addressname_input").val();
    let addrType = 1;
    if ($("#input_button_check").is(":checked") == true) {
      addrType = 0;
    }
    if ($("#input_button_check").is(":checked") == false) {
    }
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url + $addrNum,
      method: "put",
      data: JSON.stringify({
        addrName: $addrName,
        addrPostNum: $addrPostNum,
        addrTel: $addrTel,
        addr: $addr,
        addrDetail: $addrDetail,
        addrRecipient: $addrRecipient,
        addrType: addrType,
      }),
      contentType: "application/json",
      success: function () {
        // $('div.jquery-modal blocker current').hide();
        // $('div.jquery-modal blocker current').click();
        resetData();
        showList();
      },
      error: function (jsonObj) {
        alert('잘못 입력하셨습니다!');
      },
    });
  });
  //--주소록 수정 폼에서 수정하기 버튼 클릭 END--
  //--유효성 검사시 실패할때 띄우기 START--
  const filterByDebounce = (e, callback) => {
    timer = 200;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback("" + e.target.value);
    }, 200);
  };
  //--유효성 검사시 실패할때 띄우기 END--
  //--이름 유효성 검사 함수 START--
  function vaidateName(strName) {
    const reg_name = /^[가-힣a-zA-Z]{3,19}$/;
    if (!reg_name.test("" + strName)) {
      return false;
    }
    $("#input_title_name").css("display", "");
    $("#input_title_name_error").css("display", "none");
    $("#name_input").css("border-bottom", "");
    return true;
  }
  //--이름 유효성 검사 함수 END--
  //--전화번호 유효성 검사 함수 START--
  function vaidateTel(strTel) {
    const reg_tel =
      // /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
    if (!reg_tel.test("" + strTel)) {
      return false;
    }
    $("#input_title_hp").css("display", "");
    $("#input_title_hp_error").css("display", "none");
    $("#hp_input").css("border-bottom", "");
    return true;
  }
  //--전화번호 유효성 검사 함수 END--
  //--작성 폼에서 실시간 이름 유효성 검사 START--
  document.querySelector("#name_input_box").addEventListener("input", (e) => {
    filterByDebounce(e, (strName) => {
      let errorMsg = "";
      if (!vaidateName(strName)) {
        errorMsg = "올바른 이름을 입력해주세요.  (2 - 50자)";
        $("#input_title_name").css("display", "none");
        $("#input_title_name_error").css("display", "");
        $("#name_input").css("border-bottom", "1px solid red");
      } else {
      }
      document.querySelector("#name_input_error").innerHTML = errorMsg;
    });
  });
  //--작성 폼에서 실시간 이름 유효성 검사 END--
  //--작성 폼에서 실시간 전화번호 유효성 검사 START--
  document.querySelector("#hp_input_box").addEventListener("input", (e) => {
    filterByDebounce(e, (strTel) => {
      let errorMsg = "";
      if (!vaidateTel(strTel)) {
        errorMsg = "정확한 전화번호를 입력해주세요.";
        $("#input_title_hp").css("display", "none");
        $("#input_title_hp_error").css("display", "");
        $("#hp_input").css("border-bottom", "1px solid red");
      } else {
      }
      document.querySelector("#hp_input_error").innerHTML = errorMsg;
    });
  });
  //--작성 폼에서 실시간 전화번호 유효성 검사 END--
  //--주소창 클릭시 카카오 주소 팝업 START--
  document.getElementById("kakaoOpen").addEventListener("click", function () {
    //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
      oncomplete: function (data) {
        //선택시 입력값 세팅
        document.getElementById("address1_input").value = data.address; // 주소 넣기
        document.getElementById("zipcode_input").value = data.zonecode; // 우편번호 넣기
      },
    }).open();
  });

  //--주소창 클릭시 카카오 주소 팝업 END--
});
