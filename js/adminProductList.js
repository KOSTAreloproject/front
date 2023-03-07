$(() => {
  let url = backUrl + "stock/listBySstatus/1";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "get",
    data: { sStatus: 3 },
    success: function (jsonStr) {
      console.log(jsonStr);
      let $origin = $("div.stock").first();
      let $parent = $("div.StockList");
      $(jsonStr.list).each((index, s) => {
        let sizeCategoryName = s.sizeCategoryName;
        let sName = s.sname;
        let sColor = s.scolor;
        let sNum = s.snum;

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
        "<div class='empty'>" + xhr.responseJSON.msg + "</div>"
      );
    },
  });

  //--상세보기 클릭되었을 때 할일 START--
  $("div.StockList").on("click", ".detail", function (e) {
    let sNum = $(e.target).parents("div.stock").find("div.sNum").html();
    location.href = "./adminProductDetail.html?sNum=" + sNum;
  });
  //--상세보기 클릭되었을 때 할일 END--
});
