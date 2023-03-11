//--카카오 key init--
Kakao.init('0f5ecb050f1085e7c9ab31b347a29303');
//--카카오 key init--
$(() => {
  let url = backUrl+"style/detail/"
  let data = location.search.substring(1); //?prodNo=C0001
  let repUrl = backUrl+"style/reply/";
  let styleNum = data.split('=')[1];
  let likesUrl = backUrl+"style/likes/"+styleNum;
  let replyCnt;
  let loginId;
  let loginNum;
  let styleId;
  let hashTotalName ='';
  let styleCnt;
  let styleLikes;
  let blobStr = '';
  showList(url);
  //--상품 정보 보여주기 START--
  function showList(url) {
    $("#likesCancle").hide();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+styleNum,
      method: "get",
      success: function (jsonObj) {
        let style = jsonObj.style;
        loginId = jsonObj.loginId;
        loginNum = jsonObj.loginNum;
        styleCnt = style.styleCnt;
        let tagList = style.tagList;
        let repList = style.replyList;
        replyCnt = style.replyList.length;
        styleId = style.member.id;
        let stylemNum = style.member.mnum;
        let styleDate = style.date;
        styleLikes = style.likesList.length;
        let $origin = $("div.styleinfo");
        let likesList = style.likesList;
        $(likesList).each((index,p)=>{
          let likeNum = p.le.mnum;
          if(likeNum == loginNum){
            $("#likesCancle").show();
            $("#likes").hide();
          }
        })
        //--이미지 띄우기 START--
        $.ajax({
          xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
          url: url+'img/'+styleNum,
          method: "get",
          success: function (result) {
          blobStr = URL.createObjectURL(result);
          $('div.img img').attr('src', blobStr);
        },
        error: function (jsonObj) {
          console.log(jsonObj.msg);
        },
      });
      //--이미지 띄우기 END--
        let $profileObj = $('<img>');
        $profileObj.attr('id',"profile");
        $profileObj.attr('class',"profile");
        $origin
          .find("div.id")
          .html("")
          .append($profileObj)
          .append('<span class="writerId">'+styleId+'</span>')
        $origin
          .find("div.styleDate")
          .html(styleDate);
        $origin
          .find("div.styleNum")
          .html("스타일번호: " + styleNum)
          .hide();
        $origin.find("div.styleLikes").html("공감 " +styleLikes + "개  댓글 "+replyCnt +"개   조회수 "+styleCnt);
        let btnStr =
          '<input type="button" id="edit" onclick=location.href="./styleedit.html?styleNum=' +
          styleNum +
          // "&id=" +
          // styleId +
          '" value="수정">';
        btnStr += '<p class="del_modal"><a href="#del_btn" rel="modal:open">'  
        btnStr +=
          '<input type="button" id="styleDel" class="styleDel" value="삭제">';
        btnStr += '</a></p>'
        $origin
          .find("div.replyCnt")
          .html("댓글"+replyCnt +"개"
          );
          profileImgShow(stylemNum);
        if (loginNum == stylemNum) {
          $origin.find("span.btn").html(btnStr);
        }
            
      //--프로필 이미지 띄우기 START--
      function profileImgShow(stylemNum){
      $.ajax({
        xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
        url: backUrl+"member/img/"+stylemNum,
        method: "post",
        success: function (result) {
          let profBlobStr = URL.createObjectURL(result);
          $('img#profile').attr('src', profBlobStr);
        },
        error: function (jsonObj) {
          console.log(jsonObj.msg);
        },
      });
      }
      //--프로필 이미지 띄우기 END--
        //--출력 되는 태그에 태그 스타일리스트 링크 걸기 START--
        let $tagOrigin = $("div.tag").first();
        let $tagParent = $("div.tagList");
        $(tagList).each((index, t) => {
          let hashName = t.ste.hashName;
          hashTotalName += '#'+hashName+' ';
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
          location.href =
            "./stylelist.html?hashName=" + hashName;
        });
        //--출력 되는 태그에 태그 스타일리스트 링크 걸기 END--

        //--댓글 리스트 출력하기 START--
        $('input[name=inputValue]').attr('value',"test");
        $("#reply_id").attr('value',loginId);
        $("#reply_id").attr('readonly',true);
        let $repOrigin = $("div.reply").first();
        let $repParent = $("div.repList");
        $(repList).each((index, r) => {
          let $repImgObj = $('<img>');
          let repId = r.member.id;
          let repWriteMnum = r.member.mnum;
          $repImgObj.attr('id',"repImg_"+repWriteMnum);
          $repImgObj.attr('class',"repImg");
          let repNum = r.repNum;
          let repWriteId = r.member.id;
          let repContent = r.repContent;
          let repDate = r.date;
          let repParent = r.replyParentDTO;
          let $repCopy = $repOrigin.clone();
          $repCopy.attr("id","reply_"+repNum);
          $repCopy.find("div.repDate")
                  .html(repDate+"<span id='replyWrite_"+repNum+"'class='re_replyWrite'>답글달기</span>");
          if(repParent != null){
            $repCopy.attr("class","re_reply");
            $repCopy.find("div.repDate").html(repDate);
          }
          $repCopy.find('div.repImg')
                  .append($repImgObj);
          $repCopy.find("div.repNum")
                  .html(repNum)
                  .hide();
          $repCopy
            .find("div.repId")
            .html(repId +"<span class='repContent'>"+ repContent+"</span>");

            repImgShow(repWriteMnum)         
            if (loginNum == repWriteMnum) {
            $repCopy
              .find("div.repId")
              $repCopy.find('div.repDate')
              .append('<div class="repeditForm_'+repNum+'"></div>')
              $repCopy.append('<div id="repBtn" class="repBtn_'+repNum+'">'+
                '<input type="button" id="edit.btn_' +
                  repNum +
                  '"class = "edit" value="수정">'+
                  '<p class="del_modal"><a href="#delRep_btn" rel="modal:open">'+
                '<input type="button" id="del.btn_' +
                  repNum +
                  '" class="del" value="삭제"></div>' +
                  '</a></p>'
              )
          }
          $repParent.append($repCopy);
        });
        $repOrigin.hide();
      },
      error: function (jsonObj) {
        alert(jsonObj);
      },
    });
    //--댓글 리스트 출력하기 END--
    
    //--상품 정보 보여주기 END--
  }
  //--댓글 이미지 띄우기 START--
  function repImgShow(repWriteMnum){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+"member/img/"+repWriteMnum,
      method: "post",
      success: function (result) {
        let repBlobStr = URL.createObjectURL(result);
        $('img#repImg_'+repWriteMnum).attr('src', repBlobStr);
      },
      error: function (jsonObj) {
        console.log(jsonObj.msg);
      },
    });
    }
  //--댓글 이미지 띄우기 END--
  //--삭제 버튼 클릭 START--
  $('#delete_style').click(function(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl+"/style/"+styleNum,
      method: "delete",
      success() {
        location.href = "./stylelist.html";
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  })
  //--삭제 버튼 클릭 END--
  //--좋아요 버튼 누르기 START--
  document.getElementById("likes").onclick = function () {
    heart();
  };
  function heart() {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: likesUrl,
      method: "post",
      success: function (jsonObj) {
        // alert(jsonObj);
        location = location;
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--좋아요 버튼 누르기 END--
  //--좋아요 취소 버튼 누르기 START--
  document.getElementById("likesCancle").onclick = function () {
    heartCancle();
  };
  function heartCancle() {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: likesUrl,
      method: "delete",
      success: function (jsonObj) {
        location = location;
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--좋아요 취소 버튼 누르기 END--
  //--이메일 공유 버튼 누르기 START--
  document.getElementById("emailShare").onclick = function () {
    emailShare();
  };
  function emailShare(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl+"member/share",
      method: "post",
      data: JSON.stringify ({
        "writerId" : styleId,
        "hashList" : hashTotalName,
        "url" : window.location.href
      }),
      contentType: 'application/json',
      success: function () {
        showToast("이메일 발송 되었습니다.");
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--이메일 공유 버튼 누르기 END--
  //--주소 공유 버튼 누르기 START--
  document.getElementById("linkShare").onclick = function(){
    linkShare();
  }
  function linkShare(){
    let textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    let shareUrl = window.document.location.href;
    textarea.value = shareUrl;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showToast("URL이 복사되었습니다!");
  }
  //--주소 공유 버튼 누르기 END--
  //--카카오톡 공유하기 START--
  document.getElementById("sendLinkCustom").onclick = function(){
    sendLinkCustom();
  }
  function sendLinkCustom() {
    Kakao.Link.sendCustom({
        templateId: 90867,
        templateArgs: {
          'styleNum':styleNum,
          'userId': styleId,  
          'hashList': hashTotalName,
          // 'img' : blobStr,
          'replyCnt' : replyCnt,
          'Cnt': styleCnt,
          'likes':styleLikes 
        },
    });
  }
    //--카카오톡 공유하기 END--
  //--댓글 작성 버튼 클릭 START--
  let replyContent;
  document.getElementById("myBtn").onclick = function () {
    replyContent = $("#reply_Content").val();
  };
  $('#write_rep').click(function(){
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: repUrl+styleNum,
      data: JSON.stringify ({
        "repContent" : replyContent
      }),
      method: "post",
      contentType: 'application/json',
      success() {
        location = location;
      },
      error: function (jsonObj) {
        alert(jsonObj.responseText)
      },
    });
  })
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
        url: repUrl+$repNum,
        method: "delete",
        success(jsonObj) {
          location = location;
        },
        error: function (jsonObj) {
          alert(jsonObj.responseJSON.msg);
        },
          })
        })
          
  // --댓글 삭제 버튼 클릭 END--

  //--댓글 수정 버튼 클릭 START--    
  $(document).on("click", "input[class='edit']", function () {
    let repEditNum = $(this).attr("id").split("_")[1];
    $("div.repBtn_"+repEditNum).hide();
    let replyEditStr = '<div id = "replyEditForm">';
    replyEditStr += '<input type="text" id="reply_id" value="'+loginId+'"hidden><br/>';
    replyEditStr +=
    '<input type="text" id="reply_Content" class="replyedit_Content" placeholder="댓글 내용을 입력하세요" >';
    replyEditStr += '<div class="edit_btn_package">'
    replyEditStr += '<p class="edit_rep_modal"><a href="#editRep_btn" rel="modal:open">'
    replyEditStr +=
    '<input type="button" id="editBtn" class="editFm" value="댓글 수정">';
    replyEditStr += '</a></p>'
    replyEditStr +=
    '<input type="button" id="editFormDel" class="editFormDel" value="취소">';
    replyEditStr += '</div>'
    let $repedit = $("div.repeditForm_"+repEditNum);
    $repedit.html(replyEditStr);
    
    //--댓글 수정하기 폼 버튼 클릭 START--
    let replyContentEdit;
    $(document).on("click", "input[class='editFm']", function () {
      replyContentEdit = $("#reply_Content").val();
    });
    $('#edit_rep').click(function(){
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: repUrl+repEditNum,
        data: JSON.stringify ({
          "repContent" : replyContentEdit
        }),
        method: "put",
        contentType: 'application/json',
        success() {
          location = location;
        },
        error: function (jsonObj) {
          alert(jsonObj.responseText)
        },
      });
    });
    //--댓글 수정하기 폼 버튼 취소클릭 START--
    $(document).on("click", "input[class='editFormDel']", function () {
      $("div.repBtn_"+repEditNum).show();
      $repedit.html("");
    });
    //--댓글 수정하기 폼 버튼 취소클릭 END--
  });
  //--댓글 수정 버튼 클릭 END--
  //--답글달기 버튼 클릭 START--
  $("div.repList").on('click','.re_replyWrite', function(e) {
    let rep = $(e.target).attr('id');
    let re_repNum = rep.split('_')[1];
    let re_replyStr = '<div id = "re_replyform">';
    re_replyStr += '<input type="text" id="re_reply_id" value="'+loginId+'"hidden><br/>';
    re_replyStr +=
      '<input type="text" id="re_replyContent" class="re_reply_id_content" placeholder="댓글 내용을 입력하세요" >';
    re_replyStr += '<div class="re_reply_btn_package">' 
    re_replyStr += '<p class="rep_writeRep_modal"><a href="#rep_writeRep_btn" rel="modal:open">' 
    re_replyStr +=
      '<input type="button" id="re_replyBtn_'+re_repNum+'" class="re_replyForm" value="댓글 작성">';
    re_replyStr += '</a></p>'
    re_replyStr +=
      '<input type="button" id="re_replyFormDel_'+re_repNum+'" class="re_replyFormDel" value="취소">';
    re_replyStr += '</div>'
    let $repParent = $(e.target);
    $repParent.html(re_replyStr);
  }); 
  //--답글달기 버튼 클릭 END--
  //--답글달기 폼 버튼 작성클릭 START--
    let replyNum;
    let re_replyContent;
    $(document).on("click", "input[class='re_replyForm']", function (e) {
      let rep = $(e.target).attr('id');
      replyNum = rep.split('_')[2];
      re_replyContent = $("#re_replyContent").val();
    });
    $('#writeRep_rep').click(function(){
      $.ajax({
        xhrFields: {
          withCredentials: true,
        },
        url: repUrl+styleNum,
        data: JSON.stringify ({
          "repContent" : re_replyContent,
          "repNum" : replyNum
        }),
        method: "post",
        contentType: 'application/json',
        success() {
          location = location;
        },
        error: function (jsonObj) {
          alert(jsonObj.responseText);
        },
      });
    })
  //--답글달기 폼 버튼 작성클릭 END--
  //--답글달기 폼 버튼 취소클릭 START--
    $(document).on("click", "input[class='re_replyFormDel']", function (e) {
      let $re_replyForm = $('span.re_replyWrite');
      let rep = $(e.target).attr('id');
      let replyNum = rep.split('_')[2];
      $re_replyForm.html("<span id='replyWrite_"+replyNum+"'class='re_replyWrite'>답글달기</span>");
  });
  //--답글달기 폼 버튼 취소클릭 END--
  //--토스트 알람 START--
  let msgTimer = 0;
  function showToast(msg, slot) {
      clearToast();
      let toast = $('#toast');

      if(slot == 'top') {
          toast.css('top', '33px');
          toast.css('bottom', '');
      } else if(slot == 'bottom') {
          toast.css('top', '');
          toast.css('bottom', '-13px');
      } else {
          toast.css('top', '50%');
          toast.css('bottom', '');
      }

      toast.children().html(msg);
      setTimeout(function() {
          toast.fadeIn(500, function() {
              msgTimer = setTimeout(function() {
                  toast.fadeOut(500);
              }, 1000);
          });
      }, 200);
  }
  
  function clearToast() {
      if(msgTimer != 0) {
          clearTimeout(msgTimer);
          msgTimer = 0;
      }
  }
  //--토스트 알람 END--
});
  