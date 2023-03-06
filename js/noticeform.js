$(() => {
  $('#summernote').summernote({
    width: 1135,
    height: 400, // 에디터 높이
    minHeight: 300, // 최소 높이
    maxHeight: null, // 최대 높이
    focus: false, // 에디터 로딩후 포커스를 맞출지 여부
    lang: 'ko-KR', // 한글 설정
    callbacks: {
      onImageUpload: function (files, editor, welEditable) {
        // 파일 업로드(다중업로드를 위해 반복문 사용)
        for (var i = files.length - 1; i >= 0; i--) {
          uploadSummernoteImageFile(files[i], this);
        }
      },
    },
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

  function uploadSummernoteImageFile(file, el) {
    testData.append('f', file);
  }

  let $form = $('#form_data');
  let testData = new FormData($form[0]);
  $('.write').click(function () {
    let jsonObj = {};
    jsonObj.title = $('.title').val();
    jsonObj.category = num;
    jsonObj.content = $('#summernote').summernote('code');

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
        // $(el).summernote('editor.insertImage', data.url);
      },
    });
    return false;
  });
  // // 수정버튼
  // var edit = function () {
  //   a.summernote({ focus: true });
  // };

  // // 수정 종료
  // var save = function () {
  //   var markup = a.summernote('code');
  //   a.summernote('destroy');
  // };
  let num = null;
  $('.filter').click(function (e) {
    num = $(e.target).attr('id').split('_')[1];
  });

  // $('.write').click(function (e) {
  //   e.preventDefault();
  //   $('#popup_background').show();
  //   $('#popup').show();
  // });

  //-- 작성 취소 버튼 클릭시 start --

  $('#cancle').click(function (e) {
    e.preventDefault();
    $('body').css({ overflow: 'hidden', height: '100%' });

    $('#ask').css('font-size', '16px');
    $('#popup').css('height', '135px');
    $('#ask').html(
      '작성된 내용은 저장되지 않습니다.<br/>정말로 나가시겠습니까?'
    );
    $('#popup_background').show();
    $('#popup').show();
  });

  $('#ok_btn').click(function () {
    // location.href = './noticelist.html';
    $('#popup_background').hide();
    $('#popup').hide();
  });

  $('#cancle_btn').click(function () {
    $('#popup_background').hide();
    $('#popup').hide();
    $('body').css({ overflow: '', height: '' });
  });
  //-- 작성 취소 버튼 클릭시 end --

  //-- 작성 완료 클릭시 start --
  $('#write').click(function (e) {
    e.preventDefault();
    $('body').css({ overflow: 'hidden', height: '100%' });
    $('#ask').css('font-size', '17px');
    $('#popup').css('height', '120px');
    $('#ask').html('작성하시겠습니까?');
    $('#popup_background').show();
    $('#popup').show();
    $('body').css({ overflow: 'hidden', height: '100%' });
  });
  //-- 작성 완료 클릭시 end --

  $('#fake_btn').click(function () {
    $('.file').click();
  });

  //-- modal 취소 클릭시 start --
  $('#cancle_btn').click(function () {
    $('#popup_background').hide();
    $('#popup').hide();
    $('body').css({ overflow: '', height: '' });
  });
  //-- modal 취소 클릭시 end --
});
