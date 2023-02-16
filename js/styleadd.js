$(() => {
  let url = backUrl+"/style/add.do";
  let link = "./stylelist.html";
  $("div.form>div>form>input[type=file]").change((e) => {
    let imageFileObj = e.target.files[0];
    console.log(imageFileObj);
    // blob타입의 이미지 파일 객체 내용을 문자열로 변환
    let blobStr = URL.createObjectURL(imageFileObj);
    $("div>div.show>img").attr("src", blobStr);
  });
  let $form = $("div>div.form>div>form");
  
  $form.submit((e) => {
    if (confirm("게시물을 작성하시겠습니까?") == false) {
    }
    let formData = new FormData($form[0]);
    console.log(formData);
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "post",
      data: formData,
      processData: false,
      contentType: false,
      success: function (jsonObj) {
        alert(jsonObj);
        // location.href ='./stylelist.html';
      },
      error: function (xhr) {
        alert("잘못 입력하셨습니다.");
      },
    });
    return false;
  });
  // $('#write').click(function(){
  //   let formData = new FormData($form[0]);
  //   console.log(formData)
  // })
  document.getElementById("del").onclick = function () {
    del();
  };
  function del() {
    location.href = "./stylelist.html";
  }
});
