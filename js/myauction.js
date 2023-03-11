$(() => {
  //경매 종료된 항목들 개수 세기 START
  function showAuctionEnd(url) {
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
  //ajax 함수 끝
  //경매 종료된 항목들 개수 세기 END

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

  //ajax 함수 시작, 경매 진행 중 목록 띄우기 페이징 START
  function showIngPaging(url, cp) {
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
        let $origin = $("div.desc");
        $origin.show();
        let $parent = $("div.list_area");
        if (jsonObj.status == -1) {
          let $copy = $origin.clone();
          let $divObj = $("<div></div>");
          $divObj.html(jsonObj.msg);
          $divObj.addClass("zero_auction");
          $copy.empty().append($divObj);
          $parent.append($copy);
        } else {
          let res = jsonObj.res;
          let list = res.list;
          let totalPage = res.totalPage;
          let totalCount = res.totalLength;
          $("div.count_ing").html(totalCount);

          //복제본 만들어서 list에 추가
          for (let obj of list) {
            let anum = obj.anum;
            let aprice = obj.aprice;
            let adate = obj.aDate;
            // let pendDate = obj.pEndDate;
            let pnum = obj.pnum;
            let snum = obj.snum;
            let sizeCategoryName = obj.sizeCategoryName;
            let sname = obj.sname;
            let sbrand = obj.sbrand;
            let scolor = obj.scolor;
            let sgrade = obj.sgrade;

            aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let $imgObj = $("<img>");
            $imgObj.attr("id", "img_" + snum);
            $imgObj.attr("width", "130px");

            let $copy = $origin.clone();
            $copy.attr("id", pnum);
            $copy.find("div.s_img").empty().append($imgObj);
            $copy.find("div.s_name").html(sname);
            $copy.find("div.s_color").html(scolor);
            $copy.find("div.s_grade").html(sgrade);
            $copy.find("div.size_name").html(sizeCategoryName);
            $copy.find("div.a_price").html(aprice);
            $copy.find("div.a_date").html(adate);

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
  //경매 진행 중인 목록 띄우기 페이징 END

  let url = backUrl + "auction/endlist";

  //경매 종료 갯수 요청 작업 Start
  showAuctionEnd(url);
  //경매 종료 갯수 요청 작업 END

  //페이징버전 경매 진행 중 START
  url = backUrl + "auction/list/ing/";
  showIngPaging(url, 1);
  //페이징버전 경매 진행 중 START

  //경매 진행 중 클릭 시 START
  $("div.ing_tab").click(() => {
    location.href = frontUrl + "mypageIngList.html";
  });
  //경매 진행 중 클릭 시 END

  //경매 종료된 목록 click시 이벤트 페이징 버전 START
  $("div.end_tab").click(() => {
    $("div.content_area").load("mypageEndList.html");
  });
  //ajax 함수 끝
  //경매 종료된 목록 페이징 띄우기 END

  //페이지 번호가 클릭되었을 때 할 일 START//
  $("div.pagination").on("click", "span#pagenum:not(.current)", (e) => {
    url = backUrl + "auction/list/ing/";
    e.preventDefault();
    let $page = $(e.target).text();
    let $activePageNumber = $("#pagenum.active");
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    $(e.target).addClass("active");
    showIngPaging(url, $page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 END --
  // -- 페이지 다음 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#next", (e) => {
    url = backUrl + "auction/list/ing/";
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
    showIngPaging(url, $cp + 1);
  });
  // -- 페이지 다음 버튼을 클릭했을 때 할일 END--
  // -- 페이지 이전 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#prev", (e) => {
    url = backUrl + "auction/list/ing/";
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
    showIngPaging(url, $cp - 1);
  });
  // -- 페이지 이전 버튼을 클릭했을 때 할일 END--

  //-- shop 으로 이동 START --
  $("button#shop").click(() => {
    location.href = frontUrl + "shoplist.html";
  });
  //-- shop 으로 이동 END --

  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 3일 setting START--
  let date = new Date(); //시스템상 오늘 날짜
  let date2 = new Date();
  date2 = new Date(date2.setDate(date2.getDate() - 3)); //시스템 날짜 기준 3일 전

  $now = date.toISOString().slice(0, 10);
  $now2 = date2.toISOString().slice(0, 10);

  $("input.start_day").val($now2);
  $("input.end_day").val($now);
  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 3일 setting END--

  //--ing 페이지 달력 좌측, 우측 min max 설정 START--
  date = new Date(date.setDate(date.getDate() - 180));
  $now2 = date.toISOString().slice(0, 10);
  $("input.start_day").attr("min", $now2);
  $("input.start_day").attr("max", $now);
  $("input.end_day").attr("min", $now2);
  $("input.end_day").attr("max", $now);
  //--ing 페이지 달력 좌측, 우측 min max 설정 END--

  //--최근 3일 버튼 클릭 event START--
  $(document).on("click", "input#3days", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 3)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 3일 버튼 클릭 event END--

  //--최근 5일 버튼 클릭 event START--
  $(document).on("click", "input#5days", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 5)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 5일 버튼 클릭 event END--

  //--최근 7일 버튼 클릭 event START--
  $(document).on("click", "input#7days", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 7)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input.start_day").val($now2);
    $("input.end_day").val($now);
  });
  //--최근 7일 버튼 클릭 event END--

  //--END page 날짜 클릭 최대기간 6개월 제한 START--
  // $(document).on("change", "input.days", (e) => {
  //   let $divObj = $(e.target);
  //   // let $
  //   console.log($divObj);
  //   alert("날짜 제한");
  //   // $('input.start_end_day').attr('min', $now2)
  //   // $('input.start_end_day').attr('max', $now)
  // });
  //--END page 날짜 클릭 최대기간 6개월 제한 END--

  //   //--상품 클릭 되었을 때 START--
  //   $("div.productlist").on("click", "div.product", (e) => {
  //     //클릭한 상품번호 얻어오는 부분
  //     let prodNo = $(e.target).parents("div.product").find("div.prodNo").html(); //어디까지 찾느냐 div.product 까지
  //     //바로 위의 부모객체를 찾으려면 parent 메서드 쓰면됨
  //     //부모의 부모의 부모의 부모까지 다 찾는 것 parents
  //     //선택자에 만족하는 객체까지만 찾게 제한 파람값에다 적어주기

  //     location.href = "./productinfo.html?prodNo=" + prodNo;
  //   });
  //   //--상품 클릭 되었을 때 END--
});
