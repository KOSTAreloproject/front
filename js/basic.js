let backUrl = "http://192.168.0.40:8888/relo/";
let frontUrl = "http://192.168.0.40:5500/html/";

$(() => {
  
  checkIntervalLogined();

  $("#header").load("header.html");
  $("#footer").load("footer.html");
  $("#nav").load("nav.html");


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
      url: backUrl + "member/checklogined.do",
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
    window.setInterval(checkLogined, 6000000);
  }
  // $(() => {   checkIntervalLogined();   }) -> 위와 같은 표현
  //--5초간격으로 로그인여부확인하기 함수 END--
});