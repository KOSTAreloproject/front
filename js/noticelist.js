$(() => {
  let arr = ['서비스', '작업', '업데이트', '이벤트'];
  function showList(url, page) {
    let $origin = $('div.title').first();

    $('div.title').not(':first-child').remove();
    $origin.show();
    $.ajax({
      url: url + '/' + page,
      xhrFields: {
        withCredentials: true,
      },
      method: 'get',
      success: function (jsonObj) {
        let list = jsonObj.collect;
        console.log(jsonObj);
        let totalPage = jsonObj.totalPage;

        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(list).each((index, n) => {
          let nTitle = n.ntitle;
          let nCategory = n.ncategory;
          let nNum = n.nnum;
          let $copy = $origin.clone();

          let str = '[' + arr[nCategory] + ']' + ' ' + nTitle;

          $copy.find('div.category_and_title').html(str);
          $copy.find('div.category_and_title').attr('id', 'nNum_' + nNum);
          $parent.append($copy);
        });
        $origin.hide();

        let $pageGroup = $('div.pagegroup');
        let pageGroupStr = '';

        let startPage = page;
        let endPage = list.length;

        if (startPage > 1) {
          pageGroupStr += '<span class="' + (startPage - 1) + '">></span>';
        }
        if (endPage > totalPage) {
          endPage = totalPage;
        }

        for (let i = startPage; i <= totalPage; i++) {
          if (i == page) {
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
      },
      error: function (xhr) {
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
      },
    });
  }

  let url = backUrl + 'notice';

  // -- 공지사항목록 요청 start --
  showList(url, 1);
  // -- 공지사항목록 요청 end --

  // -- 페이지 번호가 클릭되었을 때 할 일 start --
  $('div.pagegroup').on('click', 'span:not(.current)', (e) => {
    let page = $(e.target).attr('class');
    showList(url, page);
  });
  // -- 페이지 번호가 클릭되었을 때 할 일 end --

  // -- 공지사항 클릭되었을 때 할 일 start --
  $('div.titlelist').on('click', 'div.title', (e) => {
    let nNum = $(e.target)
      .parents('div.title')
      .find('div.category_and_title')
      .attr('id')
      .split('_')[1];

    location.href = './noticedetail.html?' + nNum;
  });
  // -- 공지사항 클릭되었을 때 할 일 end --

  // -- 제목으로 검색 start --
  $('#search_btn').click(function () {
    let $origin = $('div.title').first();
    $('div.title').not(':first-child').remove();
    $origin.show();

    let search_val = $('.search_box').val();
    $.ajax({
      url: backUrl + 'notice/title/' + search_val,
      xhrFields: {
        withCredentials: true,
      },
      success: function (jsonObj) {
        let list = jsonObj.collect;
        console.log(jsonObj);
        let totalPage = jsonObj.totalPage;
        let currentPage = jsonObj.currentPage;

        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(list).each((index, n) => {
          let nTitle = n.ntitle;
          let nCategory = n.ncategory;
          let nNum = n.nnum;
          let $copy = $origin.clone();

          let str = '[' + arr[nCategory] + ']' + ' ' + nTitle;

          $copy.find('div.category_and_title').html(str);
          $copy.find('div.category_and_title').attr('id', 'nNum_' + nNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        // alert(xhr.status);
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
      },
    });
  });
  // -- 제목으로 검색 end --

  // -- 카테고리 start --
  $('.filter').click(function (e) {
    let idx = $(e.target).attr('id').substring(4);

    if (idx == 4) {
      let url = backUrl + 'notice';

      // -- 공지사항목록 요청 start --
      showList(url, 1);
      // -- 공지사항목록 요청 end --
      return;
    }
    $.ajax({
      url: backUrl + 'notice/category/' + idx,
      xhrFields: {
        withCredentials: true,
      },
      success: function (jsonObj) {
        let list = jsonObj.collect;
        console.log(jsonObj);
        let totalPage = jsonObj.totalPage;
        let currentPage = jsonObj.currentPage;

        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(list).each((index, n) => {
          let nTitle = n.ntitle;
          let nCategory = n.ncategory;
          let nNum = n.nnum;
          let $copy = $origin.clone();

          let str = '[' + arr[nCategory] + ']' + ' ' + nTitle;

          $copy.find('div.category_and_title').html(str);
          $copy.find('div.category_and_title').attr('id', 'nNum_' + nNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        // alert(xhr.status);
        let jsonObj = JSON.parse(xhr.responseText);
        alert(jsonObj.msg);
      },
    });
  });
  // -- 카테고리 end --

  // -- 엔터 누르면 검색 버튼 클릭됨 start --
  $('.search_box').keyup(function (e) {
    if (e.which === 13) {
      $('#search_btn').click();
    }
  });
  // -- 엔터 누르면 검색 버튼 클릭됨 end --
});
