$(() => {
  let url = backUrl + "stock/listBySstatus/1";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "get",
    data: { sStatus: 5 },
    success: function (jsonStr) {
      let $origin = $("div.stock").first();
      let $parent = $("div.StockList");
      console.log(jsonStr);
      $(jsonStr.list).each((index, s) => {
        let sizeCategoryName = s.sizeCategoryName;
        let sName = s.sname;
        let sColor = s.scolor;
        let sNum = s.snum;
        let mNum = s.mnum;

        let $copy = $origin.clone();

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
        $copy.find("div.mNum").html(mNum);
        $copy.find("div.sNum").html(sNum);
        $copy.find("div.sFile").empty().append($imgObj);
        $copy.find("div.sizeCategoryName").html("사이즈: " + sizeCategoryName);
        $copy.find("div.sName").html("상품명: " + sName);
        $copy.find("div.sColor").html("색상: " + sColor);
        $parent.append($copy);
      });
      $origin.hide();
    },
    error: function (xhr) {
      if (xhr.responseJSON.msg === "로그인하세요") {
        location.href = "./login.html";
      }
      $("div.head_menu").hide();
      $("div.stock").hide();
      $("div.StockList").append(
        "<div class='empty'>" + "반송 신청내역이 없습니다." + "</div>"
      );
    },
  });

  //--상세보기 클릭되었을 때 할일 START--
  $("div.StockList").on("click", ".detail", function (e) {
    let sNum = $(e.target).parents("div.stock").find("div.sNum").html();
    let mNum = $(e.target).parents("div.stock").find("div.mNum").html();
    let url = backUrl + "stockReturn/add";
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({ sNum: sNum, mNum: mNum }),
      success: function (jsonStr) {
        alert("재고반송 추가완료");
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });
  //--상세보기 클릭되었을 때 할일 END--
});
