//--사용자의 찜목록 출력 START//
$(() => { 
    zzimlist(1)
    function zzimlist (cp) {
    let url = backUrl + 'zzim/'+cp
    let $origin = $("div.mywishlist").first();
    $("div.mywishlist").not(":first-child").remove();
    $origin.show();
    $.ajax({
         xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
        url: url,
        method: "get",
        success: function (jsonObj) {
            
            let $parent = $("div.mypwish")
            let sNum = ""
            $(jsonObj.list).each((index, w) => {
                let pNum = w.pnum
                let sBrand = w.sbrand
                let sName = w.sname
                let sizeCategoryName = w.sizeCategoryName;
                let sHopePrice = w.shopePrice;
                let maxPrice = w.maxPrice;
                sNum = w.snum
                if (maxPrice != 0) {
                    sHopePrice = maxPrice;
                }
          let enddate = w.pendDate;
          let $copy = $origin.clone();
          let $imgObj = $("<img>")
          $imgObj.attr("id",sNum)
          $imgObj.attr("width", "200px")
          $imgObj.attr("height", "200px")
          $copy.find("div.wzimg").empty().append($imgObj)
          $copy.find("div.wpnum").html(pNum)
          $copy.find("div.wsbrand").html(sBrand)
          $copy.find("div.wsname").html(sName)
          $copy.find("div.wsizecategoryname").append(sizeCategoryName)
          $copy.find("div.wenddate").append(enddate)

          $parent.append($copy)
          zimgShow(sNum)
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
      console.log(result)
      let blobStr = URL.createObjectURL(result)
      $('img#'+num).attr('src', blobStr)
    },
    error: function (xhr) {
      console.log(xhr.status)
    },
  })
}
//--찜 목록 이미지 출력 END//
//찜하기 삭제 START//
 $("div.wish").on("click", "button.zsubmit", (e) =>{
    let pNum = $(e.target).parents("div.wishlist").find("div.pnum").html();
    let url = backUrl + "zzim/"+pNum;
       $.ajax({
      xhrFields: {
        withCredentials: true, // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
      },
      url: url,
      method: "delete",
      success: function (result) {
       let msg = result.msg
        alert(msg)
       location.href = frontUrl + 'mypage_zzimlist.html'
       },
       error: function (xhr) {
        alert(xhr.status)
      } 
    });
})
    
    //찜하기 삭제 END//
    //상품사진 클릭시 상세화면 이동 START//
    $("div.mypwish").on("click", "div.wzimg>img", (e) => {
        let pNum = $(e.target).parents("div.mywishlist").find("div.wpnum").html();
        location.href = frontUrl +'shopproductdetail.html?pNum=' + pNum
    })
    //상품사진 클릭시 상세화면 이동 END//

    //입찰하러 가기 버튼클릭시 할일 START//
    $("div.wish").on("click", "button.tsubmit", (e) =>{
        e.preventDefault();
        let pNum = $(e.target).parents("div.wishlist").find("div.pnum").html();
        location.href = "./productdetail.html?pNum=" + pNum;
    //입찰하러 가기 버튼클릭시 할일 END//
  });

  
});

