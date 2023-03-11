$(() => {
  $("div#popup_background").hide();
  showProductstart()
  showProductIng()
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

let url = backUrl + "product/EndListById/";
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
      $("div.count_end").html(jsonStr.totalCount);
      let totalPage = jsonStr.totalPageNum;
      let $parent = $("div.list_area");
      $(jsonStr.list).each((index, p) => {
        let sizeCategoryName = p.sizeCategoryName;
        let sName = p.sname;
        let pStatus = p.pstatus;
        let pNum = p.pnum;
        let sBrand = p.sbrand;
        let sNum = p.snum;
        let pEndDate = p.pEndDate;
  
        let $copy = $origin.clone();
  
        if (pStatus == 8) {
          pStatus = "유찰";
        } else if (pStatus == 6) {
          pStatus = "낙찰";
        } else if (pStatus == 7) {
          pStatus = "정산중";
        } else if (pStatus == 9){
          pStatus = "판매완료";
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
        $copy.find("div.sBrand").html(sBrand);
        $copy.find("div.sFile").empty().append($imgObj);
        $copy.find("div.sName").html(sName);
        $copy.find("div.pEndDate").html(pEndDate);
        $copy.find("div.sizeCategoryName").html(sizeCategoryName);
        $copy.find("div.pStatus").html(pStatus);
        $copy.find("div.sNum").html(sNum);
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
      console.log(xhr)
      if (xhr.responseJSON.msg === "로그인 하세요") {
        location.href = "./login.html";
      }
      $("div.head_menu").hide();
      $("div.desc").hide();
      $("div.list_area").append(
        "<div class='empty'>" + "종료된 상품이 없습니다" + "</div>"
      );
    },
  });
}
 

  //--상세보기 클릭되었을 때 할일 START--
  $("div.list_area").on("click", "div.desc", function (e) {
    let pStatus = $(e.target).parents("div.desc").find("div.pStatus").html();
    if (pStatus == "낙찰") {
      $("div#popup_background").show();
      $("p#ask").html("낙찰자가 상품을 결제해야 합니다");
      // let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
      // location.href = "./inventory3Detail.html?pNum=" + pNum;
    } else if (pStatus == "정산중") {
      $("div#popup_background").show();
      $("p#ask").html("상품이 정산중입니다");
    } else if (pStatus == "유찰"){
      $("div#popup_background").show();
      $("button#no_btn").show();
      $("button#re_btn").show();
      $("#ok_btn").hide();
      $("p#ask").html("상품을 재등록 하시겠습니까?");
    }else if (pStatus == "판매완료"){
      let pNum = $(e.target).parents("div.desc").find("div.pNum").html();
      location.href = "./inventory3Detail.html?pNum=" + pNum;
    }
  });
  //--상세보기 클릭되었을 때 할일 END--

  //--모달창 클릭되었을 때 할일 START--
  $("#ok_btn").click(function (e) {
    $("div#popup_background").hide();
  });

  $("button#re_btn").click(function (e) {
    $("div#popup_background").hide();
    let pNum = $("div:nth-child(2) > div.pNum").html();
    let sNum = $("div:nth-child(2) > div.item_areas > div.sNum").html();

    let url = backUrl + "product/delBypNum/"+pNum
    
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "DELETE",
      success: function (jsonStr) {
        location.href = "./reStock.html?sNum=" + sNum;
      },
      error: function (xhr) {
      },
    });
  });

  $("button#no_btn").click(function (e) {
    $("div#popup_background").hide();
    let pNum = $("div:nth-child(2) > div.pNum").html();
    let url = backUrl + "product/delBypNum/"+pNum

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "DELETE",
      success: function (jsonStr) {
        location.href = "./inventory3.html";
      },
      error: function (xhr) {
      },
    });
  });
  //--모달창 클릭되었을 때 할일 END--

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

      //진행중 개수 세기 START 
  function showProductIng() {
    $.ajax({
      url: backUrl + "product/listById/1",
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      success: function (jsonObj) {
          $("div.count_ing").html(jsonObj.totalCount);
      },
      error: function (xhr) {
        $("div.count_ing").html("0");
      },
    });
  }
  //진행중 개수 세기 END
});
