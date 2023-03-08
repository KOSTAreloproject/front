$(()=>{
zzimlist(1)
//--검색버튼을 눌렀을때 모달창 실행 START--
 $(document).on('click', 'div.bottom > nav > ul > li.search > img',(e) =>{
 $('#search_popup_background').css('display','block')
 $('#spopup').css('display','block')
})    
//--검색버튼을 눌렀을때 모달창 실행 END--
//--닫기버튼(x)을 클릭했을 때 할일 START--
 $(document).on('click', '#search_popup_background>img',(e) =>{
 $('#search_popup_background').css('display','none')
 $('#spopup').css('display','none')
 })
//--닫기버튼(x)을 클릭했을 때 할일 END-- 
//--상의카테고리 버튼을 눌렀을때 실행 START--//
 $(document).on('click', '#top img',(e) =>{
  param = $(e.target).parents().attr('id')
  location.href = './shoplist.html?'+param
 })  
//--상의카테고리 버튼을 눌렀을때 실행 END--//
//--하의카테고리 버튼을 눌렀을때 실행 START--//
 $(document).on('click', '#bottom img',(e) =>{
 param = $(e.target).parents().attr('id')
 location.href = './shoplist.html?'+param
 })    
//--하의카테고리 버튼을 눌렀을때 실행 END--//
//--신발카테고리 버튼을 눌렀을때 실행 START--//
      $(document).on('click', '#shoes img',(e) =>{
         param = $(e.target).parents().attr('id')
        location.href = './shoplist.html?'+param
        })  
//--신발카테고리 버튼을 눌렀을때 실행 END--//
//--검색창에서 이름으로 검색시 결과목록 가져오기 START--//
let $originsearch = $("div.searchresultslist").first()
$("div.searchresultslist").not(":first-child").remove()
$("#searchtext").keyup(function () {
      $originsearch.show()
      let $keyword =  ($('#searchtext').val())
      let encode = encodeURIComponent($keyword)
      let url = backUrl+ 'product/search?cp=1&keyword='
      if($keyword.length >= 2){
      $.ajax({
         xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
        },
         method: "GET",
         url: url+encode,
         success: function(result){
          let $parent = $('div.searchresults')
          let sNum=''
          $(result.list).each((index, p) =>{
            console.log(result.list)
            let $copy = $originsearch.clone()
            sNum = p.snum
            let pNum = p.pnum
            let sName = p.sname
            let maxPrice = p.maxPrice
            let hopePrice = p.shopePrice
            let endDate = p.pendDate.substring(0,10)
            $copy.find('div.searchsnum').html(sNum)
            $copy.find('div.searchpnum').html(pNum)
            if (maxPrice != 0) {
              hopePrice = maxPrice
              $copy.find('div.searchprice').html(hopePrice + '원')
              }
              if (maxPrice == 0) {
                $copy.find('div.searchprice').html(hopePrice + '원')
              }
              let $imgObj = $("<img>")
              $imgObj.attr("id", 'search'+sNum)
              $imgObj.attr("width","150px")
              $imgObj.attr("height", "150px")
              $copy.find("div.searchimg").empty().append($imgObj)
              $copy.find('div.searchpname').html(sName)
              $copy.find('div.searchpenddate').html(endDate)
              $parent.append($copy)
              searchimgShow(sNum)
                         })
           $originsearch.hide()
           $('div.searchresults').css('overflow','scroll')
           $('div.searchresults').css('height','600px')
           $('#searchhr').css('visibility','inherit')
          },
          error: function (xhr) {
          }
        })
      }else {
        $("div.searchresultslist").not(":first-child").remove()
        $('div.searchresults').css('overflow','')
        $('div.searchresults').css('height','')
      }
    })
//--검색창에서 이름으로 검색시 결과목록 가져오기 END--//
//-- 검색결과 이미지 출력 START--//
    function searchimgShow(num){
      $.ajax({
                xhrFields: {
                  responseType: 'blob',
                  withCredentials: true,
                  cache: false, 
                },
                url: backUrl+'product/list/img/'+num,
                method: "get",
                success: function (result) {
                  let blobStr = URL.createObjectURL(result)
                  $('img#search'+num).attr('src', blobStr)
                },
                error: function (xhr) {
                },
              })
            }
//--검색결과 이미지 출력 END--//
//--사용자의 찜목록 출력 START//   
function zzimlist (cp) {
  let url = backUrl + 'zzim/'+cp
  let $origin = $("div.wishlist").first()
  $("div.wishlist").not(":first-child").remove()
  $origin.show();
  $.ajax({
         xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
        url: url,
        method: "get",
        success: function (jsonObj) {
            let $origin = $("div.wishlist").first()
            let $parent = $("div.wish");
            $(jsonObj.list).each((index, p) => {
                let pNum = p.pnum
                let sName = p.sname
                let sHopePrice = p.shopePrice;
                let maxPrice = p.maxPrice;
                let sNum = p.snum
                if (maxPrice != 0) {
                    sHopePrice = maxPrice;
                }
          let enddate = p.pendDate;
          let $copy = $origin.clone();
          let $imgObj = $("<img>")
          $imgObj.attr("id",'sw'+sNum)
          $imgObj.attr("width", "150px")
          $imgObj.attr("height", "150px")
          $copy.find("div.swimg").empty().append($imgObj)
          $copy.find("div.swpnum").html(pNum)
          $copy.find("div.swname").html(sName)
          $copy.find("div.swprice").html(sHopePrice + "원")
          $copy.find("div.swenddate").html(enddate +"까지")
          $parent.append($copy)
          imgShow(sNum)
        });
        $origin.hide();
    },
    error: function (xhr) {
        alert(xhr.status);
    },
});
    }
//--사용자의 찜목록 출력 END//
//--찜 목록 이미지 출력 START//
 function imgShow(num){
    $.ajax({
      xhrFields: {
        responseType: 'blob',
        withCredentials: true,
        cache: false, 
      },
      url: backUrl+'product/list/img/'+num,
      method: "get",
      success: function (result) {
      let blobStr = URL.createObjectURL(result)
      $('img#sw'+num).attr('src', blobStr)
    },
    error: function (xhr) {
      console.log(xhr.status)
    },
  })
}
//--찜 목록 이미지 출력 END//
//상품사진 클릭시 상세화면 이동 START//
    $("div.wish").on("click", "div.zimg", (e) => {
        let pNum = $(e.target).parents("div.wishlist").find("div.zpnum").html();
        location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
    })
//상품사진 클릭시 상세화면 이동 END//
//상품사진 클릭시 상세화면 이동 START//
    $("div.myzmoreview>button").click(()=>{
     location.href = frontUrl +'mypageZzimList.html'
    })
//상품사진 클릭시 상세화면 이동 END//

// $(window).scroll(function(){
//   var scrT = $(window).scrollTop();
//   console.log(scrT); //스크롤 값 확인용
//   if(scrT == $(document).height() - $(window).height()){
//   	//스크롤이 끝에 도달했을때 실행될 이벤트
//   } else {
//   	//아닐때 이벤트
//   }
// })
})