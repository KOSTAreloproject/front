$(()=>{
    let url = backUrl + "product/detailById";
    let pNum = location.search.substring(1).split("=")[1];
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "GET",
      data: { pNum: pNum },
      success: function (jsonStr) {
        console.log(jsonStr)
        let sBrand = jsonStr[0].sbrand;
        let sName = jsonStr[0].sname;
        let sizeCategoryName = jsonStr[0].sizeCategoryName;
        let sGrade = jsonStr[0].sgrade;
        let sHopePrice = jsonStr[0].shopePrice;
        let sHopeDays = jsonStr[0].shopeDays;
        let sNum = jsonStr[0].snum;
        let pEndDate = jsonStr[0].pEndDate;

        $(".pEndDate").html("종료일: "+pEndDate);
        $(".sBrand").html(sBrand);
        $(".sName").html(sName);
        $(".sizeCategoryName").html("사이즈: " + sizeCategoryName);
        $(".sGrade").html("검수 내역 : " + sGrade + " 급");
        $(".sHopePrice").html("경매가 : " + sHopePrice + "원");
        $(".sHopeDays").html("판매 희망일 : " + sHopeDays + "일");
  
        $(".sFile").hide();
        let $imgObj = $("<img class='sFile'>"); //태그용 객체를 만듬
          // 사진 불러오기
          $.ajax({
            xhrFields: {
              responseType: "blob",
              withCredentials: true,
              cache: false,
            },
            url: backUrl + "stock/img/" + sNum,
            method: "get",
            success: function (result) {
              let blobStr = URL.createObjectURL(result);
              $imgObj.attr("src", blobStr);
            },
            error: function (xhr) {
              console.log(xhr.status);
            },
          });
  
        $(".f").append($imgObj);
  
        //계좌 불러오기
        let url2 = backUrl + "account/read";
        $.ajax({
          xhrFields: {
            withCredentials: true,
          },
          url: url2,
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
            
            $('.bankName').html(bankName);
            $('.bankNum').html(jsonStr.bankAccount);
          },error: function (xhr){
            console.log(xhr.status)
          }
        });
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
})