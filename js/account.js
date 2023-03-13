$(() => {
  let url = backUrl + "account/read";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "GET",
    success: function (jsonStr) {
      let bankName = jsonStr.bankCode;
      if (bankName == "004") {
        bankName = "국민은행";
      } else if (bankName == "021") {
        bankName = "신한은행";
      } else if (bankName == "020") {
        bankName = "우리은행";
      } else if (bankName == "005") {
        bankName = "하나은행";
      } else if (bankName == "003") {
        bankName = "기업은행";
      } else if (bankName == "010") {
        bankName = "농협은행";
      } else if (bankName == "023") {
        bankName = "SC은행";
      } else if (bankName == "071") {
        bankName = "우체국은행";
      } else if (bankName == "027") {
        bankName = "한국시티은행";
      }

      $(".bankName").html(bankName);
      $(".bankNum").html(jsonStr.bankAccount);
    },
    error: function (xhr) {
      console.log(xhr.status);
      $(".content_registration").hide()
      $(".content_area>.update").hide()
      $(".content_registration2").show()
      $("div.registration_btn_box>.update").html("계좌 등록")
      $("div.registration_btn_box").on("click", function (e) {
        if ($(".accountNum").val() == "") {
          $("p.input_error").css("display", "block");
        } else {
          $("div#popup_background").show();
          $("p#ask").html("계좌를 등록하시겠습니까?");
        }
      });
    },
  });

  $("div.content_registration2").hide();

  $(" div.content_area > input").click(function (e) {
    let registration2 = $("div.content_registration2");
    if (registration2.is(":visible")) {
      registration2.hide();
    } else {
      registration2.show();
    }
  });

  $("div#popup_background").hide();
  let bankCode = $("select[name=account] option:selected").val();
  $("select[name=account]").change(function () {
    // console.log($(this).val()); //value값 가져오기
    bankCode = $("select[name=account] option:selected").val(); //text값 가져오기
  });

  $("div.registration_btn_box").on("click", function (e) {
    if ($(".accountNum").val() == "") {
      $("p.input_error").css("display", "block");
    } else {
      $("div#popup_background").show();
      $("p#ask").html("계좌를 수정하시겠습니까?");
    }
  });

  $("#ok_btn").on("click", function (e) {
    let url = backUrl + "account/add";
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "POST",
      data: { bankAccount: $(".accountNum").val(), bankCode: bankCode },
      success: function (jsonStr) {
        location.href = "./account.html";
      },
      error: function (xhr) {
        console.log(xhr.status);
      },
    });
  });

  $("#cancle_btn").on("click", function (e) {
    $("div#popup_background").hide();
  });
});
