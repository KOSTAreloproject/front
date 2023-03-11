$(() => {
    $("div#popup_background").hide();
    let url = backUrl + "stock/detailById";
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
        let sBrand = jsonStr[0].sbrand;
        let sName = jsonStr[0].sname;
        let sizeCategoryName = jsonStr[0].sizeCategoryName;
        let sGrade = jsonStr[0].sgrade;
        let sHopePrice = jsonStr[0].shopePrice;
        let managerComment = jsonStr[0].managerComment;
        let sHopeDays = jsonStr[0].shopeDays;
  
        $(".sBrand").html(sBrand);
        $(".sName").html(sName);
        $(".sizeCategoryName").html(sizeCategoryName);
        $(".sGrade").html(sGrade + " 급");
        $(".sHopePrice").html( sHopePrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + "원");
        $(".managerComment").html( managerComment);
        $(".sHopeDays").html(sHopeDays + "일");
  
        //최고 hopePrice 계산
        $(".maxPrice").html("※ 최대 " + maxPrice(sHopePrice,sGrade).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+"원 까지");
  
  
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
    //상한가 계산
    function maxPrice(sHopePrice,sGrade){
      let maxPrice;
      if(sGrade == "S"){
        maxPrice = sHopePrice * 0.9;
        $(" div.price > input.sHopePrice").attr("max",maxPrice);
        return maxPrice;
      }else if(sGrade == "A"){
        maxPrice = sHopePrice * 0.8;
        $(" div.price > input.sHopePrice").attr("max",maxPrice);
        return maxPrice;
      }else if(sGrade == "B"){
        maxPrice = sHopePrice * 0.7;
        $(" div.price > input.sHopePrice").attr("max",maxPrice);
        return maxPrice;
      }
    }

  
      //--모달창 클릭되었을 때 할일 START--
  
      $("#cancle_btn").click(function (e) {
        $("div#popup_background").hide();
      });
     
      //--모달창 클릭되었을 때 할일 END--

      //--상한가 체크 START--
      $(".sHopePrice").on("blur", function() {
        var inputValue = parseInt($(this).val());
        var maxValue = parseInt($(this).attr("max"));
      
        if (inputValue > maxValue) {
         
            $("p.ckPrice").css("display","block")
         
          $(this).val("");
        } else {
            $("p.ckPrice").css("display","none")
        }
      });
      //--상한가 체크 END--


    //--판매자 희망판매가 입력 후 클릭되었을 때 할일 START--
  
      $(" div.choice > input.regi").click(function (e) {

        let sHopePrice = $("div.inventory > div.jgh > div.price > input").val();

        if(sHopePrice ==''){
          $("div#popup_background").show();
          $("p#ask").html("상품가격을 입력하세요");
          $("#ok_btn").hide();
        }else{
          $("#ok_btn").show();
        $("div#popup_background").show();
        $("p#ask").html("상품을 등록 하시겠습니까?");
  
      let url = backUrl + "stock/editSstatus";
      let sNum = location.search.substring(1).split("=")[1];
      let params = {
        sNum: sNum,
        sHopePrice:sHopePrice ,
      };
      $("#ok_btn").click(function (e) {
        $("div#popup_background").hide();
        $.ajax({
          xhrFields: {
            withCredentials: true,
          },
          url: url,
          method: "PUT",
          data: JSON.stringify(params),
          contentType: "application/json",
          success: function () {
            location.href = frontUrl + "inventory.html";
          },
          error: function (xhr) {
            
          },
        });
        return false;
      });
      // 기본 이벤트 처리 막기: return false
    }
    });
    //--판매자 희망판매가 입력 후 클릭되었을 때 할일 END--

  
  });
  