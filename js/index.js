$(() => {
  //--인기상품 출력(찜하기순) START--//
  function showzlist() {
    let url = backUrl + "/product/list.do";
    let $origin = $("div.zzimlist").first();
    $("div.zzimlist").not(":first-child").remove();
    $origin.show();
    let condition = "condition=zzim";
    $.ajax({
      url: url,
      method: "get",
      data: condition,
      success: function (jsonObj) {
        console.log(jsonObj);
        let $origin = $("div.zzimlist").first();
        let $parent = $("div.zzim");
        $(jsonObj).each((index, p) => {
          let sFile = p.sFile;
          let sName = p.sName;
          let sHopePrice = p.sHopePrice;
          let maxPrice = p.aPrice;
          let pNum = p.pNum;
          if (maxPrice != null) {
            sHopePrice = maxPrice;
          }
          let enddate = p.pEndDate;
          let $copy = $origin.clone();
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $("<img>");
          $imgObj.attr("src", "../imgs/" + sFile + ".jpg");
          $imgObj.attr("height", "200px");
          $copy.find("div.zimg").empty().append($imgObj);
          $copy.find("div.sname").html("상품이름 : " + sName);
          $copy.find("div.aprice").html("최고입찰가 : " + sHopePrice + "원");
          $copy.find("div.enddate").html("경매마감일 : " + enddate);
          $copy.find("div.pnum").html(pNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--인기상품 출력(찜하기순) END--//
  //--스타일게시판 출력(인기순) START--//
  function showslist() {
    let url = backUrl + "/style/list.do";
    let $origin = $("div.styleboardlist").first();
    let condition = "styleCode=styleLikes&currentPage=1";
    $("div.styleboardlist").not(":first-child").remove();
    $origin.show();
    $.ajax({
      url: url,
      data: condition,
      method: "get",
      success: function (jsonObj) {
        console.log(jsonObj);
        let list = jsonObj.pb.list;
        let $origin = $("div.styleboardlist").first();
        let $parent = $("div.styleboard");
        $(list).each((index, p) => {
          let styleFile = p.styleFile;
          let id = p.id;
          let styleNum = p.styleNum;
          let styleLikes = p.styleLikes;
          let $copy = $origin.clone();
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $("<img>");
          $imgObj.attr("src", "../imgs/style/" + styleFile);
          $imgObj.attr("height", "200px");
          $copy.find("div.simg").empty().append($imgObj);
          $copy.find("div.stid").html("글쓴이 : " + id);
           $copy.find("div.stlike").html("좋아요 : " + styleLikes);
          $copy.find("div.stnum").html(styleNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--스타일게시판 출력(인기순) END--//
  //--홈페이지 실행 시 인기상품,STYLEㅁ 목록 보여주기--//
  showzlist();
  showslist();
  //상품 클릭하면 상세로 이동
  $("div.zzim").on("click", "div.zzimlist", (e) => {
    let pNum = $(e.target).parents("div.zzimlist").find("div.pnum").html();
    location.href = "./productdetail.html?pNum=" + pNum;
  });
  //게시글 클릭하면 상세로 이동
  $("div.styleboard").on("click", "div.styleboardlist", (e) => {
    let styleNum = $(e.target)
      .parents("div.styleboardlist")
      .find("div.stnum")
      .html();
    location.href = "./styleinfo.html?styleNum=" + styleNum;
  });
  //상품이름 검색어 입력하여 목록으로 이동
  $("#submit").click((e) => {
    e.preventDefault();
    let prodName = $("#prodName").val();
    location.href = "./productlist.html?prodName" + prodName;
  });
});
