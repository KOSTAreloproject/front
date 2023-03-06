$(() => {
  let url = backUrl+"style/write";
  let $form = $("div.form>div>form");
  let formData;

  //--이미지 미리보기 출력 START--
  $("div.form>div>form>input[type=file]").change((e) => {
    let imageFileObj = e.target.files[0];
    console.log(imageFileObj);
    // blob타입의 이미지 파일 객체 내용을 문자열로 변환
    let blobStr = URL.createObjectURL(imageFileObj);
    $("div>div.show>img").attr("src", blobStr);
  });
  //--이미지 미리보기 출력 END--
  
  //--작성하기 버튼 클릭 START--
  $(document).on("click", "input[class='write']", function (){
    formData = new FormData($form[0]);
  });
  //--작성하기 버튼 클릭 END--
  
  //--모달창에서 확인 버튼 클릭 START--
 $('#write_modal_btn').click(function(){
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
        location.href ='./stylelist.html';
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
     });
     return false;
    }); 
  //--모달창에서 확인 버튼 클릭 END--
  
  //--취소 버튼 클릭 START--
  document.getElementById("del").onclick = function () {
    del();
  };
  function del() {
    location.href = "./stylelist.html";
  }
  //--취소 버튼 클릭 END--
});
