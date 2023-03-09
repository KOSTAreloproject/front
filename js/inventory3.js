$(() => {

  $("div#popup_background").hide();
  let url = backUrl + "/product/EndListById/1";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "GET",
    success: function (jsonStr) {
      console.log(jsonStr);
      let $origin = $("div.desc").first();
      let $parent = $("div.list_area");
      $(jsonStr.list).each((index, p) => {
        let sizeCategoryName = p.sizeCategoryName;
        let sName = p.sname;
        let pStatus = p.pstatus;
        let pNum = p.pnum;
        let sBrand = p.sbrand;
        let sNum = p.snum;
        let pEndDate = p.pEndDate;

        let $copy = $origin.clone();

        if (pStatus == 8) {
          pStatus = "유찰";
        } else if (pStatus == 6) {
          pStatus = "낙찰";
        } else if (pStatus == 7) {
          pStatus = "정산중";
        } else if (pStatus == 9){
          pStatus = "판매완료";
        }
        // if (sGrade == null) {
        //   sGrade = "-";
        // }

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

        $copy.find("div.pNum").html(pNum);
        $copy.find("div.sBrand").html(sBrand);
        $copy.find("div.sFile").empty().append($imgObj);
        $copy.find("div.sName").html(sName);
        $copy.find("div.pEndDate").html(pEndDate);
        $copy.find("div.sizeCategoryName").html(sizeCategoryName);
        $copy.find("div.pStatus").html(pStatus);
        $copy.find("div.sNum").html(sNum);
        $parent.append($copy);
      });
      $origin.hide();
    },
    error: function (xhr) {
      console.log(xhr)
      if (xhr.responseJSON.msg === "로그인 하세요") {
        location.href = "./login.html";
      }
      $("div.head_menu").hide();
      $("div.desc").hide();
      $("div.list_area").append(
        "<div class='empty'>" + "종료된 상품이 없습니다" + "</div>"
      );
    },
  });

  //--상세보기 클릭되었을 때 할일 START--
  $("div.list_area").on("click", "div.desc", function (e) {
    let pStatus = $(e.target).parents("div.desc").find("div.pStatus").html();
    if (pStatus == "낙찰") {
      $("div#popup_background").show();
      $("p#ask").html("낙찰자가 상품을 결제해야 합니다");
      // let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
      // location.href = "./inventory3Detail.html?pNum=" + pNum;
    } else if (pStatus == "정산중") {
      $("div#popup_background").show();
      $("p#ask").html("상품이 정산중입니다");
    } else if (pStatus == "유찰"){
      $("div#popup_background").show();
      $("button#no_btn").show();
      $("button#re_btn").show();
      $("#ok_btn").hide();
      $("p#ask").html("상품을 재등록 하시겠습니까?");
    }else if (pStatus == "판매완료"){
      let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
      location.href = "./inventory3Detail.html?pNum=" + pNum;
    }
  });
  //--상세보기 클릭되었을 때 할일 END--

  //--모달창 클릭되었을 때 할일 START--
  $("#ok_btn").click(function (e) {
    $("div#popup_background").hide();
  });

  $("button#re_btn").click(function (e) {
    $("div#popup_background").hide();
    let pNum = $("div:nth-child(2) > div.pNum").html();
    let sNum = $("div:nth-child(2) > div.item_areas > div.sNum").html();

    let url = backUrl + "product/delBypNum/"+pNum
    
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "DELETE",
      success: function (jsonStr) {
        location.href = "./reStock.html?sNum=" + sNum;
      },
      error: function (xhr) {
      },
    });
  });

  $("button#no_btn").click(function (e) {
    $("div#popup_background").hide();
    let pNum = $("div:nth-child(2) > div.pNum").html();
    let url = backUrl + "product/delBypNum/"+pNum

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "DELETE",
      success: function (jsonStr) {
        location.href = "./inventory3.html";
      },
      error: function (xhr) {
      },
    });
  });
  //--모달창 클릭되었을 때 할일 END--

  
});
