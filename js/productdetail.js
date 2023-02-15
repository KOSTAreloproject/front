$(() => {
  //상품상세정보 START//
  function productinfo() {
    let url = backUrl + "/product/detail.do";
    let data = location.search.substring(1);
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "get",
      data: data,
      success: function (jsonObj) {
        console.log(jsonObj);
        let $right = $("div.right");
        let sFile = jsonObj[0].sFile;
        let sBrand = jsonObj[0].sBrand;
        let sName = jsonObj[0].sName;
        let sColor = jsonObj[0].sColor;
        let sGrade = jsonObj[0].sGrade;
        let sHopePrice = jsonObj[0].sHopePrice;
        let maxPrice = jsonObj[0].aPrice;
        if (maxPrice != 0) {
          $right.find("div.maxprice").html(maxPrice);
        }
        if ((maxPrice = 0)) {
          $right
          .find("div.maxprice")
          .html("최고입찰가 : 한번도 입찰되지 않은 상품");
        }
        let pNum = jsonObj[0].pNum;
        let sid = jsonObj[0].id;
        let sManagerComment = jsonObj[0].sManagerComment;
        let sOriginPrice = jsonObj[0].sOriginPrice;
        let sizeCategoryName = jsonObj[0].sizeCategoryName;
        let $imgObj = $("<img>");
        $imgObj.attr("src", "../imgs/" + sFile + ".jpg");
        $imgObj.attr("height", "300px");
        $imgObj.attr("href")
        $("div.simg").empty().append($imgObj);
        $right.find("div.sbrand").html(sBrand);
        $right.find("div.sname").html(sName);
        $right.find("div.scolor").html("상품색상 : " + sColor);
        $right
        .find("div.sizecategoryname")
        .html("상품사이즈 : " + sizeCategoryName);
        $right.find("div.soriginprice").html("발매가 : " + sOriginPrice);
        $right.find("div.sgrade").html("상품등급 : " + sGrade);
        $right.find("div.shopeprice").html("경매시작가 : " + sHopePrice);
        $right
        .find("div.smanagercomment")
        .html("관리자코멘트 : " + sManagerComment);
        $("div.pnum").html(pNum);
        $("div.sid").html(sid);
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //상품상세정보 END//

  //최근 입찰내역 START
  function recenttender() {
    let url = backUrl + "product/recenttender.do";
    let data = location.search.substring(1);
    $.ajax({
      url: url,
      method: "get",
      data: data,
      success: function (jsonObj) {
        console.log(jsonObj);
        $(jsonObj).each((index, p) => {
          let id = p.id;
          let aprice = p.aPrice;
          let $tr = $("<tr>", {});
          let $td1 = $("<td>", {text: id});
          let $td2 = $("<td>", {text: aprice});
          $tr.append($td1);
          $tr.append($td2);
          $("#tender").append($tr);
        });
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //최근 입찰내역 END//

  //화면실행시 실행될것들//
  productinfo();
  recenttender();

  //상품 입찰하기--START//
  $("#tsubmit").click((e) => {
    e.preventDefault();
    let pNum = $("div.pnum").text();
    let tenderprice = $("#tenderprice").val();
    let maxPrice = $("div.maxprice").text();
    let url = backUrl + "auction/add.do";
    if(tenderprice <= maxPrice){
      alert("최고 입찰가보다 높은 가격을 입력하세요.")
      return
    }
    $.ajax({
      url: url,
      data: {"id":id, "pNum":pNum, "aPrice":tenderprice},
      method: "get",
      success: function () {
        alert("입찰이 완료되었습니다.")
        location.href = "./productdetail.html?pNum=" + pNum;
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });
  //상품 입찰하기--END/
  
  
  //찜하기 START//
  $("#zsubmit").click((e) => {
    e.preventDefault();
    let pNum = $("div.pnum").text();
    let sid = $("div.sid").text();
    if(sid==id){
      alert("상품판매자는 찜하기를 등록할 수 없습니다.")
      return
    }
    let url = backUrl + "zzim/add.do";
    let data ={"pNum":pNum, "id":id}
    $.ajax({
      url: url,
      data: data,
      method: "get",
      success: function (jsonObj) {
        alert(jsonObj);
        location.href = "./productdetail.html?pNum=" + pNum;
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //찜하기 END//
  });
});
