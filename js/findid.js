$(() => {
  // -- 폼 서브밋되었을 때 할 일 start --
  // let url = backUrl + 'member/idOrPwdFind.do';
  // $('#findid').click(() => {
  //   let $mName = $('#val1').val();
  //   let $email = $('#val2').val();
  //   let $flag = $('#flagid').val();
  //   $.ajax({
  //     url: url,
  //     method: 'post',
  //     data: {
  //       mName: $mName,
  //       email: $email,
  //       flag: $flag,
  //     },
  //     success: function (jsonObj) {
  //       console.log(jsonObj);
  //       $('#modal').show();
  //       if (jsonObj.id == undefined) {
  //         // $('div#modal>p').html(jsonObj);
  //         alert(jsonObj);
  //       } else {
  //         // $('div#modal>p').html(jsonObj.id);
  //         alert(jsonObj.id);
  //       }
  //     },
  //     error: function (xhr) {
  //       $('div#modal>p').html('오류' + xhr.status);
  //     },
  //   });
  //   return false;
  // });
  // // -- 폼 서브밋되었을 때 할 일 end --
  // $('#findpwd').click(() => {
  //   let $id = $('#val3').val();
  //   let $email = $('#val4').val();
  //   let $flag = $('#flagpwd').val();
  //   $.ajax({
  //     url: url,
  //     method: 'post',
  //     data: {
  //       id: $id,
  //       email: $email,
  //       flag: $flag,
  //     },
  //     success: function (jsonObj) {
  //       console.log(jsonObj);
  //       $('#modal').show();
  //       if (jsonObj.pwd == undefined) {
  //         //$('div#modal>p').html(jsonObj);
  //         alert(jsonObj);
  //       } else {
  //         // $('div#modal>p').html(jsonObj.pwd);
  //         alert(jsonObj.pwd);
  //       }
  //     },
  //     error: function (xhr) {
  //       $('div#modal>p').html('오류' + xhr.status);
  //     },
  //   });
  //   return false;
  // });

  $('#popup_background').hide();
  $('#popup').hide();
  $('.alert-box').hide();

  $('#popup_background').click(function (e) {
    if (!$('#popup').has(e.target).length) {
      $('#popup').hide();
      $(this).hide();
    }
  });
});
