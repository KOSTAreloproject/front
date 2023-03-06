$(() => {
  let data = location.search.substring(1);
  let styleNum = data.split("=")[1];
  let url = backUrl+"style/update/"+styleNum;
  let link = "./stylelist.html";
  let styleContent='';
  //--게시판 내용 보여주기 START--
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: backUrl+"style/detail/"+styleNum,
    method: "get",
    data: data,
    success: function (jsonObj) {
      let style = jsonObj.style;
      let tagList = style.tagList;
      $(tagList).each((index, o) => {
        let hashName = o.ste.hashName;
        console.log(hashName);
        styleContent += '#'+hashName+' ';
      });
      $("#styleContent").val(styleContent);
      imgShow(styleNum);
    },
    error: function (jsonObj) {
      alert(jsonObj.responseJSON.msg);
    },
  });
  //--게시판 내용 보여주기 END--  
  //--이미지 띄우기 START--
    function imgShow(num){
       $.ajax({
        xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'style/list/img/'+num,
      method: "get",
      success: function (result) {
      let blobStr = URL.createObjectURL(result);
      $("div>div.show>img").attr("src", blobStr);
    },
    error: function (jsonObj) {
      alert(jsonObj.responseJSON.msg);
    },
  });
}
//--이미지 띄우기 END--

  $("div.form>div>form>input[type=file]").change((e) => {
    let imageFileObj = e.target.files[0];
    console.log(imageFileObj);
    // blob타입의 이미지 파일 객체 내용을 문자열로 변환
    let blobStr = URL.createObjectURL(imageFileObj);
    $("div>div.show>img").attr("src", blobStr);
  });

  //--게시물 수정 버튼 클릭 START--
  $('#write').click(function() {
    let $form = $("div>div.form>div>form");
    let formData = new FormData($form[0]);
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
        location.href = ("./styleinfo.html?styleNum=" + styleNum);
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
    // location.href = "./styleinfo.html?styleNum=" + styleNum;
    return false;
  })
  //--게시물 수정 버튼 클릭 END--
  //--게시물 삭제 버튼 클릭 START--
    $('#delete').click(function(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl+"style/"+styleNum,
      method: "delete",
      success: function (jsonObj) {
        alert("삭제되었습니다.");
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
    location.href = link;
    return false;
  })
  //--게시물 삭제 버튼 클릭 END--
  //--게시물 취소 버튼 클릭 START--
  document.getElementById("myBtn3").onclick = function () {
    cancel();
  };
  function cancel() {
    location.href = "./styleinfo.html?styleNum=" + styleNum;
  }
});
