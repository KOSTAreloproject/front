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
      let sGrade = jsonStr.sgrade;
      let sColor = jsonStr.scolor;
      let sHopePrice = jsonStr.shopePrice;
      let sHopeDays = jsonStr.shopeDays;
      let managerComment = jsonStr.managerComment;
      $(".sBrand").html(sBrand);
      $(".sName").html(sName);
      $(".sGrade").html(sGrade + "급");
      $(".sColor").html(sColor);
      $(".sHopePrice").html(sHopePrice + "원");
      $(".sHopeDays").html(sHopeDays + "일");
      $(".managerComment").html(managerComment);

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
    let url = backUrl + "/product/add.do";
    let sNum = location.search.substring(1).split("=")[1];
    let params = {
      sNum: sNum,
    };
    $.ajax({
      url: url,
      method: "post",
      data: params,
      success: function () {
        location.href = frontUrl + "adminProductList.html";
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
