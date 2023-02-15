$(() => {
  //--StockAdd2폼 서브밋 되었을 때 할 일 START--
  let $form = $("section>div.StockAdd2>form");

  $form.submit((e) => {
    let url = backUrl + "/account/add.do";
    let params = {
      bankCode: $("#bankCode").val(),
      bankAccount: $("#bankAccount").val(),
    };
    console.log(params);
    $.ajax({
      url: url,
      method: "post",
      data: params,
      success: function () {
        location.href = frontUrl + "StockAdd3.html";
      },
      error: function (xhr) {
        alert("계좌번호를 입력하세요");
      },
    });
    return false;
  });
  //--StockAdd2폼 서브밋 되었을 때 할 일 END--

  //--계좌 조회하기를 눌렀을때 할 일 START--
  $(".a").click(function () {
    let url = backUrl + "/account/info.do";
    $.ajax({
      url: url,
      method: "post",
      success: function (jsonStr) {
        if (jsonStr) {
          let mname = jsonStr.m.mname;
          let bankAccount = jsonStr.bankAccount;
          let bankCode = jsonStr.bankCode;
          $("#ex1>.mname").html("이름: " + mname);
          $("#ex1>.bankAccount").html("계좌번호: " + bankAccount);
          $("#ex1>.bankCode").html("은행이름: " + bankCode);
        }
      },
      error: function (xhr) {},
    });
  });
  //--계좌 조회하기를 눌렀을때 할 일 END--
});
