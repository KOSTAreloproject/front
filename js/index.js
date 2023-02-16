$(() => {
  //--인기상품 출력(찜하기순) START--//
  function showzlist() {
    let url = backUrl + 'product/list.do';
    let $origin = $('div.zzimlist').first();
    $('div.zzimlist').not(':first-child').remove();
    $origin.show();
    let condition = 'condition=zzim';
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        console.log(jsonObj);
        let $origin = $('div.zzimlist').first();
        let $parent = $('div.zzim');
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone();
          let sFile = p.sFile;
          let sName = p.sName;
          let sHopePrice = p.sHopePrice;
          let maxPrice = p.aPrice;
          let pNum = p.pNum;
          if (maxPrice != 0) {
            sHopePrice = maxPrice;
            $copy.find('div.aprice').html('최고입찰가 : ' + sHopePrice + '원');
          }
          if (maxPrice == 0) {
            $copy.find('div.aprice').html('희망판매가 : ' + sHopePrice + '원');
          }
          let enddate = p.pEndDate;
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $('<img>');
          $imgObj.attr('src', '../imgs/' + sFile + '.jpg');
          $imgObj.attr('height', '150px');
          $copy.find('div.zimg').empty().append($imgObj);
          $copy.find('div.sname').html(sName);
          $copy.find('div.enddate').html('경매마감일 : ' + enddate);
          $copy.find('div.pnum').html(pNum);
          $parent.append($copy);
        });
        // $origin.hide();
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
  function showdlist() {
    let url = backUrl + 'product/list.do';
    let $origin = $('div.deadlinelist').first();
    $('div.deadlinelist').not(':first-child').remove();
    $origin.show();
    let condition = 'condition=normal&orderkind=penddate';
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: 'get',
      data: condition,
      success: function (jsonObj) {
        console.log(jsonObj);
        let $origin = $('div.deadlinelist').first();
        let $parent = $('div.deadline');
        $(jsonObj).each((index, p) => {
          let $copy = $origin.clone();
          let sFile = p.sFile;
          let sName = p.sName;
          let sHopePrice = p.sHopePrice;
          let maxPrice = p.aPrice;
          let pNum = p.pNum;
          if (maxPrice != 0) {
            sHopePrice = maxPrice;
            $copy.find('div.aprice').html('최고입찰가 : ' + sHopePrice + '원');
          }
          if (maxPrice == 0) {
            $copy.find('div.aprice').html('희망판매가 : ' + sHopePrice + '원');
          }
          let enddate = p.pEndDate;
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $('<img>');
          $imgObj.attr('src', '../imgs/' + sFile + '.jpg');
          $imgObj.attr('height', '150px');
          $copy.find('div.dimg').empty().append($imgObj);
          $copy.find('div.sname').html(sName);
          $copy.find('div.enddate').html('경매마감일 : ' + enddate);
          $copy.find('div.pnum').html(pNum);
          $parent.append($copy);
        });
        // $origin.hide();
        $($origin).detach();
        $('div.deadlinelist').hide();
        $('div.deadlinelist').slice(0, 5).show();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--인기상품 출력(찜하기순) END--//
  //--스타일게시판 출력(인기순) START--//
  function showslist() {
    let url = backUrl + 'style/list.do';
    let $origin = $('div.styleboardlist').first();
    let condition = 'styleCode=styleLikes&currentPage=1';
    $('div.styleboardlist').not(':first-child').remove();
    $origin.show();
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      data: condition,
      method: 'get',
      success: function (jsonObj) {
        console.log(jsonObj);
        let list = jsonObj.pb.list;
        let $origin = $('div.styleboardlist').first();
        let $parent = $('div.styleboard');
        $(list).each((index, p) => {
          let styleFile = p.styleFile;
          let id = p.id;
          let styleNum = p.styleNum;
          let styleLikes = p.styleLikes;
          let $copy = $origin.clone();
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $('<img>');
          $imgObj.attr('src', '../imgs/style/' + styleFile);
          $imgObj.attr('height', '200px');
          $copy.find('div.simg').empty().append($imgObj);
          $copy.find('div.stid').html('글쓴이 : ' + id);
          $copy.find('div.stlike').html('좋아요 : ' + styleLikes);
          $copy.find('div.stnum').html(styleNum);
          $parent.append($copy);
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

  //--홈페이지 실행 시 인기상품,STYLE 목록 보여주기--//
  showzlist();
  showdlist();
  showslist();

  //인기상품 클릭하면 상세로 이동
  $('div.zzim').on('click', 'div.zzimlist', (e) => {
    let pNum = $(e.target).parents('div.zzimlist').find('div.pnum').html();
    location.href = './productdetail.html?pNum=' + pNum;
  });

  //마감임박상품 클릭하면 상세로 이동
  $('div.deadline').on('click', 'div.deadlinelist', (e) => {
    let pNum = $(e.target).parents('div.deadlinelist').find('div.pnum').html();
    location.href = './productdetail.html?pNum=' + pNum;
  });

  //Style 게시글 클릭하면 상세로 이동
  $('div.styleboard').on('click', 'div.styleboardlist', (e) => {
    let styleNum = $(e.target).parents('div.styleboardlist').find('div.stnum').html();
    location.href = './styleinfo.html?styleNum=' + styleNum;
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