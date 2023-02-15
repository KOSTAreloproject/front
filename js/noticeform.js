$(() => {
  //-- content 작성시 textarea, form 크기 자동 조절 start --
  // $('textarea').on('keyup', function (e) {
  //   $(this).css('height', 'auto');
  //   $(this).height(this.scrollHeight - 15);
  //   $('.form_itmes').css('height', 'auto');
  //   $('.form_itmes').height($('.form_itmes').scrollHeight + 10);
  // });
  //-- content 작성시 textarea, form 크기 자동 조절 end --

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
    location.href = './noticelist.html';
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

  // -- 카테고리 하나만 선택 start --
  $('.filter').each(function () {
    $(this).click(function () {
      $(this).attr('id', 'selected');
      $(this).siblings().removeAttr('id', 'selected');
    });
  });
  // -- 카테고리 하나만 선택 end --
});
