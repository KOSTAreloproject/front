$(() => {
    $("div#popup_background").hide();
    let url = backUrl + "/product/EndListById.do";
    $.ajax({
      url: url,
      method: "post",
      success: function (jsonStr) {
        let $origin = $("div.desc").first();
        let $parent = $("div.list_area");
        $(jsonStr).each((index, p) => {
          let sFile = p.sFile;
          let sizeCategoryName = p.sizeCategoryName;
          let sName = p.sName;
          let pStatus = p.pStatus;
          let sBrand = p.sBrand;
          let pNum = p.pNum;
          let pEndDate = p.pEndDate;
          let $copy = $origin.clone();
  
          if (pStatus == 8) {
            pStatus = "유찰";
          } else if (pStatus == 6) {
            pStatus = "낙찰";
          } else if (pStatus == 7) {
            pStatus = "정산중";
          }
          // if (sGrade == null) {
          //   sGrade = "-";
          // }
  
          let $imgObj = $("<img class='sFile'>"); //태그용 객체를 만듬
          $imgObj.attr("src", "../imgs/" + sFile); //+ ".jpg"
          $copy.find("div.pNum").html(pNum);
          $copy.find("div.sBrand").html(sBrand);
          $copy.find("div.sFile").empty().append($imgObj);
          $copy.find("div.sName").html(sName);
          $copy.find("div.pEndDate").html(pEndDate);
          $copy.find("div.sizeCategoryName").html(sizeCategoryName);
          $copy.find("div.pStatus").html(pStatus);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  
    //--상세보기 클릭되었을 때 할일 START--
    $("div.list_area").on("click", "div.desc", function (e) {
      let pStatus = $(e.target).parents("div.desc").find("div.pStatus").html();
      if (pStatus == "경매중") {
        let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
        location.href = "./inventory3Detail.html?pNum=" + pNum;
      } else if (pStatus == "정산중") {
        $("div#popup_background").show();
        $("p#ask").html("상품이 정산중입니다");
      }
    });
    //--상세보기 클릭되었을 때 할일 END--
  
    //--모달창 클릭되었을 때 할일 START--
    $("#ok_btn").click(function (e) {
      $("div#popup_background").hide();
    });
    //--모달창 클릭되었을 때 할일 END--
  });