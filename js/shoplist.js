$(()=>{
    //--페이지 로딩시 상품목록 출력하기(인기순) START--//
    let condition = ''
    function showlist(condition) {
        let url = backUrl + "product/shop/0"
        let $origin = $("div.shoplist").first()
        $("div.shoplist").not(":first-child").remove()
        $origin.show();
        $.ajax({
            xhrFields: { 
                withCredentials: true // 클라이언트와 서버가 통신할때 쿠키와 같은 인증 정보 값을 공유하겠다는 설정
            },
            url: url,
            method: "get",
            data: condition,
            success: function (jsonObj) {
                console.log(jsonObj)
                let $origin = $("div.shoplist").first()
                let $parent = $("div.shop");
                $(jsonObj).each((index, p) => {
                    let $copy = $origin.clone()
                    let sName = p.sname
                    let sHopePrice = p.shopePrice
                    let maxPrice = p.maxPrice
                    let pNum = p.pnum
                    let enddate = p.pendDate.substring(0,10)
                    let sNum = p.snum
                    
                     if (maxPrice != 0) {
                      sHopePrice = maxPrice;
                     $copy.find("div.aprice").html("최고입찰가 : " + sHopePrice + "원");
                    }
                    if(maxPrice == 0){
                     $copy.find("div.aprice").html("희망판매가 : " + sHopePrice + "원");
                      }
                    // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
                    // $copy.find('div.img').html(imgStr)
                    let $imgObj = $("<img>")
                    $imgObj.attr("id", sNum);
                    $imgObj.attr("height", "250px");
                    $copy.find("div.img").empty().append($imgObj);
                    $copy.find("div.sname").html(sName);
          $copy.find("div.enddate").html("경매마감일 : " + enddate);
          $copy.find("div.pnum").html(pNum);
          $parent.append($copy);
          imgShow(sNum)
          $("div.pnum").css("display","none")
        });
        $origin.hide();
    },
    error: function (xhr) {
        alert(xhr.status);
    },
});
}
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
      let blobStr = URL.createObjectURL(result);
      $('img#'+num).attr('src', blobStr);
    },
    error: function (xhr) {
      console.log(xhr.status);
    },
  });
}
//-- 이미지 출력 END--//
showlist(condition)
//--페이지 로딩시 상품목록 출력하기(최신순) END--//
//필터 전체상품 버튼 클릭시 정렬//
$("a[href=totallist]").click(function(e){
    e.preventDefault()
    let condition = "condition=zzim"
    showlist(condition)
})
//필터 상의 버튼 클릭시 정렬//
$("a[href=top]").click(function(e){
    e.preventDefault()
    let condition = 'prodCate=top&condition=zzim'
    showlist(condition)
   
})

//필터 하의 버튼 클릭시 정렬//
$("a[href=bottom]").click(function(e){
    e.preventDefault()
    let condition = 'prodCate=bottom&condition=zzim'
    showlist(condition)
    
})

//필터 신발 버튼 클릭시 정렬//
$("a[href=shoes]").click(function(e){
    e.preventDefault()
    let condition = 'prodCate=shoes&condition=zzim'
    showlist(condition)
})
//정렬조건 버튼 클릭했을때 보여주기
$('button.sorttitle,div.sortnav>img').click(function(e){
    e.preventDefault()
    let $sortlist = $('div.sortnav>div.sortlist')
        if($sortlist.css('display','none')){
               $sortlist.css('display','block');
        }
 })
// 다른 공간 클릭하여 정렬조건 리스트 닫기
$('button.sorttitle').blur(function(){
     let $sortlist = $('div.sortnav>div.sortlist')
     setTimeout(() => {
    $sortlist.css('display','none')
     }, 200)
});
//상품 클릭했을때 상세정보 페이지 이동//
 $('div.shop').on('click', 'div.shoplist', (e) => {
    let pNum = $(e.target).parents('div.shoplist').find('div.pnum').html();
    location.href = frontUrl + 'shopproductdetail.html?pNum=' + pNum;
  });
//필터 조건 한개만 선택되게하기
$('input[name="prodCate"]').change(function() {
  $('input[name="prodCate"]').not(this).prop('checked', false);
});

})