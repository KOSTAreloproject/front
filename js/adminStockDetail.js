$(() => {
  let url = backUrl + "stock/detailBySNum";
  let sNum = location.search.substring(1).split("=")[1];
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "get",
    data: { sNum: sNum },
    success: function (jsonStr) {
      let sBrand = jsonStr.sbrand;
      let sName = jsonStr.sname;
      let sType = jsonStr.stype;
      let sizeCategoryName = jsonStr.sizes.sizeCategoryName;
      let sColor = jsonStr.scolor;
      let sOriginPrice = jsonStr.soriginPrice;
      let sHopeDays = jsonStr.shopeDays;
      let sellerComment = jsonStr.sellerComment;
      $(".sBrand").html(sBrand);
      $(".sName").html(sName);
      $(".sType").html(sType);
      $(".sizeCategoryName").html(sizeCategoryName);
      $(".sColor").html(sColor);
      $(".sOriginPrice").html(sOriginPrice + "원");

      $(".sHopeDays").html(sHopeDays + "일");
      $(".sellerComment").html(sellerComment);

      $(".sFile").hide();
      let $imgObj = $("<img class='sFile'>");
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

      $(".file").append($imgObj);
    },
    error: function (xhr) {
      alert(xhr.status);
    },
  });

  //--등급과 comment 입력 후 sumit되었을 때 할일 START--
  let $form = $("div.StockDetail>form");
  $form.submit((e) => {
    let url = backUrl + "stock/editSstatus";
    let sNum = location.search.substring(1).split("=")[1];

    let params = {
      sNum: sNum,
      sGrade: $(".sGrade").val(),
      managerComment: $(".managerComment").val(),
    };

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "PUT",
      data: JSON.stringify(params),
      contentType: "application/json",
      success: function () {
        location.href = frontUrl + "admin.html";
      },
      error: function (xhr) {
        alert("오류" + xhr.status);
      },
    });
    // 기본 이벤트 처리 막기: return false
    return false;
  });
  //--등급과 comment 입력 후 sumit되었을 때 할일 END--
});
