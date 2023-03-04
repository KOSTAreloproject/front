$(() => {
  let val = location.search.substring(4);
  $('#notice_txt').html(val);

  $('#login').click(function () {
    location.replace('./login.html');
  });

  $('#find_id').click(function () {
    location.replace('./findid.html');
  });
});
