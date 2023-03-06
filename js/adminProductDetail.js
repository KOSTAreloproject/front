$(() => {
  let url = backUrl + "/stock/detailBySNum";
  let sNum = location.search.substring(1).split("=")[1];
  $.ajax({
    url: url,
    method: "get",
    data: { sNum: sNum },
    success: function (jsonStr) {
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

  //--상품등록 버튼 클릭 되었을 때 할일 START--
  let $form = $("div.StockDetail>form");
  $form.submit((e) => {
    let url = backUrl + "/product/add";
    let sNum = location.search.substring(1).split("=")[1];
    let params = {
      sNum: sNum,
    };
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
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
  //--상품등록 버튼 클릭 되었을 때 할일 END--
});
