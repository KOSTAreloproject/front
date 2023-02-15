$(() => {
    let url = backUrl + "/stock/listBySReturn.do";
    $.ajax({
      url: url,
      method: "get",
      data: { sReturn: 5 },
      success: function (jsonStr) {
        let $origin = $("div.stock").first();
        let $parent = $("div.StockList");
        $(jsonStr).each((index, s) => {
          let sFile = s.sFile;
          let sizeCategoryName = s.sizeCategoryName;
          let sName = s.sName;
          let sColor = s.sColor;
          let sNum = s.sNum;
          let $copy = $origin.clone();
  
          let $imgObj = $("<img class='sFile'>"); //태그용 객체를 만듬
          $imgObj.attr("src", "../imgs/" + sFile); //+ ".jpg"
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
        alert(xhr.status);
      },
    });
  
    //--상세보기 클릭되었을 때 할일 START--
    $("div.StockList").on("click", ".detail", function (e) {
      let sNum = $(e.target).parents("div.stock").find("div.sNum").html();
      let url = backUrl + "/stockDelivery/add.do";
      $.ajax({
        url: url,
        method: "get",
        data: sNum,
        success: function (jsonStr) {
          alert("재고반송 추가완료");
        },
        error: function (xhr) {
          // alert(xhr.status);
          alert("재고반송 테이블 구현하고~");
        },
      });
    });
    //--상세보기 클릭되었을 때 할일 END--
  });