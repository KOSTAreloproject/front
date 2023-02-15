$(() => {
  let arr = ['서비스', '작업', '업데이트', '이벤트'];
  function showList(url, page) {
    let $origin = $('div.title').first();

    $('div.title').not(':first-child').remove();
    $origin.show();
    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: 'get',
      data: 'currentPage=' + page,
      success: function (jsonObj) {
        let list = jsonObj.list;
        let totalPage = jsonObj.totalPage;
        let currentPage = jsonObj.currentPage;
        let startPage = jsonObj.startPage;
        let endPage = jsonObj.endPage;

        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(list).each((index, n) => {
          let nTitle = n.ntitle;
          let nCategory = n.ncategory;
          let $copy = $origin.clone();

          let str = '[' + arr[nCategory] + ']' + ' ' + nTitle;

          console.log(str);
          $copy.find('div.category_and_title').html(str);
          $parent.append($copy);
        });
        $origin.hide();

        let $pageGroup = $('div.pagegroup');
        let pageGroupStr = '';
        if (startPage > 1) {
          pageGroupStr += '<span class="' + (startPage - 1) + '">[PREV]</span>';
        }
        if (endPage > totalPage) {
          endPage = totalPage;
        }

        for (let i = startPage; i <= endPage; i++) {
          if (i == currentPage) {
            pageGroupStr +=
              '<span class="current ' +
              i +
              '">' +
              '&nbsp;&nbsp;' +
              i +
              '&nbsp;&nbsp;' +
              '</span>';
          } else {
            pageGroupStr +=
              '<span class="' +
              i +
              '">' +
              '&nbsp;&nbsp;' +
              i +
              '&nbsp;&nbsp;' +
              '</span>';
          }
        }

        if (endPage < totalPage) {
          pageGroupStr += '<span class="' + (endPage + 1) + '">[NEXT]</span>';
        }

        $pageGroup.html(pageGroupStr);
        // $pageGroup.html('<i class="fa-sharp fa-solid fa-chevron-right"></i>');
        // $pageGroup.html('<i class="fa-sharp fa-solid fa-chevrons-right"></i>');
      },
      error: function (xhr) {
        // alert(xhr.status);
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
      },
    });
  }

  let url = backUrl + 'notice/list.do';

  // -- 공지사항목록 요청 start --
  showList(url, 1);
  // -- 공지사항목록 요청 end --

  // -- 페이지 번호가 클릭되었을 때 할 일 start --
  $('div.pagegroup').on('click', 'span:not(.current)', (e) => {
    let page = $(e.target).attr('class');
    showList(url, page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 end --

  // -- 상품 클릭되었을 때 할 일 start --
  $('div.titlelist').on('click', 'div.title', (e) => {
    let prodNo = $(e.target).parents('div.title').find('div.prodNo').html();
    location.href = './productinfo.html?prodNo=' + prodNo;
  });
  // -- 상품 클릭되었을 때 할 일 end --
});
