$(() => {
  //모달창 가리기
   $("div#popup_background").hide();
  //화면실행시 실행될것들//
  let num = location.search.substring(6)
  productinfo()
  recenttender(num)
  autotenderrefresh()
  //경매 남은 시간 계산하기 START//
  function Timer(date) {
    let targetDate = new Date(date).getTime(); // 경매마감일 설정
    let nowDate = new Date().getTime(); // 현재일 설정
    let countDate = targetDate - nowDate; // 남은 시간(두날짜의 차이)을 밀리초로 반환

    let secs = Math.floor((countDate / 1000) % 60) // 초
    let mins = Math.floor((countDate / (1000 * 60)) % 60) // 분
    let hours = Math.floor((countDate / (1000 * 60 * 60)) % 24) // 시간
    let days = Math.floor((countDate / (1000 * 60 * 60 * 24))) // 일
    let $timer = $('div.remaindate')
    if(countDate>0){
    $timer.html('남은시간 : ' +days+'일 ' +hours + '시간 '+mins+ '분 '+secs+'초')
    }
  }
  //경매 남은 시간 계산하기 END//
  //상품상세정보 START//
  function productinfo() {
     let pNum = location.search.substring(6) 
    let url = backUrl + "product/shoplist/"+pNum
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      success: function (jsonObj) {
        let $right = $("div.right")
        let sBrand = jsonObj.sbrand
        let sName = jsonObj.sname
        let sColor = jsonObj.scolor
        let sGrade = jsonObj.sgrade
        let sHopePrice = jsonObj.shopePrice
        let maxPrice = jsonObj.maxPrice
        let sNum = jsonObj.snum
        let pNum = jsonObj.pnum
        let sid = jsonObj.id
        let sType = jsonObj.stype
        if(sType =='하의'){
          sType = 'bottom'
        }
        if(sType =='상의'){
          sType = 'top'
        }
        if(sType =='신발'){
          sType = 'shoes'
        }
        let sManagerComment = jsonObj.managerComment
        let sOriginPrice = jsonObj.soriginPrice
        let sizeCategoryName = jsonObj.sizeCategoryName
        let pEndDate = jsonObj.pendDate
        setInterval(Timer, 1000, pEndDate)
        
        if (maxPrice != 0) {
           $right.find("div.maxprice>span.maxval").html(maxPrice+'원')
          }
          if(maxPrice == 0){
           $right.find("div.maxprice").append('<strong>한번도 입찰되지 않은 상품입니다.</strong>')
         }
        //--경매 마감일 계산--
        let imgurl = backUrl + "product/detail/img/"
        let $imgObj = $("div.simg img")
        //--이미지 띄우기 START--
        $.ajax({
          xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
          url: imgurl+sNum,
          method: "get",
          success: function (result) {
          let blobStr = URL.createObjectURL(result)
          $($imgObj).attr('src', blobStr)
        },
        error: function (xhr) {
        console.log(xhr.status)
      },
   });
        // --이미지 띄우기 END--
        // --찜하기 여부 확인 START--
        let chzval = 0
        let chzurl = backUrl + "product/detail/ckzzim?pNum="
          $.ajax({
          xhrFields: {
          withCredentials: true,
        },
          url: chzurl+pNum,
          method: "get",
          success: function (result) {
            chzval = result
             $("div.chzval").html(chzval)
          if(result==1){
            $(".material-symbols-outlined").css("font-variation-settings", "'FILL' 1, 'wght' 700, 'GRAD' 200, 'opsz' 48")
          }
        },
        error: function (xhr) {
        console.log(xhr.status)
      },
   });
   // --찜하기 여부 확인 END--
        $right.find("div.sbrand").html(sBrand)
        let targetDate = new Date(pEndDate).getTime() // 경매마감일 설정
        let nowDate = new Date().getTime()// 현재일 설정
        let countDate = targetDate - nowDate
        if(countDate <0){
          $right.find("div.enddate").append('<strong>경매가 마감 되었습니다.</strong>')
          $right.find("div.inserttender").css('display', 'none')
        }else{
        $right.find("div.enddate").append(pEndDate)
        }
        $right.find("div.sname").html(sName)
        $right.find("div.scolor").append(sColor)
        $right.find("div.sizecategoryname").append(sizeCategoryName)
        $right.find("div.soriginprice").append(sOriginPrice +"원")
        $right.find("div.sgrade").append(sGrade)
        $right.find("div.shopeprice>span.hopeval").append(sHopePrice +"원")
        $right.find("div.smanagercomment").append(sManagerComment)
        $right.find("div.sizeimg img").attr("src", '../imgs/shopdetail/'+sType+'.png')
        $("div.pnum").html(pNum)
        $("div.sid").html(sid)
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //상품상세정보 END//
  //최근 입찰내역 START
  function recenttender(pNum) {
    let url = backUrl + "product/recenttender/"+pNum
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: "get",
      success: function (jsonObj) {
        $(jsonObj).each((index, p) => {
           let id = p.id
          let aprice = p.aprice
          let adate = p.tenDate
          let $tr = $("<tr id='tlist'>")
          let $td1 = $("<td>", {text: id})
          let $td2 = $("<td>",{text: adate})
          let $td3 = $("<td>", {text: aprice+"원"})
          $tr.append($td1)
          $tr.append($td2)
          $tr.append($td3)
          $("#tender").append($tr)
          let nowDate = new Date()
          $("div.nowtime").html(nowDate.toLocaleString()+" 기준")
        });
        if(jsonObj.length == 0){
          $("div.rtender>fieldset").css("display","none")
          $("div.rtender").html("입찰 내역이 없습니다")
        }
      },        
      error: function (xhr) {
        console.log(xhr.status)
      },
    });
  }
  //최근 입찰내역 END//
   function tdrefresh() {
    $('tr#tlist').remove()
    recenttender(num)
  }
  //최근 입찰내역 새로고침 버튼 클릭시 할일 START//
  $("img#tdrefresh").click((e) =>{
    tdrefresh()
  })
  //최근 입찰내역 새로고침 버튼 클릭시 할일 END//
  function autotenderrefresh() {
    window.setInterval(tdrefresh, 1000*10);
  }
  
  //상품 입찰하기--START//
  $("#tsubmit").click((e) => {
    e.preventDefault();
    let url = backUrl + "auction/add"
    let tenderprice = $("#tenderprice").val();
    let data = {"pNum":num, "aPrice":tenderprice}
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      data: JSON.stringify(data),
      contentType: "application/json",
      method: "post",
      success: function (result) {
        let msg = result.msg
        $('#ask').html(msg)
        $("div#popup_background").show(); 
        $("#ok_btn").click(function (e) {
         $("div#popup_background").hide();
         location.href = frontUrl + 'shopproductdetail.html?pNum='+num
         });
            },
      error: function (xhr) {
        let text = xhr.responseText
        alert(text)
      },
    });
  });
  //상품 입찰하기--END/
  //찜하기 START//
   $("#addzzim").click((e) => {
    e.preventDefault()
    zzim();
   })
   function zzim(){
    let $chzval = $('div.chzval').text()
    let url = backUrl + "zzim/"+num
    if($chzval == 2){ //찜하기 없으면 추가
    $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: "post",
      success: function (result) {
        let msg = result.msg
        $('#ask').html(msg)
        $("div#popup_background").show(); 
        $("#ok_btn").click(function (e) {
         $("div#popup_background").hide();
         location.href = frontUrl + 'shopproductdetail.html?pNum='+num
         });
       },
       error: function (xhr) {
        alert(xhr.status)
      } 
    });
  }
  if($chzval == 1){ //찜하기 있으면 제거
     $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: "delete",
      success: function (result) {
       let msg = result.msg
        $('#ask').html(msg)
        $("div#popup_background").show(); 
        $("#ok_btn").click(function (e) {
         $("div#popup_background").hide();
         location.href = frontUrl + 'shopproductdetail.html?pNum='+num
         });
       },
       error: function (xhr) {
        alert(xhr.status)
      } 
    });
  } 
}
//찜하기 END//
  })
