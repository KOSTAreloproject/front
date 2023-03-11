$(()=>{
    let url = backUrl + "product/EndDetailById";
    let pNum = location.search.substring(1).split("=")[1];
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "GET",
      success: function (jsonStr) {
        console.log(jsonStr)
        let sBrand = jsonStr[0].sbrand;
        let sName = jsonStr[0].sname;
        let sizeCategoryName = jsonStr[0].sizeCategoryName;
        let sGrade = jsonStr[0].sgrade;
        let maxPrice = jsonStr[0].maxPrice;
        let sNum = jsonStr[0].snum;
        let pEndDate = jsonStr[0].pEndDate;

     

        $(".pEndDate").html(pEndDate);
        $(".sBrand").html(sBrand);
        $(".sName").html(sName);
        $(".sizeCategoryName").html( sizeCategoryName);
        $(".sGrade").html( sGrade + " 급");
        $(".maxPrice").html(maxPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원");
        $(".finalPrice").html("💰"+finalPrice(maxPrice).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원");
  
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

    //정산금액 = 판매가 - (검수비 + 수수료 )
    function finalPrice(maxPrice,sHopePrice){
        maxPrice = maxPrice - (4000);
        return maxPrice;
    }

    
})