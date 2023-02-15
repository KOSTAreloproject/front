$(() => {
  $("div#popup_background").hide();
  let url = backUrl + "/product/listById.do";
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
        let pNum = p.pNum;
        let sBrand = p.sBrand;
        let $copy = $origin.clone();

        if (pStatus == 4) {
          pStatus = "경매중";
        }

        let $imgObj = $("<img class='sFile'>"); //태그용 객체를 만듬
        $imgObj.attr("src", "../imgs/" + sFile); //+ ".jpg"
        $copy.find("div.pNum").html(pNum);
        $copy.find("div.sFile").empty().append($imgObj);
        $copy.find("div.sName").html(sName);
        $copy.find("div.sBrand").html(sBrand);
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
    let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
    location.href = "./inventory2Detail.html?pNum=" + pNum;
  });
  //--상세보기 클릭되었을 때 할일 END--
});
