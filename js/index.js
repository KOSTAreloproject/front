$(() => {
  //--홈페이지 실행 시 인기상품,STYLE 목록 보여주기--//
  showzlist(0);
  showdlist(0);
  showslist();
  //--인기상품 출력(찜하기순) START--//
  function showzlist(start) {
    let url = backUrl + 'product/shop/'+start
    let $origin = $('div.zzimlist').first()
    let condition = 'sort=zzim'

    $('div.zzimlist').not(':first-child').remove()
    $origin.show()
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        console.log(jsonObj)
        let $parent = $('div.zzim')
        let sNum = ""
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone()
          let sName = p.sname;
          let sHopePrice = p.shopePrice
          let maxPrice = p.maxPrice
          let pNum = p.pnum
          sNum = p.snum
          let enddate = p.pendDate.substring(0,10);

          if (maxPrice != 0) {
          sHopePrice = maxPrice
          $copy.find('div.zaprice').html('최고입찰가 : ' + sHopePrice + '원')
          }
          if (maxPrice == 0) {
          $copy.find('div.zaprice').html('희망판매가 : ' + sHopePrice + '원')
          }
          let $imgObj = $('<img>')
          $imgObj.attr("id",'z'+sNum)
          $imgObj.attr('height', '250px')
          $copy.find('div.zimg').empty().append($imgObj)
          $copy.find('div.zsname').html(sName);
          $copy.find('div.zenddate').html('경매마감일 : ' + enddate)
          $copy.find('div.zpnum').html(pNum)
          $copy.find('div.zsnum').html(sNum)
          $parent.append($copy)

          zimgShow(sNum)
        });

        $($origin).detach();
        $('div.zzimlist').hide();
        $('div.zzimlist').slice(0, 5).show();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--인기상품 출력(찜하기순) END--//
  //--마감임박상품 출력 START--//
  function showdlist(start) {
    let url = backUrl + 'product/shop/'+start
    let $origin = $('div.deadlinelist').first();
    $('div.deadlinelist').not(':first-child').remove();
    $origin.show();
    let condition = 'sort=pend';

    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        console.log(jsonObj);
        let $origin = $('div.deadlinelist').first()
        let $parent = $('div.deadline')
        let sNum = ""
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone()
          let sName = p.sname;
          let sHopePrice = p.shopePrice
          let maxPrice = p.maxPrice
          let pNum = p.pnum
          sNum = p.snum
          let enddate = p.pendDate.substring(0,10);

          if (maxPrice != 0) {
          $copy.find('div.daprice').html('최고입찰가 : ' + maxPrice + '원')
          }
          if (maxPrice == 0) {
          $copy.find('div.daprice').html('희망판매가 : ' + sHopePrice + '원')
          }
          let $imgObj = $('<img>')
          $imgObj.attr("id",'d'+sNum)
          $imgObj.attr('height', '200px')
          $copy.find('div.dimg').empty().append($imgObj);
          $copy.find('div.dsname').html(sName);
          $copy.find('div.denddate').html('경매마감일 : ' + enddate);
          $copy.find('div.dpnum').html(pNum);
          $copy.find('div.dsnum').html(sNum);
          $parent.append($copy);

          dimgShow(sNum);
        });

        $($origin).detach();
        $('div.deadlinelist').hide();
        $('div.deadlinelist').slice(0, 5).show();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--마감임박상품 출력 END--//
   //--스타일게시판 출력(인기순) START--//
  function showslist() {
    let url = backUrl + 'style/list/2';
    let $origin = $('div.styleboardlist').first();
    $('div.styleboardlist').not(':first-child').remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get', 
      success: function (jsonObj) {
        console.log(jsonObj);
        let list = jsonObj.list;
        let $origin = $('div.styleboardlist').first();
        let $parent = $('div.styleboard');
        let styleNum = ""

        $(list).each((index, p) => {
          let id = p.member.id;
          styleNum = p.styleNum;
          let styleLikes = p.likesList.length;
          let $copy = $origin.clone();

          let $imgObj = $('<img>');
          $imgObj.attr("id",'s'+styleNum);
          $imgObj.attr('height', '200px');
          $copy.find('div.simg').empty().append($imgObj);
          $copy.find('div.stid').html('글쓴이 : ' + id);
          $copy.find('div.stlike').html('좋아요 : ' + styleLikes);
          $copy.find('div.stnum').html(styleNum);
          $parent.append($copy);
          simgShow(styleNum);
        });
        $($origin).detach();
        $('div.styleboardlist').hide();
        $('div.styleboardlist').slice(0, 5).show();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--스타일게시판 출력(인기순) END--//
  //--스타일게시판 이미지 띄우기 START--
   function simgShow(num){
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
      $('img#s'+num).attr('src', blobStr);
    },
    error: function (xhr) {
      console.log(xhr.status);
    },
  });
}
  //-- 인기상품 이미지 출력(인기순) END--//
    function zimgShow(num){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'product/list/img/'+num,
      method: "get",
      success: function (result) {
      let blobStr = URL.createObjectURL(result);
      $('img#z'+num).attr('src', blobStr);
    },
    error: function (xhr) {
      console.log(xhr.status);
    },
  });
}
//-- 마감임박상품 이미지 출력 END--//
    function dimgShow(num){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'product/list/img/'+num,
      method: "get",
      success: function (result) {
      let blobStr = URL.createObjectURL(result);
      $('img#d'+num).attr('src', blobStr);
    },
    error: function (xhr) {
      console.log(xhr.status);
    },
  });
}
  //인기상품 클릭하면 상세로 이동
   $('div.zzim').on('click', 'div.zzimlist', (e) => {
    let pNum = $(e.target).parents('div.zzimlist').find('div.zpnum').html();
    location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum;
  });


  //마감임박상품 클릭하면 상세로 이동
  $('div.deadline').on('click', 'div.deadlinelist', (e) => {
    let pNum = $(e.target).parents('div.deadlinelist').find('div.dpnum').html();
    location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum;
  });

  //Style 게시글 클릭하면 상세로 이동
  $('div.styleboard').on('click', 'div.styleboardlist', (e) => {
    let styleNum = $(e.target).parents('div.styleboardlist').find('div.stnum').html();
    location.href = frontUrl+ '/styleinfo.html?styleNum=' + styleNum;
  });

  //롤링배너
  $('section.slideshow').slick();

  //찜순 상품목록 더보기 버튼 클릭
  $(document).on('click', '.zmoreview', (e) => {
    // 클릭시 more
    e.preventDefault();
    $('div.zzimlist:hidden').slice(0, 5).show(); // 클릭시 more 갯수 지저정
  });

   //마감임박 상품목록 더보기 버튼 클릭
  $(document).on('click', '.dmoreview', (e) => {
    // 클릭시 more
    e.preventDefault();
    $('div.deadlinelist:hidden').slice(0, 5).show(); // 클릭시 more 갯수 지저정
  });
   //스타일목록 더보기 버튼 클릭
  $(document).on('click', '.smoreview', (e) => {
    // 클릭시 more
    e.preventDefault();
    $('div.styleboardlist:hidden').slice(0, 5).show(); // 클릭시 more 갯수 지저정
  });
  
});