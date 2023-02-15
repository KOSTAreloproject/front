$(() => {
  let url = backUrl + "/stock/detailBySNum.do";
  let sNum = location.search.substring(1).split("=")[1];
  $.ajax({
    url: url,
    method: "get",
    data: { sNum: sNum },
    success: function (jsonStr) {
      let sFile = jsonStr.sfile;
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
      $imgObj.attr("src", "../imgs/" + sFile);

      $(".file").append($imgObj);
    },
    error: function (xhr) {
      alert(xhr.status);
    },
  });

  //--등급과 comment 입력 후 sumit되었을 때 할일 START--
  let $form = $("div.StockDetail>form");
  $form.submit((e) => {
    let url = backUrl + "/stock/editSReturn.do";
    let sNum = location.search.substring(1).split("=")[1];
    let params = {
      sNum: sNum,
      sGrade: $(".sGrade").val(),
      managerComment: $(".managerComment").val(),
    };
    $.ajax({
      url: url,
      method: "post",
      data: params,
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