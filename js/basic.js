let backUrl = "http://192.168.0.42:8888/relo";
let frontUrl = "http://192.168.0.42:5500/html";
// let backUrl = "http://192.168.123.103:8888/relo";
// let frontUrl = "http://192.168.123.103:5500/html";


$(() => {
  checkIntervalLogined();
  // $("header").load("header.html");
  // $("footer").load("footer.html");
  $("#header").load("header.html");
  $("#footer").load("footer.html");
  // $("#nav").loasd("nav.html");

  // $('header>div.top>ul>li').click((e) => {
  //   // $('header>div.top>nav>ul>li')
  //   //   .css('background-color', '#fff')
  //   //   .css('color', '#000');
  //   $(e.target).css('background-color', '#2c2a29').css('color', '#fff');
  //   let menu = $(e.target).attr('class');
  //   switch (menu) {
  //     case 'login':
  //       $('section').load('login.html');
  //       break;
  //     case 'join':
  //       $('section').load('join.html');
  //       break;
  //     case 'logout':
  //       break;
  //     case 'mypage':
  //       // $.ajax에서 get 방식으로 요청하는 것과 동일
  //       $('section').load('memberdetail.html');
  //       break;
  //     case 'notice':
  //       break;
  //   }
  // });
  //--로고가 클릭되었을 때 할 일 START--
  $("header>div.bottom>div.img").click(() => {
    location.href = frontUrl;
  });
  //--로고가 클릭되었을 때 할 일 END--

  //--로그인상태의 메뉴들 보여주기 함수 START--
  function showMenuAtLogined() {
    $("header>div.top>nav>ul>li.login").hide();
    $("header>div.top>nav>ul>li.join").hide();
    $("header>div.top>nav>ul>li.logout").show();
    $("header>div.top>nav>ul>li.mypage").show();
    $("header>div.bottom>nav>ul>li.shop").show();
    $("header>div.bottom>nav>ul>li.styleboard").show();
  }
  //--로그인상태의 메뉴들 보여주기 함수 END--

  //--로그아웃상태의 메뉴들 보여주기 함수 START--
  function showMenuAtLogouted() {
    $("header>div.top>nav>ul>li.login").show();
    $("header>div.top>nav>ul>li.join").show();
    $("header>div.top>nav>ul>li.logout").hide();
    $("header>div.bottom>nav>ul>li.shop").show();
    $("header>div.bottom>nav>ul>li.styleboard").show();
  }
  //--로그아웃상태의 메뉴들 보여주기 함수 END--

  //--현재 로그인상태인지 로그아웃상태인가를 요청하는 함수 START--
  function checkLogined() {
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + "/member/checklogined.do",
      success: function (responseObj) {
        console.log(responseObj.status);
        if (responseObj.status == 1) {
          showMenuAtLogined();
        } else {
          showMenuAtLogouted();
        }
      },
    });
  }
  //--로그아웃상태의 메뉴들 보여주기 함수 END--

  //--60초간격으로 로그인여부확인하기 함수 START--
  function checkIntervalLogined() {
    window.setInterval(checkLogined, 60000);
  }
  // $(() => {   checkIntervalLogined();   }) -> 위와 같은 표현
  //--5초간격으로 로그인여부확인하기 함수 END--
});
