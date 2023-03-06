$(()=>{

    zzimlist(1)
    //--검색어를 입력하고 엔터키를 눌렀을때 실행 START
    // $('#searchform>input').keydown(function (e){
    //     if(e.keyCode ==13){
    //     location.href = './shoplist.html'  
    //     }
    // })
    //--검색어를 입력하고 엔터키를 눌렀을때 실행 END
    //--상의카테고리 버튼을 눌렀을때 실행 START
      $(document).on('click', '#top',(e) =>{
        location.href = frontUrl +'shoplist.html'
        })  
    //--상의카테고리 버튼을 눌렀을때 실행 END
    //--하의카테고리 버튼을 눌렀을때 실행 START
      $(document).on('click', '#bottom',(e) =>{
        location.href = './shoplist.html'  
        })  
    //--하의카테고리 버튼을 눌렀을때 실행 END
    //--신발카테고리 버튼을 눌렀을때 실행 START
     $(document).on('click', '#shoes',(e) =>{
        location.href = './shoplist.html'  
        })  
    //--신발카테고리 버튼을 눌렀을때 실행 END
 



//--신발카테고리 버튼을 눌렀을때 실행 START
//--검색버튼을 눌렀을때 모달창 실행 START--
  $(document).on('click', 'div.bottom > nav > ul > li.search > img',(e) =>{
    e.preventDefault();
    $('#search_popup_background').css('display','block')
    $('#spopup').css('display','block')
    })    
//--검색버튼을 눌렀을때 모달창 실행 END--
//--닫기버튼(x)을 클릭했을 때 할일 START--
    $(document).on('click', '#search_popup_background>img',(e) =>{
    e.preventDefault();
    $('#search_popup_background').css('display','none')
    $('#spopup').css('display','none')
    })
//--닫기버튼(x)을 클릭했을 때 할일 END-- 
//--사용자의 찜목록 출력 START//   
function zzimlist (cp) {
        let url = backUrl + 'zzim/'+cp
    let $origin = $("div.wishlist").first();
    $("div.wishlist").not(":first-child").remove();
    $origin.show();
    $.ajax({
         xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
        url: url,
        method: "get",
        success: function (jsonObj) {
            let cnt = jsonObj.totalcnt
            $("div.mywish>span.cnt").html("("+cnt+")")
            let $origin = $("div.wishlist").first()
            let $parent = $("div.wish");
            $(jsonObj.list).each((index, p) => {
                let pNum = p.pnum
                let sBrand = p.sbrand
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
          $imgObj.attr("id",sNum)
          $imgObj.attr("width", "100px")
          $imgObj.attr("height", "100px")
          $copy.find("div.zimg").empty().append($imgObj)
          $copy.find("div.zpnum").html(pNum)
          $copy.find("div.zbrand").html(sBrand)
          $copy.find("div.zname").html(sName)
          $copy.find("div.zprice").html(sHopePrice + "원")
          $copy.find("div.zenddate").html(enddate +"까지")
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
      $('img#'+num).attr('src', blobStr)
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
    $("div.zmoreview>button").click(()=>{
     location.href = frontUrl +'mypage_zzimlist.html'
    })
//상품사진 클릭시 상세화면 이동 END//

$("#searchtext").keyup(function () {
      let $origin = $("div.searchresultslist").first()
      $("div.searchresultslist").not(":first-child").remove()
      $origin.show()
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
          $(result.list).each((index, p) =>{
             let $copy = $origin.clone()
              let sName = p.sname
              let maxPrice = p.maxPrice
              let hopePrice = p.hopePrice
              let endDate = p.pendDate
              if (maxPrice != 0) {
              sHopePrice = maxPrice
              $copy.find('div.price').html(hopePrice + '원')
              }
              if (maxPrice == 0) {
              $copy.find('div.price').html(hopePrice + '원')
              }
              $copy.find('div.pname').html(sName)
              $copy.find('div.senddate').html(endDate)
              $parent.append($copy)
            })
            $origin.hide()
         },
         error: function (xhr) {
         }
      })
      }else {
        $('#searchresults').html('')
      }
    
    })
  

})