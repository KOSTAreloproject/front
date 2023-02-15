$(() => {
//경매 남은 시간 계산하기 START//
  function Timer(date) {
    let targetDate = new Date(date).getTime(); // 경매마감일 설정
    let nowDate = new Date().getTime(); // 현재일 설정
    let countDate = targetDate - nowDate; // 남은 시간(두날짜의 차이)을 밀리초로 반환

    let secs = Math.floor((countDate / 1000) % 60); // 초
    let mins = Math.floor((countDate / (1000 * 60)) % 60); // 분
    let hours = Math.floor((countDate / (1000 * 60 * 60)) % 24); // 시간
    let days = Math.floor((countDate / (1000 * 60 * 60 * 24))); // 일
    let $timer = $('div.remaindate')
    if(countDate>0){
    $timer.html('남은시간 : ' +days+'일 ' +hours + '시간 '+mins+ '분 '+secs+'초')
    }
  }
  //경매 남은 시간 계산하기 END//

  //상품상세정보 START//
  function productinfo() {
    let url = backUrl + "product/detail.do";
    let data = location.search.substring(1);

    $.ajax({
      url: url,
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
          $right.find("div.maxprice>span.maxval").html(maxPrice+'원');
        }
         if(maxPrice == 0){
          $right.find("div.maxprice").append('한번도 입찰되지 않은 상품입니다.');
        }
        let pNum = jsonObj[0].pNum;
        let sid = jsonObj[0].id;
        let sManagerComment = jsonObj[0].sManagerComment;
        let sOriginPrice = jsonObj[0].sOriginPrice;
        let sizeCategoryName = jsonObj[0].sizeCategoryName;
        let pEndDate = jsonObj[0].pEndDate;
        //--경매 마감일 계산--
        setInterval(Timer, 1000, pEndDate)
        let $imgObj = $("<img>");
        $imgObj.attr("src", "../imgs/" + sFile + ".jpg");
         $imgObj.attr("width", "250px");
        $imgObj.attr("height", "250px");
        $imgObj.attr("href")
        $("div.simg").empty().append($imgObj);
        $right.find("div.sbrand").html(sBrand);
        $right.find("div.enddate").append(pEndDate);
        $right.find("div.sname").html(sName);
        $right.find("div.scolor").append(sColor);
        $right.find("div.sizecategoryname").html("상품사이즈 : " + sizeCategoryName);
        $right.find("div.soriginprice").append(sOriginPrice +"원");
        $right.find("div.sgrade").append(sGrade);
        $right.find("div.shopeprice>span.hopeval").append(sHopePrice +"원");
        $right.find("div.smanagercomment").html(sManagerComment);
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
        console.log(jsonObj)
        if(jsonObj.length == 0){
         $("div.rtender>fieldset").css("display","none");
         $("div.rtender").html("입찰 내역이 없습니다");
        }
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
    let url = backUrl + "auction/add.do";
    let id = "kkl3272"
    let sid = $("div.sid").text();
    let pNum = $("div.pnum").text();
    let tenderprice = $("#tenderprice").val();
    let sHopePrice = Number($("div.shopeprice>span.hopeval").text().split('원')[0]);
    let maxPrice = Number($("div.maxprice>span.maxval").text().split('원')[0]);
    console.log(typeof(tenderprice))
    console.log(typeof(sHopePrice));
     if(sid==id){
      alert("상품판매자는 입찰에 참여하실수 없습니다.")
      return
    }
    
    if(maxPrice == 0){
      if(tenderprice <= sHopePrice){
      alert("희망 판매가보다 높은 가격을 입력하세요")
      return
    }
  }
    if(maxPrice != 0){
    if(tenderprice <= maxPrice){
      alert("최고 입찰가보다 높은 가격을 입력하세요.")
      return
    }
  }
    $.ajax({
      url: url,
      data: {"pNum":pNum, "aPrice":tenderprice, "id":id},
      method: "get",
      success: function () {
        alert("입찰이 완료되었습니다.")
        location.href = './productdetail.html?pNum='+pNum
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
    let id ="bbb";
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
        return
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
    //찜하기 END//
  });
});
