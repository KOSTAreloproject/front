$(()=>{
  //모달창 가리기
   $("div#popup_background").hide();
   
  let start = 0 
  let url = backUrl + "product/shop/"
  //검색 모달에서 가져온 querystring//
  let nNum = window.location.search.split('?')[1]
  //검색 모달에서 가져온 querystring 조건 변수 선언//
  let cd = 'prodCate='+nNum
  //shop버튼으로 직접 페이지 이동했을때 전체 목록으로 보여주기 한 조건 변수 초기화//
  let condition = '' 
  //--검색 모달에서 접근했을 경우 목록 보여주기 START--//
  if(nNum != undefined){
    $('input[name=prodCate]').prop('checked',false)
    $('input[value='+nNum+']').prop('checked',true)
    showlist(url,start,cd)
    $('div.more>button').click(function(){
      start += 3
      showlist(url, start, cd)
    })
  //--검색 모달에서 접근했을 경우 목록 보여주기 START--//
  //--SHOP 버튼으로 접근했을 경우 목록 보여주기 START--//  
} else{
  showlist(url,start,condition)
  $('div.more>button').click(function(){
    start += 3
    showlist(url, start, condition)
  })
}
//--SHOP 버튼으로 접근했을 경우 목록 보여주기 END--//  
//--페이지 로딩시 상품목록 출력하기(최신순) START--//
function showlist(url, start, condition) {

  let $origin = $("div.shoplist").first()
  if(start ==0){
    $("div.shoplist").not(":first-child").remove()
  }
  $origin.show()
  $.ajax({
    xhrFields: { 
      withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
    },
    url: url+start,
    method: "get",
    data: condition,
    success: function (jsonObj) {
      let $origin = $("div.shoplist").first()
      let $parent = $("div.shop")
      let readcount = jsonObj.length
      if(jsonObj.length != 0){
      $("div.listcount").html(start + readcount)
      }
      let $listcount = $("div.listcount").text()
       if(start>=$listcount)
         {
           $("div#popup_background").show();
         }
      
      $(jsonObj).each((index, p) => {
        let $copy = $origin.clone()
        let sName = p.sname
        let sHopePrice = p.shopePrice
        let maxPrice = p.maxPrice
        let pNum = p.pnum
                    let enddate = p.pendDate.substring(0,10)
                    let sNum = p.snum
                    if (maxPrice != 0) {
                      sHopePrice = maxPrice
                      $copy.find("div.aprice").html("최고입찰가 : " + sHopePrice + "원")
                    }
                    if(maxPrice == 0){
                      $copy.find("div.aprice").html("희망판매가 : " + sHopePrice + "원")
                    }
                    let $imgObj = $("<img>")
                    $imgObj.attr("id", 'shop'+sNum)
                    $imgObj.attr("width","200px")
                    $imgObj.attr("height", "200px")
                    $copy.find("div.img").empty().append($imgObj)
                    $copy.find("div.sname").html(sName)
                    $copy.find("div.enddate").html("경매마감일 : " + enddate)
                    $copy.find("div.pnum").html(pNum)
                    $parent.append($copy)
                    imgShow(sNum)
                    $("div.pnum").css("display","none")
                  })
                  $origin.hide()
                  //condition=''
                },
                error: function (xhr) {
                  alert(xhr.status)
                },
              })
            }
//--페이지 로딩시 상품목록 출력하기(최신순) END--//
//-- 이미지 출력 START--//
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
                  $('img#shop'+num).attr('src', blobStr)
                },
                error: function (xhr) {
                },
              })
            }
//-- 이미지 출력 END--//
//--1차필터 (왼쪽상단) 체크 또는 텍스트 클릭시 필터(왼쪽 prodCate) 조건 한개만 선택되게 하기 START--//
$('input[name="prodCate"]').change(function() {
  $('input[name="prodCate"]').not(this).prop('checked', false)
  start = 0
  condition = 'prodCate='+$(this).val()
  showlist(url, start, condition)
})
////--1차필터 (왼쪽상단) 체크 또는 텍스트 클릭시 필터(왼쪽 prodCate) 조건 한개만 선택되게 하기 END--//
//--2차필터 (정렬조건) 조건 선택시 목록 정렬 START--//
$("a").click(function(e){
    e.preventDefault()
    start = 0
    $sortcondition = $(e.target).attr("id")
    if($sortcondition == 'no'){
      pluscondition = condition+'&tender='+$sortcondition
      showlist(url, start, pluscondition)

    }else{
      pluscondition = condition+'&sort='+$sortcondition
      showlist(url, start, pluscondition)
    }
})
//--2차필터 (정렬조건) 조건 선택시 목록 정렬 END--//
//--정렬조건 버튼 클릭했을때 보여주기 START--//
$('button.sorttitle,div.sortnav>img').click(function(e){
    e.preventDefault()
    let $sortlist = $('div.sortnav>div.sortlist')
        if($sortlist.css('display','none')){
               $sortlist.css('display','block')
        }
 })
//--정렬조건 버튼 클릭했을때 보여주기 END--//
//--다른 공간 클릭하여 정렬조건 리스트 닫기 START--//
$('button.sorttitle').blur(function(){
     let $sortlist = $('div.sortnav>div.sortlist')
     setTimeout(() => {
    $sortlist.css('display','none')
     }, 200)
})
//--다른 공간 클릭하여 정렬조건 리스트 닫기 END--//
//--상품 클릭했을때 상세정보 페이지 이동 START--//
 $('div.shop').on('click', 'div.shoplist', (e) => {
    let pNum = $(e.target).parents('div.shoplist').find('div.pnum').html()
    location.href = frontUrl + 'shopproductdetail.html?pNum=' + pNum
  })
//--상품 클릭했을때 상세정보 페이지 이동 END--//
//--모달창 클릭되었을 때 할일 START--
  $("#ok_btn").click(function (e) {
    $("div#popup_background").hide();
  });
//--모달창 클릭되었을 때 할일 END--
})