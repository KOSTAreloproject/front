$(() => {
  let url = backUrl+"/style/detail.do";
  let data = location.search.substring(1); //?prodNo=C0001
  let repUrl = backUrl+"/reply/add.do";
  let likesUrl = backUrl+"/likes/likes.do";
  let styleNum = data.split('=')[1];
  let replyCnt;
  let loginId;
  showList(url);
  //--상품 정보 보여주기 START--
  function showList(url) {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "get",
      data: data,
      success: function (jsonObj) {
        console.log(jsonObj);
        let vo = jsonObj.vo;
        let likeCheck = jsonObj.likeCheck;
        replyCnt = jsonObj.replyCnt;
        loginId = jsonObj.loginId;
        let tagList = vo.tagList;
        let repList = vo.repList;
        let styleId = vo.id;
        let styleContent = vo.styleContent;
        let styleDate = vo.styleDate;
        let styleFile = vo.styleFile;
        let styleLikes = vo.styleLikes;
        let $origin = $("div.styleinfo");
        let $imgObj = $("div.img img");
        $imgObj.attr("src", "../imgs/style/" + styleFile);
        // $origin.find("div.img").html($imgObj);
        let year = styleDate.split("-")[0];
        let month = styleDate.split("-")[1];
        let date = styleDate.split("-")[2];
        
        if(likeCheck == 1){
          $("#likes").html('favorite');
        }
        
        $origin
          .find("div.id")
          .html(
            "@" +
              styleId
          );
        $origin
          .find("div.styleDate")
          .html("20" + year + "년 " + month + "월 " + date + "일");
        $origin
          .find("div.styleNum")
          .html("스타일번호: " + styleNum)
          .hide();
        $origin.find("div.styleLikes").html("공감 " +styleLikes + "개  댓글 "+replyCnt +"개");
        let btnStr =
          '<input type="button" id="edit" onclick=location.href="./styleedit.html?styleNum=' +
          styleNum +
          "&id=" +
          styleId +
          '" value="수정">';
        btnStr += '<p class="del_modal"><a href="#del_btn" rel="modal:open">'  
        btnStr +=
          '<input type="button" id="styleDel" class="styleDel" value="삭제">';
        btnStr += '</a></p>'
        $origin
          .find("div.replyCnt")
          .html("댓글"+replyCnt +"개"
          );
        if (loginId == styleId) {
          $origin.find("span.btn").html(btnStr);
        }

        //--출력 되는 태그에 태그 스타일리스트 링크 걸기 START--
        let $tagOrigin = $("div.tag").first();
        let $tagParent = $("div.tagList");
        $(tagList).each((index, t) => {
          let hashName = t.hashName;
          let $tagCopy = $tagOrigin.clone();
          let tagGroupStr =
            '<input type="button" id= "' +
            hashName +
            '" class ="tagClick" value="#' +
            hashName +
            '">';
          $tagCopy.find("div.hashName").html(tagGroupStr);
          $tagParent.append($tagCopy);
        });
        $tagOrigin.hide();
        $(document).on("click", "input[class='tagClick']", function () {
          let hashName = $(this).attr("id");
          console.log(hashName);
          location.href =
            "./stylelist.html?hashName=" + hashName + "&currentPage=1";
        });
        //--출력 되는 태그에 태그 스타일리스트 링크 걸기 END--

        //--댓글 리스트 출력하기 START--
        $('input[name=inputValue]').attr('value',"test");
        $("#reply_id").attr('value',loginId);
        $("#reply_id").attr('readonly',true);
        let $repOrigin = $("div.reply").first();
        let $repParent = $("div.repList");
        $(repList).each((index, r) => {
          let repNum = r.repNum;
          let repId = r.id;
          let repContent = r.repContent;
          let repDate = r.repDate;
          let repYear = repDate.split("-")[0];
          let repMonth = repDate.split("-")[1];
          let repdate = repDate.split("-")[2];
          let $repCopy = $repOrigin.clone();
          $repCopy.find("div.repNum").html(repNum).hide();
          $repCopy
            .find("div.repId")
            .html(repId +"<span class='repContent'>"+ repContent+"</span>");
          $repCopy.find("div.repDate").html("20" + repYear + "년 " + repMonth + "월 " + repdate + "일");
          if (loginId == repId) {
            $repCopy
              .find("div.repId")
              .append('<div id="repBtn">'+
                '<input type="button" id="edit.btn_' +
                  repNum +
                  '"class = "edit" value="수정">'+
                  '<p class="del_modal"><a href="#delRep_btn" rel="modal:open">'+
                '<input type="button" id="del.btn_' +
                  repNum +
                  '" class="del" value="삭제"></div>' +
                  '</a></p>'
              )
              $repCopy.find('div.repDate')
              .append('<div class="repeditForm_'+repNum+'"></div>')
          }
          $repParent.append($repCopy);
        });
        $repOrigin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //--댓글 리스트 출력하기 END--
    //--상품 정보 보여주기 END--
  }
  //--삭제 버튼 클릭 START--
  $('#delete_style').click(function(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl+"/style/delete.do",
      data: "styleNum=" + styleNum,
      method: "post",
      success(jsonObj) {
        // alert(jsonObj);
        location.href = "./stylelist.html";
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  })
  //--삭제 버튼 클릭 END--
  //--좋아요 버튼 누르기 START--
  document.getElementById("likes").onclick = function () {
    heart();
  };
  function heart() {
    let likes = "likes";
    console.log(styleNum);
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: likesUrl,
      method: "get",
      data: "styleNum=" + styleNum + "&likes=" + likes,
      success: function (jsonObj) {
        // alert(jsonObj);
        location = location;
      },
      error: function (xhr) {
        $.ajax({
          xhrFields: {
            withCredentials: true,
          },
          url: likesUrl,
          data: "styleNum=" + styleNum + "&likes=cancle",
          method: "get",
          success: function (jsonObj) {
            // alert(jsonObj);
            location = location;
          },
          error: function (xhr) {
            alert(xhr.status);
          },
        });
      },
    });
  }
  //--좋아요 버튼 누르기 END--

  //--댓글 작성 버튼 클릭 START--
  document.getElementById("myBtn").onclick = function () {
    replyWt();
  };
  function replyWt() {
    let replyId = $("#reply_id").val();
    let replyContent = $("#reply_Content").val();
    let repData = "id=" + replyId + "&repContent=" + replyContent + "&" + data;
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: repUrl,
      data: repData,
      method: "post",
      success(jsonObj) {
        alert(jsonObj);
        location = location;
        // showList(url);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--댓글 작성 버튼 클릭 END--

  // --댓글 삭제 버튼 클릭 START--
  $(document).on("click", "input[class='del']", function () {
    let num = $(this).attr("id").split("_")[1];
    $('#del_repnum_input').val(num);
  });
  $('#delete_rep').click(function(){
    let $repNum = $('#del_repnum_input').val();
    $.ajax({
        xhrFields: {
            withCredentials: true,
        },
        url: backUrl+"/reply/delete.do",
        data: "repNum=" + $repNum + "&id=" + loginId,
        method: "post",
        success(jsonObj) {
            location = location;
            },
            error: function (xhr) {
              alert(xhr.status);
              },
          })
  })
          
  // --댓글 삭제 버튼 클릭 END--
  //--댓글 수정 버튼 클릭 START--
  $(document).on("click", "input[class='edit']", function () {
    let repNum = $(this).attr("id").split("_")[1];
    console.log(repNum);
    let replyEditStr = '<div id = "replyEditForm">';
    replyEditStr += '<input type="text" id="reply_id" value="'+loginId+'"hidden><br/>';
    replyEditStr +=
      '<input type="text" id="reply_Content" class="replyedit_Content" placeholder="댓글 내용을 입력하세요" >';
    replyEditStr +=
      '<input type="button" id="editBtn" class="editFm" value="댓글수정">';
    replyEditStr +=
      '<input type="button" id="editFormDel" class="editFormDel" value="수정취소">';
    let $repedit = $("div.repeditForm_"+repNum);
    $repedit.html(replyEditStr);

    //--댓글 수정하기 폼 버튼 클릭 START--
    $(document).on("click", "input[class='editFm']", function () {
      let replyContentEdit = $("#reply_Content").val();
      let replyIdEdit = $("#reply_id").val();

      if (confirm("댓글을 수정하시겠습니까?") == false) {
        return;
      }
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: backUrl+"/reply/edit.do",
        data:
          "repNum=" +
          repNum +
          "&id=" +
          replyIdEdit +
          "&repContent=" +
          replyContentEdit,
        method: "get",
        success(jsonObj) {
          alert(jsonObj);
          location = location;
        },
        error: function (xhr) {
          alert(xhr.status);
        },
      });
    });
    //--댓글 수정하기 폼 버튼 취소클릭 START--
    $(document).on("click", "input[class='editFormDel']", function () {
      $repedit.html("");
    });
    //--댓글 수정하기 폼 버튼 취소클릭 END--
  });
  //--댓글 수정 버튼 클릭 END--
});