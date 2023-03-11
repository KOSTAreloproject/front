$(() => {
  showProductstart()
  showProductEnd()
  
  //페이지 번호가 클릭되었을 때 할 일 START//
$('div.pagination').on('click', 'span#pagenum:not(.current)', (e) => {
  e.preventDefault();
  let $page = $(e.target).text();
  let $activePageNumber = $('#pagenum.active');
  if ($activePageNumber) {
    $activePageNumber.removeClass('active');
  }
  $(e.target).addClass('active');
  $(window).scrollTop(0);
  showList(url, $page);
});
// -- 페이지 번호가 클릭되었을 때 할 일 END --
// -- 페이지 다음 버튼을 클릭했을 때 할일 START--
$(document).on('click', 'span#next', (e) => {
  e.preventDefault();
  let $pagecount = Number($('div.pagecount').text());
  let $cp = Number($('#pagenum.active').text());
  let $activePageNumber = $('#pagenum.active');
  if ($pagecount == $cp) {
    alert('마지막 목록 입니다.');
    return;
  }
  if ($activePageNumber) {
    $activePageNumber.removeClass('active');
  }
  $(window).scrollTop(0);
  showList(url, $cp + 1);
});
// -- 페이지 다음 버튼을 클릭했을 때 할일 END--
// -- 페이지 이전 버튼을 클릭했을 때 할일 START--
$(document).on('click', 'span#prev', (e) => {
  e.preventDefault();
  let $cp = Number($('#pagenum.active').text()); //현재 페이지
  let $activePageNumber = $('#pagenum.active');
  if ($cp == 1) {
    alert('첫번째 목록 입니다.');
    return;
  }
  if ($activePageNumber) {
    $activePageNumber.removeClass('active');
  }
  $(window).scrollTop(0);
  showList(url, $cp - 1);
});
// -- 페이지 이전 버튼을 클릭했을 때 할일 END--

let url = backUrl + "product/listById/";
showList(url,1)

function showList (url,cp){
  let $origin = $('div.desc').first();
  $('div.desc').not(':first-child').remove();
  $origin.show();

  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url + cp,
    method: "GET",
    success: function (jsonStr) {
      let totalPage = jsonStr.totalPageNum;
      $("div.count_ing").html(jsonStr.totalCount);
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

      $("div.pagecount").html(totalPage);
      let $pageGroup = $("div.pagination");
      let pageGroupStr = "";
      let cntPerPage = 5;
      let startPage = parseInt((cp-1) / cntPerPage) * cntPerPage + 1;
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
        "<div class='empty'>" + xhr.responseJSON.msg + "</div>"
      );
    },
  });
}
  

  //--상세보기 클릭되었을 때 할일 START--
  $("div.list_area").on("click", "div.desc", function (e) {
    let pStatus = $(e.target).parents("div.desc").find("div.pStatus").html();
    let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
    location.href = "./inventory2Detail.html?pNum=" + pNum;
  });
  //--상세보기 클릭되었을 때 할일 END--

   //판매입찰 개수 세기 START 
   function showProductstart() {
    $.ajax({
      url: backUrl + "stock/listById/1",
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {

          $("div.count_start").html(jsonObj.totalCount);
      },
      error: function (xhr) {
        $("div.count_start").html("0");
      },
    });
  }
  //판매입찰 개수 세기 END

  //종료 개수 세기 START 
  function showProductEnd() {
    $.ajax({
      url: backUrl +"product/EndListById/1",
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {
  
          $("div.count_end").html(jsonObj.totalCount);
      },
      error: function (xhr) {
        $("div.count_end").html("0");
      },
    });
  }
  //종료 개수 세기 END

});
