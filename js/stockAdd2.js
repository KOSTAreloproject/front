$(() => {
  //--등록하기 버튼 눌렀을 때 할 일 START--

  $("div.registration_btn_box").on("click", function (e) {
    let bankCode = $("select[name=account] option:selected").val();
    if($('.accountNum').val() == ''){
      $('p.input_error').css("display","block")
    }else{
      let url = backUrl + "account/add";
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: url,
        method: "POST",
        data: { bankAccount: $(".accountNum").val() , bankCode : bankCode },
        success: function (jsonStr) {
          location.href = "./StockAdd.html";
        },error: function (xhr){
          console.log(xhr.status)
        }
      })
    }
  });
  //--등록하기 버튼 눌렀을 때 할 일 END--

  //--계좌 조회하기를 눌렀을때 할 일 START--
  $(".aa").click(function () {
    let url = backUrl + "account/read";
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "GET",
      success: function (jsonStr) {
        let bankName = jsonStr.bankCode;
        if(bankName == "004"){
          bankName = "국민은행";
        }else if(bankName == "021"){
          bankName = "신한은행";
        }else if(bankName == "020"){
          bankName = "우리은행";
        }else if(bankName == "005"){
          bankName = "하나은행";
        }else if(bankName == "003"){
          bankName = "기업은행";
        }else if(bankName == "010"){
          bankName = "농협은행";
        }else if(bankName == "023"){
          bankName = "SC은행";
        }else if(bankName == "071"){
          bankName = "우체국은행";
        }else if(bankName == "027"){
          bankName = "한국시티은행";
        }
        
        $('.bankName').html("은행명: "+bankName);
        $('.bankNum').html("계좌번호: "+jsonStr.bankAccount);
        $('.mname').html('');
        $('.close').html('');
      },error: function (xhr){
        $('.next').html('');
      }
    });
  });
  //--계좌 조회하기를 눌렀을때 할 일 END--
});
