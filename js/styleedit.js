$(() => {
  let url = backUrl+"/style/edit.do";
  let data = location.search.substring(1);
  let link = "./stylelist.html";
  let styleNum;
  let id;
  let originFile;
  //--게시판 내용 보여주기 START--
  $.ajax({
    xhrFields: {
      withCredentials: true,
    },
    url: backUrl+"/style/detail.do",
    method: "get",
    data: data,
    success: function (jsonObj) {
      let vo = jsonObj.vo;
      id = vo.id;
      styleNum = vo.styleNum;
      let styleContent = vo.styleContent;
      let originFile = vo.styleFile;
      $("#writer").val(id);
      $("#styleContent").val(styleContent);
      $("#sNum").val(styleNum);
    },
    error: function (xhr) {
      alert(whr.status);
    },
  });
  //--게시판 내용 보여주기 END--

  $("div.form>div>form>input[type=file]").change((e) => {
    let imageFileObj = e.target.files[0];
    console.log(imageFileObj);
    // blob타입의 이미지 파일 객체 내용을 문자열로 변환
    let blobStr = URL.createObjectURL(imageFileObj);
    $("div>div.show>img").attr("src", blobStr);
  });

  //--게시물 수정 버튼 클릭 START--
  document.getElementById("myBtn1").onclick = function () {
    edit();
  };
  function edit() {
    if (confirm("게시물을 수정하시겠습니까?") == false) {
      return;
    }
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
        alert(jsonObj);
        location.href = ("./styleinfo.html?styleNum=" + styleNum);
      },
      error: function (xhr) {
        alert("잘못 입력하셨습니다.");
      },
    });
    // location.href = "./styleinfo.html?styleNum=" + styleNum;
    return false;
  }
  //--게시물 수정 버튼 클릭 END--
  //--게시물 삭제 버튼 클릭 START--
    $('#delete').click(function(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl+"/style/delete.do",
      method: "post",
      data: "styleNum=" + styleNum + "&id=" + id,
      success: function (jsonObj) {
        // alert(jsonObj);
      },
      error: function (xhr) {
        alert(whr.status);
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
