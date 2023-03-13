$(() => {
  //ajax 함수 시작, 낙찰 목록 띄우기 START
  function showAwardPaging(url, cp) {
    let $origin = $("div.desc").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.desc").not(":first-child").remove();

    $.ajax({
      url: url + cp,
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {
        //$붙이면 제이쿼리용 객체
        let $origin = $("div.desc");
        $origin.show();
        let $parent = $("div.list_area");
        if (jsonObj.status == -1) {
          let $copy = $origin.clone();
          let $divObj = $("<div></div>");
          $divObj.html(jsonObj.msg);
          $divObj.addClass("zero_order_delivery");
          $copy.empty().append($divObj);
          $parent.append($copy);
        } else {
          let list = jsonObj.list;
          let totalPage = jsonObj.totalPage;

          //복제본 만들어서 list에 추가
          for (let obj of list) {
            let anum = obj.anum;
            let mnum = obj.mnum;
            let aprice = obj.aprice;
            let atime = obj.aTime;
            // let pendDate = obj.pEndDate;
            let pnum = obj.pnum;
            let snum = obj.snum;
            let sizeCategoryName = obj.sizeCategoryName;
            let sname = obj.sname;
            //   let sbrand = obj.sbrand;
            let scolor = obj.scolor;
            let sgrade = obj.sgrade;

            let $imgObj = $("<img>");
            $imgObj.attr("id", "img_" + snum);
            $imgObj.attr("width", "130px");
            $imgObj.attr("class", "prod_img");
            $imgObj.attr("data-pnum", pnum);

            let $btnObj = $(
              "<input type='button' value='구매요청' class='buy_admin'>"
            );
            $btnObj.attr("data-sname", sname);
            // $btnObj.attr("data-mnum", mnum);
            $btnObj.attr("data-price", aprice);
            $btnObj.attr("data-mnum", mnum);
            let $divObj = $("<div></div>");

            aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let $copy = $origin.clone();
            $copy.attr("id", pnum);
            $copy.find("div.s_img").empty().append($imgObj);
            $copy.find("div.s_name").html(sname);
            $copy.find("div.s_color").html(scolor);
            $copy.find("div.s_grade").html(sgrade);
            $copy.find("div.size_name").html(sizeCategoryName);
            $copy.find("div.a_price").html(aprice);
            $copy.find("div.o_date").html(atime);

            $divObj.append($btnObj);

            $copy.find("div.o_date").append($divObj);
            // $copy.find("div.end_s_grade").css("{padding:30px 4px 39px !important}");
            // $copy.find("div.end_a_price").css("{padding:30px 4px 39px !important}")
            // $copy.find("div.end_a_date").css("{padding:30px 4px 39px !important}")
            // $copy.find("div.status").css("{padding:30px 4px 39px !important}")
            //div.end_a_price,div.end_a_date,div.status

            $parent.append($copy);
            imgShow(snum, "img_" + snum);
          }
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
        }
        $origin.hide();
        $(window).scrollTop(0);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //ajax 함수 끝
  //경매 진행 중인 목록 띄우기 END

  //--상품 이미지 띄우기 START--
  function imgShow(num, id) {
    $.ajax({
      xhrFields: {
        responseType: "blob",
        withCredentials: true,
        cache: false,
      },
      url: backUrl + "stock/img/" + num,
      method: "get",
      success: function (result) {
        let blobStr = URL.createObjectURL(result);
        $("img#" + id).attr("src", blobStr);
      },
      error: function (xhr) {
        console.log(xhr.status);
      },
    });
  }
  //--상품 이미지 띄우기 END--

  //--구매요청 버튼 클릭시 START
  $(document).on("click", "input.buy_admin", (e) => {
    let sname = $(e.target).attr("data-sname");
    let mnum = $(e.target).attr("data-mnum");
    let aprice = $(e.target).attr("data-price");
    console.log(sname);
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + "member/pay-request",
      method: "post",
      data: JSON.stringify({
        mnum: mnum,
        aprice: aprice,
        sname: sname,
      }),
      contentType: "application/json",
      success: function (result) {
        alert("결제 요청 이메일 발송 완료.");
      },
      error: function (xhr) {
        console.log(xhr.status);
      },
    });
  });
  //--구매요청 버튼 클릭시 END

  let url = backUrl + "award/list/paging/";

  //낙찰 목록 요청 작업 Start
  showAwardPaging(url, 1);
  //낙찰 목록 요청 작업 END

  //페이지 번호가 클릭되었을 때 할 일 START//
  $("div.pagination").on("click", "span#pagenum:not(.current)", (e) => {
    url = backUrl + "award/list/paging/";
    e.preventDefault();
    let $page = $(e.target).text();
    let $activePageNumber = $("#pagenum.active");
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    $(e.target).addClass("active");
    showAwardPaging(url, $page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 END --
  // -- 페이지 다음 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#next", (e) => {
    url = backUrl + "award/list/paging/";
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
    showAwardPaging(url, $cp + 1);
  });
  // -- 페이지 다음 버튼을 클릭했을 때 할일 END--
  // -- 페이지 이전 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#prev", (e) => {
    url = backUrl + "award/list/paging/";
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
    showAwardPaging(url, $cp - 1);
  });
  // -- 페이지 이전 버튼을 클릭했을 때 할일 END--

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

  // //--END page 날짜 클릭 최대기간 6개월 제한 START--
  // $(document).on("change", "input.days", (e) => {
  //   let $divObj = e.target;
  //   let $;
  //   console.log($divObj);
  //   alert("날짜 제한");
  //   // $('input.start_end_day').attr('min', $now2)
  //   // $('input.start_end_day').attr('max', $now)
  // });
  //--END page 날짜 클릭 최대기간 6개월 제한 END--

  //--상품 클릭 되었을 때 START--
  $(document).on("click", "img.prod_img", (e) => {
    //클릭한 상품번호 얻어오는 부분
    let prodNo = $(e.target).attr("data-pnum"); //어디까지 찾느냐 div.product 까지
    location.href = "./shopproductdetail.html?pNum=" + prodNo;
  });
  //--상품 클릭 되었을 때 END--
});
