$(() => {
  let checkType = location.search.split('?')[1];

  $('#summernote').summernote({
    width: 1016,
    height: 400, // 에디터 높이
    minHeight: 300, // 최소 높이
    maxHeight: null, // 최대 높이
    focus: false, // 에디터 로딩후 포커스를 맞출지 여부
    lang: 'ko-KR', // 한글 설정
    placeholder: '최대 2048자까지 쓸 수 있습니다', //placeholder 설정
    toolbar: [
      // [groupName, [list of button]]
      ['fontname', ['fontname']],
      ['fontsize', ['fontsize']],
      ['style', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
      ['color', ['forecolor', 'color']],
      ['table', ['table']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['height', ['height']],
      ['insert', ['picture', 'link']],
      ['view', ['help']],
    ],
    fontNames: [
      'Arial',
      'Arial Black',
      'Comic Sans MS',
      'Courier New',
      '맑은 고딕',
      '궁서',
      '굴림체',
      '굴림',
      '돋움체',
      '바탕체',
    ],
    fontSizes: [
      '8',
      '9',
      '10',
      '11',
      '12',
      '14',
      '16',
      '18',
      '20',
      '22',
      '24',
      '28',
      '30',
      '36',
      '50',
      '72',
    ],
  });

  $('#ok_btn').click(function () {
    let jsonObj = {};
    jsonObj.title = $('.title').val();
    jsonObj.category = num;
    jsonObj.content = $('#summernote').summernote('code');

    let $form = $('#form_data');
    let testData = new FormData($form[0]);

    let jsonTextStr = JSON.stringify(jsonObj); // json str 만들기
    const blob = new Blob([jsonTextStr], { type: 'application/json' });
    testData.append('param', blob);

    $.ajax({
      data: testData,
      type: 'POST',
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + 'notice/write',
      contentType: false,
      mimeType: 'multipart/form-data',
      processData: false,
      success: function (data) {
        alert('작성됨');
        $('#popup_background').hide();
        $('#popup').hide();
        location.href = './noticelist.html?' + checkType;
      },
    });
    return false;
  });

  let num = null;
  $('.filter').click(function (e) {
    $('a[class=filter]').removeAttr('name');
    $(e.target).attr('name', 'checked');
    num = $(e.target).attr('id').split('_')[1];
  });

  //-- 작성 취소 버튼 클릭시 start --

  $('.cancle').click(function (e) {
    location.href = './noticelist.html?' + checkType;
  });

  $('#cancle_btn').click(function () {
    $('#popup_background').hide();
    $('#popup').hide();
    $('body').css({ overflow: '', height: '' });
  });
  //-- 작성 취소 버튼 클릭시 end --

  //-- 작성 완료 클릭시 start --
  $('.write').click(function (e) {
    e.preventDefault();
    $('body').css({ overflow: 'hidden', height: '100%' });

    $('#popup_background').show();
    $('#popup').show();
  });
  //-- 작성 완료 클릭시 end --

  //-- modal 취소 클릭시 start --
  $('#cancle_btn').click(function () {
    $('#popup_background').hide();
    $('#popup').hide();
    $('body').css({ overflow: '', height: '' });
  });
  //-- modal 취소 클릭시 end --
});
