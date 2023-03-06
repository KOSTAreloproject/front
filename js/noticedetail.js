$(() => {
  let nNum = window.location.search.split('?')[1];
  $.ajax({
    url: backUrl + 'notice/detail/' + nNum,
    xhrFields: {
      withCredentials: true,
    },
    method: 'get',
    success: function (jsonObj) {
      console.log(jsonObj.n);
      let notice = jsonObj.n;
      // $('div.title').html('제목: ' + notice.ntitle);
      // $('div.title').attr('id', notice.nnum);
      // $('div.date').html('작성일: ' + notice.ndate);
      // $('div.content').html('내용: ' + notice.ncontent);
      console.log(jsonObj.nPre);
      //   let pre = jsonObj.nPre;
      //   if (pre.nnum != 0) {
      //     $('div.prenum').html(pre.nnum);
      //     $('div.pretitle').html('이전글 제목: ' + pre.ntitle);
      //   }

      //   console.log(jsonObj.nNext);
      //   let next = jsonObj.nNext;

      //   if (next.nnum != 0) {
      //     $('div.nextnum').html(next.nnum);
      //     $('div.nexttitle').html('다음글 제목: ' + next.ntitle);
      //   }
    },
  });
  $('div.pre').on('click', 'div.pretitle', (e) => {
    let num = $('div.pre').find('div.prenum').html();
    location.href = './noticedetail.html?nNum=' + num;
  });

  $('div.next').on('click', 'div.nexttitle', (e) => {
    let num = $('div.next').find('div.nextnum').html();
    location.href = './noticedetail.html?nNum=' + num;
  });

  // -- 수정 버튼 클릭시 할 일 start --
  $('#editBtn').click(function () {
    location.href = './noticeform.html';
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
    });
  });
  // -- 삭제 버튼 클릭시 할 일 end --
});
