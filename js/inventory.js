$(() => {
  $("div#popup_background").hide();
  let url = backUrl + "stock/listById/1";
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url,
    method: "GET",
    success: function (jsonStr) {
      let $origin = $("div.desc").first();
      let $parent = $("div.list_area");
      $(jsonStr.list).each((index, s) => {
        let sizeCategoryName = s.sizeCategoryName;
        let sName = s.sname;
        let sGrade = s.sgrade;
        let sStatus = s.sstatus;
        let sNum = s.snum;
        let sBrand = s.sbrand;

        let $copy = $origin.clone();

        if (sStatus == 1) {
          sStatus = "검수중";
        } else if (sStatus == 2) {
          sStatus = "검수완료";
        } else if (sStatus == 3) {
          sStatus = "판매등록 대기중";
        }
        if (sGrade == "null") {
          sGrade = "-";
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

        $copy.find("div.sNum").html(sNum);
        $copy.find("div.sFile").empty().append($imgObj);
        $copy.find("div.sName").html(sName);
        $copy.find("div.sBrand").html(sBrand);
        $copy.find("div.sizeCategoryName").html(sizeCategoryName);
        $copy.find("div.sGrade").html(sGrade);
        $copy.find("div.sStatus").html(sStatus);
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
    let sStatus = $(e.target).parents("div.desc").find("div.sStatus").html();
    if (sStatus == "검수완료") {
      let sNum = $(e.target).parents("div.desc").find("div.sNum").html();
      location.href = "./inventoryDetail.html?sNum=" + sNum;
    } else if (sStatus == "검수중") {
      $("div#popup_background").show();
      $("p#ask").html("아직 상품이 검수중입니다.");
    } else if (sStatus == "판매등록 대기중") {
      $("div#popup_background").show();
      $("p#ask").html("관리자가 상품을 등록중입니다.");
    }
  });
  //--상세보기 클릭되었을 때 할일 END--

  //--모달창 클릭되었을 때 할일 START--
  $("#ok_btn").click(function (e) {
    $("div#popup_background").hide();
  });
  //--모달창 클릭되었을 때 할일 END--

  //--네이버 이미지 캡차 START--
  //--네이버 이미지 캡차  END--
  // });
  // $.ajax({
  //   xhrFields: {
  //     withCredentials: true,
  //   },
  //  url: backUrl + "naver/captchaKey",
  //   method: "get",
  //   success: function (result) {
  //     console.log("key: " + result);
  //     $.ajax({
  //       xhrFields: {
  //         withCredentials: true,
  //       },
  //      url: backUrl + "naver/captchaImg"+"?key="+result,
  //       method: "get",
  //       success: function (result) {
  //       console.log(result);
  //     },
  //     error: function (xhr) {
  //       console.log(xhr.status);
  //     },
  //     });
  // },
  // error: function (xhr) {
  //   console.log(xhr.status);
  // },
});
