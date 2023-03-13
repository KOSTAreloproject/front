$(() => {
  let url = backUrl+"style";
  let data = location.search.substring(1);
  let searchCode = data.split("=")[0];
  let hashName = data.split("=")[1];
  let loginId;

  showList(url);
  //--페이지 처음 불러왔을 때 url코드 보고 리스트별 뽑아내기 START--
  switch (searchCode) {
    case "hashName":
      hashList(url, hashName);
      break;
    case "id":
      myList(url, data);
      break;
  }
  //--페이지 처음 불러왔을 때 url코드 보고 리스트별 뽑아내기 END--
  
  //--해시태그별 리스트 띄우기 START--
  function hashList(url, data) {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+"/hashList/"+data,
      method: "get",
      success: function (jsonObj) {
        listShow(jsonObj);
        $('#likes').css('color','#222');
        $('#likes').css('background-color','#fff');
        $('#recent').css('color','#222');
        $('#recent').css('background-color','#fff');
        $('#myStyle').css('color','#222');
        $('#myStyle').css('background-color','#fff');
        $('#Cnt').css('color','#222');
        $('#Cnt').css('background-color','#fff');
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--해시태그별 리스트 띄우기 END--
  //--조회순별 출력 START--
  $("#Cnt").click(function () {
    let $origin = $("div.style").first();
    $("div.style").not(":first-child").remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+'/list/3',
      method: "get",
      success: function (jsonObj) {
        listShow(jsonObj);
        $('#recent').css('color','#222');
        $('#recent').css('background-color','#fff');
        $('#myStyle').css('color','#222');
        $('#myStyle').css('background-color','#fff');
        $('#likes').css('color','#222');
        $('#likes').css('background-color','#fff');
        $('#Cnt').css('color','#fff');
        $('#Cnt').css('background-color','#222');
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  });
  //--조회순별 출력 END--
  
  //--내가 쓴 글 리스트 띄우기 START--
  function myList(url, data) {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+data,
      method: "get",
      success: function (jsonObj) {
        listShow(jsonObj);
        $('#myStyle').css('color','#fff');
        $('#myStyle').css('background-color','#222');
        $('#likes').css('color','#222');
        $('#likes').css('background-color','#fff');
        $('#recent').css('color','#222');
        $('#recent').css('background-color','#fff');
        $('#Cnt').css('color','#222');
        $('#Cnt').css('background-color','#fff');
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  }
  //--내가 쓴 글 리스트 띄우기 END--

  //--상품목록 요청 START--
  function showList(url) {
    let $origin = $("div.style").first();
    // let $parent = $('div.stylelist')
    $("div.style").not(":first-child").remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+'/list/2',
      method: "get",
      success: function (jsonObj) {
        listShow(jsonObj);
        $('#likes').css('color','#fff');
        $('#likes').css('background-color','#222');
        $('#recent').css('color','#222');
        $('#recent').css('background-color','#fff');
        $('#myStyle').css('color','#222');
        $('#myStyle').css('background-color','#fff');
        $('#Cnt').css('color','#222');
        $('#Cnt').css('background-color','#fff');
      },
      error: function (jsonObj) {
        console.log(jsonObj);
      },
    });
  }
  //--상품목록 요청 END--

  //--상품 클릭되었을 때 할일 START--
  $("div.stylelist").on("click", "div.style", (e) => {
    let styleNum = $(e.target).parents("div.style").find("div.styleNum").html();
    location.href = "./styleinfo.html?styleNum=" + styleNum;
  });
  //--상품 클릭되었을 때 할일 END--

  //--최신순 출력 START--
  $("#recent").click(function () {
    let $origin = $("div.style").first();
    $("div.style").not(":first-child").remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url+'/list/1',
      method: "get",
      success: function (jsonObj) {
        listShow(jsonObj);
        
        $('#recent').css('color','#fff');
        $('#recent').css('background-color','#222');
        $('#myStyle').css('color','#222');
        $('#myStyle').css('background-color','#fff');
        $('#likes').css('color','#222');
        $('#likes').css('background-color','#fff');
        $('#Cnt').css('color','#222');
        $('#Cnt').css('background-color','#fff');
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  });
  //--최신순 출력 END--

  //--인기순 출력 START--
  $("#likes").click(function () {
    showList(url);
  });
  //--인기순 출력 END--

  //--내 글 모아보기 클릭 이벤트 START--
  $("#myStyle").click(function () {
    let $origin = $("div.style").first();
    $("div.style").not(":first-child").remove();
    $origin.show();
    let myData = "/myList";

    myList(url, myData);
  });
  //--내 글 모아보기 클릭 이벤트 END--
  
  //--리스트 출력 START--
  function listShow(jsonObj) {
    let tagList = jsonObj.tagList;
    let list = jsonObj.list;

    loginId = jsonObj.loginId;
    let $origin = $("div.style").first();
    let $parent = $("div.stylelist");

    $(list).each((index, p) => {
      let styleNum = p.styleNum;
      let id = p.member.id;
      let mNum = p.member.mnum;
      let styleLikes = p.likesList.length;
      let tagList = p.tagList;
      let content = '';
      let hashName = '';
      $(tagList).each((index, o) => {
        let ste = o.ste;
        $(ste).each((index,i)=>{
          hashName = i.hashName;
          content += '#'+hashName+' ';
        })
      });

      let $copy = $origin.clone();
      let $imgObj = $("<img>"); //태그용 객체를 만듬
      $imgObj.attr("id","s_"+styleNum);
      $copy.find("div.img")
           .empty()
           .append($imgObj);
      $copy.find("div.styleNum").html(styleNum).hide();
      let $profileObj = $('<img>');
      $profileObj.attr('id',"m_"+mNum);
      $profileObj.attr('class',"profile");
      $copy
        .find("span.styleId")
        .html("")
        .append($profileObj)
        .append('<span class="profileId">'+id+'</span>')
        $copy.find("span.stylelike").html('<span class="material-icons" id="likes">' +
        "sentiment_satisfied_alt"
      +'</span>'+styleLikes);
        $copy.find("span.styleContent").html(content);

      $parent.append($copy);
      imgShow(styleNum);
      profileImgShow(mNum);
    });
    $origin.hide();
    
    //--해시태그 리스트 띄우기 START--
    let $tagList = $("div.tagList");
    let tagGroupStr = "";
    $(tagList).each((index, h) => {
      let hashName = h;
      tagGroupStr +=
      '<span class="tag_' +
      index +
      '"id="tag"">' +
      " #" +
      hashName +
      "</span>";
    });
    $tagList.html(tagGroupStr);
    //--해시태그 리스트 띄우기 END--
    
    //--이미지 띄우기 START--
    function imgShow(num){
      $.ajax({
        xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
        url: url+'/list/img/'+num,
        method: "get",
        success: function (result) {
          let blobStr = URL.createObjectURL(result);
          $('img#s_'+num).attr('src', blobStr);
        },
        error: function (jsonObj) {
          console.log(jsonObj.msg);
        },
      });
    }
    //--이미지 띄우기 END--

    //--프로필 이미지 띄우기 START--
    function profileImgShow(mnum){
      $.ajax({
        xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
        url: backUrl+"member/img/"+mnum,
        method: "post",
        success: function (result) {
          let resultSize = result.size;
          let blobStr = URL.createObjectURL(result);
          if (resultSize < 1){
            console.log(typeof resultSize);
            $('img#m_'+mnum).attr('src', '../imgs/defaultProfileImg.png');        
          }else{
            $('img#m_'+mnum).attr('src', blobStr);          
          }
        },
        error: function (jsonObj) {
          console.log(jsonObj.msg);
        },
      });
    }
    //--프로필 이미지 띄우기 END--

    //--해시태그 클릭되었을 때 할 일 START--
    $("div.tagList").on("click", "span:not(.current)", (e) => {
      let hashName = $(e.target).html().split("#")[1];
      let $origin = $("div.style").first();

      $("div.style").not(":first-child").remove();
      $origin.show();

      let hashData = hashName;

      hashList(url, hashData);
    });
    //--해시태그 클릭되었을 때 할 일 END--
  }
  //--리스트 출력 END--
  // let lastScroll = 0;
  // $(window).on('scroll', function(){
  //   let scrollTop = $(this).scrollTop();
  //   if(scrollTop > lastScroll) {
  //       //down
  //       console.log('다운')
  //   } else {
  //       // up
  //       console.log('업');
  //   }
  //   lastScroll = scrollTop;
  //   });
});