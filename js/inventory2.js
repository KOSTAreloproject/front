$(() => {
  $("div#popup_background").hide();
  let url = backUrl + "product/listById/1";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "GET",
    success: function (jsonStr) {
      let $origin = $("div.desc").first();
      let $parent = $("div.list_area");
      $(jsonStr.list).each((index, p) => {
        let sizeCategoryName = p.sizeCategoryName;
        let sName = p.sname;
        let pStatus = p.pstatus;
        let pNum = p.pnum;
        let sBrand = p.sbrand;
        let sNum = p.snum;

        let $copy = $origin.clone();

        if (pStatus == 4) {
          pStatus = "경매중";
        }

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
      if (xhr.responseJSON.msg === "로그인하세요") {
        location.href = "./login.html";
      }
      $("div.head_menu").hide();
      $("div.desc").hide();
      $("div.list_area").append(
        "<div class='empty'>" + xhr.responseJSON.msg + "</div>"
      );
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
