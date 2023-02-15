$(() => {
  let url = backUrl + "/stock/detailById.do";
  let sNum = location.search.substring(1).split("=")[1];
  $.ajax({
    url: url,
    method: "get",
    data: { sNum: sNum },
    success: function (jsonStr) {
      let sFile = jsonStr.sfile;
      let sBrand = jsonStr.sbrand;
      let sName = jsonStr.sname;
      let sizeCategoryName = jsonStr.sizes.sizeCategoryName;
      let sGrade = jsonStr.sgrade;
      let sOriginPrice = jsonStr.soriginPrice;
      let managerComment = jsonStr.managerComment;
      $(".sBrand").html(sBrand);
      $(".sName").html(sName);
      $(".sizeCategoryName").html("사이즈: " + sizeCategoryName);
      $(".sGrade").html("상품 등급 : " + sGrade + " 급");
      $(".sOriginPrice").html("상품 원가 : " + sOriginPrice + "원");
      $(".managerComment").html("comment : " + managerComment);

      $(".sFile").hide();
      let $imgObj = $("<img class='sFile'>");
      $imgObj.attr("src", "../imgs/" + sFile);

      $(".f").append($imgObj);
    },
    error: function (xhr) {
      alert(xhr.status);
    },
  });

  //--판매자 희망판매가 입력 후 sumit되었을 때 할일 START--
  let $form = $("div.inventory>form");
  $form.submit((e) => {
    let url = backUrl + "/stock/editSReturn.do";
    let sNum = location.search.substring(1).split("=")[1];
    let params = {
      sNum: sNum,
      sHopePrice: $(".sHopePrice").val(),
    };
    $.ajax({
      url: url,
      method: "post",
      data: params,
      success: function () {
        location.href = frontUrl + "inventory.html";
      },
      error: function (xhr) {
        alert("오류" + xhr.status);
      },
    });
    // 기본 이벤트 처리 막기: return false
    return false;
  });
  //--판매자 희망판매가 입력 후 sumit되었을 때 할일 END--
});