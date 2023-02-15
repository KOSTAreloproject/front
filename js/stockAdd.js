$(() => {
  //--StockAdd폼 서브밋 되었을 때 할 일 START--
  let $form = $("section>div.StockAdd>form");
  $form.submit((e) => {
    let url = backUrl + "/stock/add.do";
    let formData = new FormData($form[0]);
    // formData.forEach((value, key) => {
    //   console.log(key);
    //   console.log(value);
    //   console.log("------");
    // });
    $.ajax({
      url: url,
      method: "post", //파일 업로드용 설정
      data: formData, //파일 업로드용 설정
      processData: false, //파일 업로드용 설정
      contentType: false, //파일 업로드용 설정
      success: function () {
        location.href = frontUrl + "StockAdd2.html";
      },
      error: function (xhr) {
        alert("오류" + xhr.status);
      },
    });
    return false;
  });
  //--StockAdd폼 서브밋 되었을 때 할 일 END--
});