$(() => { 
//모달창 가리기
   $("div#popup_background").hide();
//--사용자의 찜목록 출력 START//
    function zzimlist (url, cp) {
    let $origin = $("div.mywishlist").first()
    $("div.mywishlist").not(":first-child").remove()
    $origin.show();
    $.ajax({
         xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
        url: url + cp,
        method: "get",
        success: function (jsonObj) {
            
            let $parent = $("div.mypwish")
            let sNum = ""
            let totalPage = jsonObj.totalpage
            let totalCount = jsonObj.totalcnt
            $(jsonObj.list).each((index, w) => {
                let pNum = w.pnum
                let sBrand = w.sbrand
                let sName = w.sname
                let sizeCategoryName = w.sizeCategoryName
                let sHopePrice = w.shopePrice
                let maxPrice = w.maxPrice
                sNum = w.snum
                if (maxPrice != 0) {
                    sHopePrice = maxPrice
                }
          let enddate = w.pendDate
          let targetDate = new Date(enddate).getTime() // 경매마감일 설정
          let nowDate = new Date().getTime()// 현재일 설정
          let countDate = targetDate - nowDate
          let $copy = $origin.clone()
          $copy.find("div.goshop>button.gssubmit").append('<br><br>'+sHopePrice+'원')
          if(countDate<=0){
            $copy.find("div.wenddate").append(enddate+"<strong>(경매 마감)</strong>")
          }else{    
            $copy.find("div.wenddate").append(enddate)
          }
          let $imgObj = $("<img>")
          $imgObj.attr("id",'st'+sNum)
          $imgObj.attr("width", "200px")
          $imgObj.attr("height", "200px")
          $copy.find("div.wzimg").empty().append($imgObj)
          $copy.find("div.wpnum").html(pNum)
          $copy.find("div.wsbrand").html(sBrand)
          $copy.find("div.wsname").html(sName)
          $copy.find("div.wsizecategoryname").append(sizeCategoryName)
          $parent.append($copy)
          zimgShow(sNum)
        })
        $origin.hide()
        $('div.pagecount').html(totalPage)
        let $pageGroup = $('div.pagination')
        let pageGroupStr = ''
        let startPage = cp
        let endPage = totalCount
        // if(startPage > 1){
        //   pageGroupstr += '<span id="pagenum"' + (startPage - 1) + '"></span>'
        // }
        if(endPage > totalPage) {
          endPage = totalPage
        }
        pageGroupStr += '<span id="prev">&laquo;</span>'
        for (let i = startPage; i <= totalPage; i++) {
          if (i == cp) {
            pageGroupStr +='<span class="active" id="pagenum">'+i+'</span>'
          } else {
            pageGroupStr +='<span id="pagenum">'+i+'</span>'
          }
        }
        // if (endPage < totalPage) {
        //   pageGroupStr += '<span id="pagenum"'+ (endPage + 1) +'></span>'
        // }
        $pageGroup.html(pageGroupStr);
        $pageGroup.append('<span id="next">&raquo;</span>')
    },
    error: function (xhr) {
        alert(xhr.status);
    },
})
 }
 let url = backUrl + 'zzim/'
 zzimlist(url, 1)   
//--사용자의 찜목록 출력 END//
//--찜 목록 이미지 출력 START//
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
      let blobStr = URL.createObjectURL(result)
      $('img#st'+num).attr('src', blobStr)
    },
    error: function (xhr) {
      console.log(xhr.status)
    },
  })
}
//--찜 목록 이미지 출력 END//
//--찜하기 삭제 START//
 $("div.mypwish").on("click", "button.zsubmit", (e) =>{
    let pNum = $(e.target).parents("div.mywishlist").find("div.wpnum").html();
    let url = backUrl + "zzim/"+pNum;
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
         location.href = frontUrl + 'mypageZzimList.html'
         });
      },
       error: function (xhr) {
        alert(xhr.status)
      } 
    })
})
//찜하기 삭제 END//
//상품사진 클릭시 상세화면 이동 START//
    $("div.mypwish").on("click", "div.wzimg>img", (e) => {
        let pNum = $(e.target).parents("div.mywishlist").find("div.wpnum").html()
        location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
    })
//상품사진 클릭시 상세화면 이동 END//
//입찰하러 가기 버튼클릭시 할일 START//
    $("div.mypwish").on("click", "button.gssubmit", (e) =>{
        e.preventDefault();
        let pNum = $(e.target).parents("div.mywishlist").find("div.wpnum").html()
        location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
      })
//입찰하러 가기 버튼클릭시 할일 END//
//페이지 번호가 클릭되었을 때 할 일 START//
  $('div.pagination').on('click', 'span#pagenum:not(.current)', (e) => {
    e.preventDefault();
    let $page = $(e.target).text()
    let $activePageNumber=$('#pagenum.active')
    if($activePageNumber){
      $activePageNumber.removeClass('active')
    }
     $(e.target).addClass('active')
     zzimlist(url,$page)
    })
// -- 페이지 번호가 클릭되었을 때 할 일 END --
// -- 페이지 다음 버튼을 클릭했을 때 할일 START--
  $(document).on('click', 'span#next', (e) => {
    e.preventDefault()
    let $pagecount = Number($('div.pagecount').text())
    let $cp = Number($('#pagenum.active').text())
    let $activePageNumber=$('#pagenum.active')
    if($pagecount == $cp){
      alert("마지막 목록 입니다.")
      return
    }
    if($activePageNumber){
      $activePageNumber.removeClass('active')
    }
    zzimlist(url,$cp+1)
  })
// -- 페이지 다음 버튼을 클릭했을 때 할일 END--
// -- 페이지 이전 버튼을 클릭했을 때 할일 START--
  $(document).on('click', 'span#prev', (e) => {
    e.preventDefault()
    let $cp = Number($('#pagenum.active').text()) //현재 페이지
    let $activePageNumber=$('#pagenum.active')
    if($cp ==1){
      alert("첫번째 목록 입니다.")
      return
    }
    if($activePageNumber){
      $activePageNumber.removeClass('active')
    }
    zzimlist(url,$cp-1)
  })
// -- 페이지 이전 버튼을 클릭했을 때 할일 END--

});

