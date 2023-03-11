$(()=>{
    let url = backUrl + "stockReturn/detailById";
    let sNum = location.search.substring(1).split("=")[1];
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "GET",
      data: { sNum: sNum },
      success: function (jsonStr) {
       console.log(jsonStr)
        let sBrand = jsonStr.sBrand;
        let sName = jsonStr.sName;
        let sizeCategoryName = jsonStr.sizeCategoryName;
        let srStartDateY = jsonStr.sr.srStartDate[0];
        let srStartDateM = jsonStr.sr.srStartDate[1];
        let srStartDateMD = jsonStr.sr.srStartDate[2];
        let srStartDate = srStartDateY+"-"+srStartDateM+"-"+srStartDateMD;
        let srTrackingInfo = jsonStr.sr.srTrackingInfo;
        let addrPostNum = jsonStr.sr.addr.addrPostNum;
        let addr = jsonStr.sr.addr.addr;
        let addrDetail = jsonStr.sr.addr.addrDetail;
        let addrName = jsonStr.sr.addr.addrName;
        let addrRecipient = jsonStr.sr.addr.addrRecipient;
        let addrTel = jsonStr.sr.addr.addrTel;
        let srStatus = jsonStr.sr.srStatus;

        if(srStatus == 0 ){
            $(".groupIng>.ing2").html("📦 배송준비중");
            $(".groupIng>.ing2").css("font-weight","bold")
        }else if (srStatus == 1){
            $(".groupIng>.ing3").html("🚚 배송중");
            $(".groupIng>.ing3").css("font-weight","bold")
        }else if (srStatus == 2){
            $(".groupIng>.ing4").html("📦 배송완료");
            $(".groupIng>.ing4").css("font-weight","bold")
        }else if (srStatus == 3){
            $(".groupIng>.ing5").html("❤️ 반송완료");
            $(".groupIng>.ing5").css("font-weight","bold")
        }

  
        $(".sBrand").html(sBrand);
        $(".sName").html(sName);
        $(".sizeCategoryName").html(sizeCategoryName);
        $(".sizeCategoryName").html(sizeCategoryName);
        $(".srStartDate").html( srStartDate );
        $(".srTrackingInfo").html(srTrackingInfo);
        $(".addrPostNum").html(addrPostNum);
        $(".addr").html(addr);
        $(".addrDetail").html(addrDetail);
        $(".addrName").html(addrName);
        $(".addrRecipient").html(addrRecipient);
        $(".addrTel").html(addrTel);
        
  
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
  
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
})