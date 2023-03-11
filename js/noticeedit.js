$(() => {
  let nNum = window.location.search.split('?')[1];
  let arr = ['서비스', '작업', '업데이트', '이벤트'];

  // 제목 및 카테고리 번호, 이전글, 다음글에 대한 정보 불러오기
  $.ajax({
    url: backUrl + 'notice/detail/' + nNum,
    xhrFields: {
      withCredentials: true,
    },
    method: 'get',
    success: function (jsonObj) {
      console.log(jsonObj);
      let notice = jsonObj.dto;

      $('.title').val(notice.ntitle);
      $('#idx_' + notice.ncategory).attr('name', 'checked');

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
        },
      });
    },
  });

  let num = null;
  $('.filter').click(function (e) {
    $('a[class=filter]').removeAttr('name');
    $(e.target).attr('name', 'checked');
    num = $(e.target).attr('id').split('_')[1];
  });

  $('.write').click(function (e) {
    e.preventDefault();
    $('#popup_background').show();
    $('#popup').show();
  });

  $('#cancle_btn').click(function (e) {
    e.preventDefault();
    $('#popup_background').hide();
    $('#popup').hide();
  });

  $('#ok_btn').click(function () {
    let $form = $('#form_data');
    let testData = new FormData($form[0]);

    let jsonObj = {};
    jsonObj.title = $('.title').val();
    if (num == null) {
      let checked = $('.filter').attr('name', 'checked');
      num = checked.attr('id').split('_')[1];
    }
    jsonObj.category = num;
    jsonObj.content = $('#summernote').summernote('code');

    let jsonTextStr = JSON.stringify(jsonObj); // json str 만들기
    const blob = new Blob([jsonTextStr], { type: 'application/json' });
    testData.append('param', blob);

    $.ajax({
      data: testData,
      type: 'post',
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + 'notice/' + nNum,
      contentType: false,
      mimeType: 'multipart/form-data',
      processData: false,
      success: function (data) {
        alert('수정됨');
        location.href = './noticelist.html';
      },
    });
    return false;
  });
});
