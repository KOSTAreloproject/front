$(() => {
  // let page = 1;
  // $('.pagination a').on('click', function(e) {
  //   e.preventDefault();
  //   $('.pagination a.active').removeClass('active');
  //   $(this).addClass('active');
  //   page = $('.pagination a.active').text();
  // });

  //페이지 번호가 클릭되었을 때 할 일 START//
  $('div.pagination').on('click', 'span#pagenum:not(.current)', (e) => {
    e.preventDefault();
    let $page = $(e.target).text();
    let $activePageNumber = $('#pagenum.active');
    if ($activePageNumber) {
      $activePageNumber.removeClass('active');
    }
    $(e.target).addClass('active');
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
    showList(url, $cp - 1);
  });
  // -- 페이지 이전 버튼을 클릭했을 때 할일 END--

  let url = backUrl + "stock/listBySstatus/"
  showList(url,1)

function showList (url,page){
  let $origin = $('div.stock').first();
    $('div.stock').not(':first-child').remove();
    $origin.show();
    
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: url + page,
    method: "get",
    data: { sStatus: 3 },
    success: function (jsonStr) {
      let $origin = $("div.stock").first();
      let $parent = $("div.StockList");
      let totalPage = jsonStr.totalPageNum;
      console.log(totalPage)
      let totalCount = jsonStr.list.length
      console.log(totalCount)
      $(jsonStr.list).each((index, s) => {
        let sizeCategoryName = s.sizeCategoryName;
        let sName = s.sname;
        let sColor = s.scolor;
        let sNum = s.snum;
        
        let $copy = $origin.clone();

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
        $copy.find("div.sizeCategoryName").html("사이즈: " + sizeCategoryName);
        $copy.find("div.sName").html("상품명: " + sName);
        $copy.find("div.sColor").html("색상: " + sColor);
        $parent.append($copy);
      });
      $origin.hide();

      $('div.pagecount').html(totalPage);
        let $pageGroup = $('div.pagination');
        let pageGroupStr = '';
        let startPage = page;
        let endPage = totalCount;
        if (startPage > 1) {
          pageGroupstr += '<span id="pagenum"' + (startPage - 1) + '"></span>';
        }
        if (endPage > totalPage) {
          endPage = totalPage;
        }
        pageGroupStr += '<span id="prev">&laquo;</span>';
        for (let i = startPage; i <= totalPage; i++) {
          if (i == page) {
            pageGroupStr +=
              '<span class="active" id="pagenum">' + i + '</span>';
          } else {
            pageGroupStr += '<span id="pagenum">' + i + '</span>';
          }
        }
        // if (endPage < totalPage) {
        //   pageGroupStr += '<span id="pagenum"' + (endPage + 1) + '></span>';
        // }
        $pageGroup.html(pageGroupStr);
        $pageGroup.append('<span id="next">&raquo;</span>');
    },
    error: function (xhr) {
      if (xhr.responseJSON.msg === "로그인하세요") {
        location.href = "./login.html";
      }
      $("div.head_menu").hide();
      $("div.stock").hide();
      $("div.StockList").append(
        "<div class='empty'>" + xhr.responseJSON.msg + "</div>"
      );
    },
  });
}
  //--상세보기 클릭되었을 때 할일 START--
  $("div.StockList").on("click", ".detail", function (e) {
    let sNum = $(e.target).parents("div.stock").find("div.sNum").html();
    location.href = "./adminProductDetail.html?sNum=" + sNum;
  });
  //--상세보기 클릭되었을 때 할일 END--



});
