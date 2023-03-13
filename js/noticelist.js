$(() => {
  let checkType = location.search.split('?')[1];
  if (checkType == 1) {
    $('#notice_write').show();
    $('#notice_write').attr('href', './noticeform.html?' + checkType);
  } else {
    $('#notice_write').hide();
  }

  let arr = ['서비스', '작업', '업데이트', '이벤트'];
  function showList(url, cp) {
    $(window).scrollTop(0);
    let $origin = $('div.title').first();

    $('div.title').not(':first-child').remove();
    $origin.show();
    $.ajax({
      url: url + '/' + cp,
      xhrFields: {
        withCredentials: true,
      },
      method: 'get',
      success: function (jsonObj) {
        let list = jsonObj.collect;
        let totalPage = jsonObj.totalPage;
        let totalCount = list.length;

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

        $('div.pagecount').html(totalPage);
        let $pageGroup = $('div.pagination');
        let pageGroupStr = '';
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
              '<span class="active" id="pagenum">' + i + '</span>';
          } else {
            pageGroupStr += '<span id="pagenum">' + i + '</span>';
          }
        }
        $pageGroup.html(pageGroupStr);
        $pageGroup.append('<span id="next">&raquo;</span>');
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

  // -- 공지사항 클릭되었을 때 할 일 start --
  $('div.titlelist').on('click', 'div.title', (e) => {
    let nNum = $(e.target)
      .parents('div.title')
      .find('div.category_and_title')
      .attr('id')
      .split('_')[1];

    location.href = './noticedetail.html?' + nNum + '&' + checkType;
  });
  // -- 공지사항 클릭되었을 때 할 일 end --

  // -- 제목으로 검색 start --
  $('#search_btn').click(function () {
    $('.center').hide();

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
        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(jsonObj).each((index, n) => {
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
    $('.center').hide();

    let $origin = $('div.title').first();
    $('div.title').not(':first-child').remove();
    $origin.show();

    $('a[class=filter]').removeAttr('name');
    $(e.target).attr('name', 'checked');

    let idx = $(e.target).attr('id').substring(4);

    if (idx == 4) {
      let url = backUrl + 'notice';
      // -- 공지사항목록 요청 start --
      showList(url, 1);
      // -- 공지사항목록 요청 end --
      $('.center').show();
      return;
    }
    $.ajax({
      url: backUrl + 'notice/category/' + idx,
      xhrFields: {
        withCredentials: true,
      },
      success: function (jsonObj) {
        let $origin = $('div.title').first();
        let $parent = $('div.titlelist');
        $(jsonObj).each((index, n) => {
          let nTitle = n.ntitle;
          let nCategory = n.ncategory;
          let nNum = n.nnum;
          let $copy = $origin.clone();

          let str = '[' + arr[nCategory] + ']' + ' ' + nTitle;

          $copy.find('.category_and_title').html(str);
          $copy.find('.category_and_title').attr('id', 'nNum_' + nNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
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
