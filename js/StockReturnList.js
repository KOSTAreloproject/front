$(() => {
  showOrder();
  //페이지 번호가 클릭되었을 때 할 일 START//
  $("div.pagination").on("click", "span#pagenum:not(.current)", (e) => {
    e.preventDefault();
    let $page = $(e.target).text();
    let $activePageNumber = $("#pagenum.active");
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    $(e.target).addClass("active");
    showList(url, $page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 END --
  // -- 페이지 다음 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#next", (e) => {
    e.preventDefault();
    let $pagecount = Number($("div.pagecount").text());
    let $cp = Number($("#pagenum.active").text());
    let $activePageNumber = $("#pagenum.active");
    if ($pagecount == $cp) {
      alert("마지막 목록 입니다.");
      return;
    }
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    showList(url, $cp + 1);
  });
  // -- 페이지 다음 버튼을 클릭했을 때 할일 END--
  // -- 페이지 이전 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#prev", (e) => {
    e.preventDefault();
    let $cp = Number($("#pagenum.active").text()); //현재 페이지
    let $activePageNumber = $("#pagenum.active");
    if ($cp == 1) {
      alert("첫번째 목록 입니다.");
      return;
    }
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    showList(url, $cp - 1);
  });
  // -- 페이지 이전 버튼을 클릭했을 때 할일 END--

  let url = backUrl + "stockReturn/listById/";
  showList(url, 1);

  function showList(url, cp) {
    $(window).scrollTop(0);
    let $origin = $("div.desc").first();
    $("div.desc").not(":first-child").remove();
    $origin.show();

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url + cp,
      method: "GET",
      success: function (jsonStr) {
        let totalPage = jsonStr.totalPageNum;
        let $parent = $("div.list_area");
        $(jsonStr.list).each((index, sr) => {
          let sizeCategoryName = sr.sizeCategoryName;
          let sName = sr.sname;
          let srStatus = sr.srStatus;
          let sBrand = sr.sbrand;
          let sNum = sr.snum;

          let $copy = $origin.clone();

          if (srStatus == 0) {
            srStatus = "배송준비중";
          } else if (srStatus == 1) {
            srStatus = "배송중";
          } else if (srStatus == 2) {
            srStatus = "배송완료";
          } else if (srStatus == 3) {
            srStatus = "반송완료";
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

          $("div.count_ing").html(jsonStr.list.length);
          $copy.find("div.sFile").empty().append($imgObj);
          $copy.find("div.sName").html(sName);
          $copy.find("div.sNum").html(sNum);
          $copy.find("div.sBrand").html(sBrand);
          $copy.find("div.sizeCategoryName").html(sizeCategoryName);
          $copy.find("div.srStatus").html(srStatus);
          $parent.append($copy);
        });
        $origin.hide();
        $("div.pagecount").html(totalPage);
        let $pageGroup = $("div.pagination");
        let pageGroupStr = "";
        let cntPerPage = 5;
        let startPage = parseInt((cp - 1) / cntPerPage) * cntPerPage + 1;
        let endPage = startPage + cntPerPage - 1;

        if (endPage > totalPage) {
          endPage = totalPage;
        }
        pageGroupStr += '<span id="prev">&laquo;</span>';
        for (let i = startPage; i <= endPage; i++) {
          if (i == cp) {
            pageGroupStr +=
              '<span class="active" id="pagenum">' + i + "</span>";
          } else {
            pageGroupStr += '<span id="pagenum">' + i + "</span>";
          }
        }
        $pageGroup.html(pageGroupStr);
        $pageGroup.append('<span id="next">&raquo;</span>');
      },
      error: function (xhr) {
        if (xhr.responseJSON.msg === "로그인하세요") {
          location.href = "./login.html";
        }
        $("div.head_menu").hide();
        $("div.desc").hide();
        $("div.list_area").append(
          "<div class='empty'>" + "반송중인 상품이 없습니다" + "</div>"
        );
      },
    });
  }

  //주문배송 개수 세기 START
  function showOrder() {
    let url = backUrl + "orders/list";
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {
        if (jsonObj.length != 0) {
          $("div.count_end").html(jsonObj.length);
        }
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //주문배송 개수 세기 END

  //--상세보기 클릭되었을 때 할일 START--
  $("div.list_area").on("click", "div.desc", function (e) {
    let sNum = $(e.target).parents("div.desc").find("div.sNum").html();
    location.href = "./StockReturnDetail.html?sNum=" + sNum;
  });
  //--상세보기 클릭되었을 때 할일 END--

  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 60일 setting START--
  let date = new Date(); //시스템상 오늘 날짜

  let date2 = new Date();
  date2 = new Date(date2.setDate(date2.getDate() - 60)); //시스템 날짜 기준 2개월 전

  $now = date.toISOString().slice(0, 10);
  $now2 = date2.toISOString().slice(0, 10);

  $("input.start_day").val($now2);
  $("input.end_day").val($now);

  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 60일 setting END--

  //--달력 좌측, 우측 min max 설정 START--
  date = new Date(date.setDate(date.getDate() - 180));
  $now2 = date.toISOString().slice(0, 10);
  $("input.start_day").attr("min", $now2);
  $("input.start_day").attr("max", $now);
  $("input.end_day").attr("min", $now2);
  $("input.end_day").attr("max", $now);
  //--달력 좌측, 우측 min max 설정 END--

  //--최근 2개월 버튼 클릭 event START--
  $(document).on("click", "input#2months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 60)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 2개월 버튼 클릭 event END--

  //--최근 4개월 버튼 클릭 event START--
  $(document).on("click", "input#4months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 120)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 4개월 버튼 클릭 event END--

  //--최근 6개월 버튼 클릭 event START--
  $(document).on("click", "input#6months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 180)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 6개월 버튼 클릭 event END--

  //--END page 날짜 클릭 최대기간 6개월 제한 START--
  $(document).on("change", "input.days", (e) => {
    let $divObj = e.target;
    let $;
    console.log($divObj);
    alert("날짜 제한");
    // $('input.start_end_day').attr('min', $now2)
    // $('input.start_end_day').attr('max', $now)
  });
  //--END page 날짜 클릭 최대기간 6개월 제한 END--
});
