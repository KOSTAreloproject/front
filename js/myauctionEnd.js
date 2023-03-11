$(() => {
  //경매 중인 항목 개수 세는 거로 변경하기
  function showAuctionIng(url) {
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {
        let list = jsonObj.list;
        if (list.length != 0) {
          $("div.count_ing").html(list.length);
        }
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //ajax 함수 끝
  //경매 중인 항목들 개수 세기 END

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

  //ajax 함수 시작, 경매 종료 목록 띄우기 페이징 START
  function showEndPaging(url, cp) {
    let $origin = $("div.end_desc").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.end_desc").not(":first-child").remove();

    $.ajax({
      url: url + cp,
      method: "get",
      xhrFields: {
        withCredentials: true,
      },
      success: function (jsonObj) {
        //$붙이면 제이쿼리용 객체
        let $origin = $("div.end_desc");
        $origin.show();
        let $parent = $("div.list_end_area");
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
          $("div.count_end").html(totalCount);

          //복제본 만들어서 list에 추가
          for (let obj of list) {
            let anum = obj.anum;
            let awNum = obj.awNum;
            let aprice = obj.aprice;
            let aDate = obj.aDate;
            let pnum = obj.pnum;
            let snum = obj.snum;
            let sizeCategoryName = obj.sizeCategoryName;
            let sname = obj.sname;
            let sbrand = obj.sbrand;
            let sgrade = obj.sgrade;
            let scolor = obj.scolor;
            let pstatus = obj.pstatus;
            let mnum = obj.mnum;
            let $copy = $origin.clone();

            aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            let $imgObj = $("<img>");
            $imgObj.attr("id", "end_img_" + snum);
            $imgObj.attr("width", "130px");

            $copy.find("div.end_s_img").empty().append($imgObj);
            $copy.find("div.end_s_name").html(sname);
            $copy.find("div.end_s_color").html(scolor);
            $copy.find("div.end_s_grade").html(sgrade);
            $copy.find("div.end_size_name").html(sizeCategoryName);
            $copy.find("div.end_a_price").html(aprice);
            $copy.find("div.end_a_date").html(aDate);

            $parent.append($copy);

            if (awNum != null) {
              if (pstatus == 6) {
                $copy.find("div.status").html("낙찰");
                let $btnObj = $(
                  "<input type='button' value='결제' class='buy'>"
                );
                $btnObj.attr("data-name", anum);
                $btnObj.attr("data-num", pnum);
                $btnObj.attr("data-mem", mnum);
                $btnObj.attr("data-price", aprice);
                let $divObj = $("<div></div>");
                $divObj.append($btnObj);
                // $copy.find("div.status").append($btnObj);
                let $btnObj2 = $(
                  "<input type='button' value='포기' class='cancel'>"
                );
                $btnObj2.attr("data-name", anum);
                $btnObj2.attr("data-num", pnum);
                $btnObj2.attr("data-mem", mnum);
                $divObj.append($btnObj2);
                $copy.find("div.status").append($divObj);
                // $copy.find("div.end_s_grade").css("{padding:30px 4px 39px !important}");
                // $copy.find("div.end_a_price").css("{padding:30px 4px 39px !important}")
                // $copy.find("div.end_a_date").css("{padding:30px 4px 39px !important}")
                // $copy.find("div.status").css("{padding:30px 4px 39px !important}")
                //div.end_a_price,div.end_a_date,div.status
              } else if (pstatus == 7 || pstatus == 9) {
                $copy.find("div.status").html("결제 완료");
              }
            } else if (pstatus == 8) {
              $copy.find("div.status").html("낙찰 포기");
            } else {
              $copy.find("div.status").html("미낙찰");
            }
            $parent.append($copy);
            imgShow(snum, "end_img_" + snum);
          }

          $("div.end_pagecount").html(totalPage);
          let $pageGroup = $("div.end_pagination");
          let pageGroupStr = "";
          let cntPerPage = 5;
          let startPage = parseInt((cp - 1) / cntPerPage) * cntPerPage + 1;
          let endPage = startPage + cntPerPage - 1;

          if (endPage > totalPage) {
            endPage = totalPage;
          }
          pageGroupStr += '<span id="end_prev">&laquo;</span>';
          for (let i = startPage; i <= endPage; i++) {
            if (i == cp) {
              pageGroupStr +=
                '<span class="active" id="end_pagenum">' + i + "</span>";
            } else {
              pageGroupStr += '<span id="end_pagenum">' + i + "</span>";
            }
          }
          $pageGroup.html(pageGroupStr);
          $pageGroup.append('<span id="end_next">&raquo;</span>');
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
  //경매 종료인 목록 띄우기 페이징 END

  let url = backUrl + "auction/inglist";

  //경매 중 갯수 요청 작업 Start
  showAuctionIng(url);
  //경매 중 갯수 요청 작업 END

  //페이징버전 경매 종료 START
  url = backUrl + "auction/list/end/";
  showEndPaging(url, 1);
  //페이징버전 경매 종료 END

  //경매 진행 중 클릭 시 START
  $("div.ing_tab").click(() => {
    location.href = frontUrl + "mypageIngList.html";
  });
  //경매 진행 중 클릭 시 END

  //경매 종료된 목록 click시 이벤트 페이징 버전 START
  $("div.end_tab").click(() => {
    url = backUrl + "auction/list/end/";
    showEndPaging(url, 1);
  });
  //ajax 함수 끝
  //경매 종료된 목록 페이징 띄우기 END

  //--결제하기 버튼 클릭시 START
  $(document).on("click", "input.buy", (e) => {
    let anum = $(e.target).attr("data-name");
    let pnum = $(e.target).attr("data-num");
    let mnum = $(e.target).attr("data-mem");
    let aprice = $(e.target).attr("data-price");
    console.log(anum);
    location.href =
      frontUrl +
      "orderadd.html?" +
      pnum +
      "&" +
      mnum +
      "&" +
      anum +
      "&" +
      aprice;
  });
  //--결제하기 버튼 클릭시 END

  //--취소 버튼 클릭시 START--
  $(document).on("click", "input.cancel", (e) => {
    let anum = $(e.target).attr("data-name");
    let pnum = $(e.target).attr("data-num");
    let mnum = $(e.target).attr("data-mem");

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + "award/delete",
      method: "post",
      contentType: "application/json",
      data: JSON.stringify({
        anum: anum,
        pnum: pnum,
        mnum: mnum,
      }),
      success: function (result) {
        alert(result.msg);
      },
      error: function (xhr) {
        console.log(xhr.status);
      },
    });
  });
  //--취소 버튼 클릭시 END--

  // -- 페이지 버튼 이벤트 모음 경매 종료용 START --
  //페이지 번호가 클릭되었을 때 할 일 START//
  $("div.end_pagination").on("click", "span#end_pagenum:not(.current)", (e) => {
    url = backUrl + "auction/list/end/";
    e.preventDefault();
    let $page = $(e.target).text();
    let $activePageNumber = $("#end_pagenum.active");
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    $(e.target).addClass("active");
    showEndPaging(url, $page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 END --
  // -- 페이지 다음 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#end_next", (e) => {
    url = backUrl + "auction/list/end/";
    e.preventDefault();
    let $pagecount = Number($("div.end_pagecount").text());
    let $cp = Number($("#end_pagenum.active").text());
    let $activePageNumber = $("#end_pagenum.active");
    if ($pagecount == $cp) {
      alert("마지막 목록 입니다.");
      return;
    }
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    showEndPaging(url, $cp + 1);
  });
  // -- 페이지 다음 버튼을 클릭했을 때 할일 END--
  // -- 페이지 이전 버튼을 클릭했을 때 할일 START--
  $(document).on("click", "span#end_prev", (e) => {
    url = backUrl + "auction/list/end/";
    e.preventDefault();
    let $cp = Number($("#end_pagenum.active").text()); //현재 페이지
    let $activePageNumber = $("#end_pagenum.active");
    if ($cp == 1) {
      alert("첫번째 목록 입니다.");
      return;
    }
    if ($activePageNumber) {
      $activePageNumber.removeClass("active");
    }
    showEndPaging(url, $cp - 1);
  });
  // -- 페이지 이전 버튼을 클릭했을 때 할일 END--
  // -- 페이지 버튼 이벤트 모음 경매 종료용 START --

  //-- shop 으로 이동 START --
  $("button#shop").click(() => {
    location.href = frontUrl + "shoplist.html";
  });
  //-- shop 으로 이동 END --

  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 3일 setting START--
  let date = new Date(); //시스템상 오늘 날짜

  let date3 = new Date();
  date3 = new Date(date3.setDate(date3.getDate() - 60)); //시스템 날짜 기준 2개월 전

  $now = date.toISOString().slice(0, 10);

  $now3 = date3.toISOString().slice(0, 10);

  $("input#start_end_day").val($now3);
  $("input#end_end_day").val($now);
  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 60일 setting END--

  //--end 페이지 달력 좌측, 우측 min max 설정 START--
  date = new Date();
  date = new Date(date.setDate(date.getDate() - 180));
  $now2 = date.toISOString().slice(0, 10);
  $("input#start_end_day").attr("min", $now2);
  $("input#start_end_day").attr("max", $now);
  $("input#end_end_day").attr("min", $now2);
  $("input#end_end_day").attr("max", $now);
  //--end 페이지 달력 좌측, 우측 min max 설정 END--

  //--최근 2개월 버튼 클릭 event START--
  $(document).on("click", "input#2months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 60)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input#start_end_day").val($now2);
    $("input#end_end_day").val($now);
  });
  //--최근 2개월 버튼 클릭 event END--

  //--최근 4개월 버튼 클릭 event START--
  $(document).on("click", "input#4months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 120)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input#start_end_day").val($now2);
    $("input#end_end_day").val($now);
  });
  //--최근 4개월 버튼 클릭 event END--

  //--최근 6개월 버튼 클릭 event START--
  $(document).on("click", "input#6months", (e) => {
    let date = new Date(); //시스템상 오늘 날짜
    let date2 = new Date();
    date2 = new Date(date2.setDate(date2.getDate() - 180)); //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10);
    $now2 = date2.toISOString().slice(0, 10);
    $("input#start_end_day").val($now2);
    $("input#end_end_day").val($now);
  });
  //--최근 6개월 버튼 클릭 event END--

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
