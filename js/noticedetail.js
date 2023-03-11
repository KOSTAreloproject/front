$(() => {
  let rawNum = window.location.search.split('?')[1];
  let nNum = rawNum.split('&')[0];
  let checkType = rawNum.split('&')[1];
  if (checkType == 1) {
    $('#edit').show();
    $('#del').show();
  } else {
    $('#edit').hide();
    $('#del').hide();
  }

  let arr = ['서비스', '작업', '업데이트', '이벤트'];

  // 제목 및 카테고리 번호, 이전글, 다음글에 대한 정보 불러오기
  $.ajax({
    url: backUrl + 'notice/detail/' + nNum,
    xhrFields: {
      withCredentials: true,
    },
    method: 'get',
    success: function (jsonObj) {
      let notice = jsonObj.dto;
      let pre = jsonObj.pre;
      let next = jsonObj.next;

      $('.date').html(notice.ndate);
      $('.title').html('[' + arr[notice.ncategory] + '] ' + notice.ntitle);
      if (pre != undefined) {
        $('.pre_content').html(pre.ntitle);
        $('.pre_content').attr('id', 'n_' + pre.nnum);
      } else {
        $('.pre_content').html(jsonObj.msg);
        $('.pre_content').css('cursor', 'default');
      }

      if (next != undefined) {
        $('.next_content').html(next.ntitle);
        $('.next_content').attr('id', 'n_' + next.nnum);
      } else {
        $('.next_content').html(jsonObj.msg);
        $('.next_content').css('cursor', 'default');
      }
      // (내용) html 파일 불러오기
      $.ajax({
        url: backUrl + 'notice/contentfile/' + nNum,
        xhrFields: {
          withCredentials: true,
        },
        cache: false,
        dataType: 'html',
        success: function (result) {
          $('#summernote').summernote('code', result);
          $('#summernote').summernote('destroy');
        },
      });
    },
  });

  $('#pre_content').click(function () {
    if ($(this).attr('id') === undefined) {
      return false;
    } else {
      let num = $(this).attr('id').split('_')[1];
      location.href = './noticedetail.html?' + num;
    }
  });

  $('#next_content').click(function (e) {
    if ($(this).attr('id') === undefined) {
      return false;
    } else {
      let num = $(this).attr('id').split('_')[1];
      location.href = './noticedetail.html?' + num;
    }
  });

  // -- 수정 버튼 클릭시 할 일 start --
  $('#edit').click(function () {
    location.href = './noticeeditform.html?' + nNum;
  });
  // -- 수정 버튼 클릭시 할 일 end --

  // -- 삭제 버튼 클릭시 할 일 start --
  $('#del').click(function () {
    $.ajax({
      url: backUrl + 'notice/' + nNum,
      xhrFields: {
        withCredentials: true,
      },
      method: 'delete',
      success: function () {
        alert('삭제되었습니다.');
        location.href = './noticelist.html';
      },
      error: function () {
        alert('삭제 취소되었습니다.');
      },
    });
  });
  // -- 삭제 버튼 클릭시 할 일 end --
});
