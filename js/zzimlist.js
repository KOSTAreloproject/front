//--사용자의 찜목록 출력 START//
$(() => { 
    let url = backUrl + "zzim/list.do";
    let $origin = $("div.wishlist").first();
    let id = 'bbb'
    let condition = "id="+id;
    $("div.wishlist").not(":first-child").remove();
    $origin.show();
    $.ajax({
        url: url,
        data: condition,
        method: "get",
        success: function (jsonObj) {
            console.log(jsonObj);
            let $origin = $("div.wishlist").first();
            let $parent = $("div.wish");
            $(jsonObj).each((index, p) => {
                let pNum = p.pNum;
                let sFile = p.sFile
                let sBrand = p.sBrand;
                let sName = p.sName;
                let sColor = p.sColor;
                let sType = p.sType;
                let sizeCategoryName = p.sizeCategoryName;
                let sHopePrice = p.sHopePrice;
                let maxPrice = p.aPrice;
                if (maxPrice != 0) {
                    sHopePrice = maxPrice;
                }
                let sGrade = p.sGrade;
          let enddate = p.pEndDate;
          let $copy = $origin.clone();
          // let imgStr = '<img src="../images/' + prodNo + '.jpg">'
          // $copy.find('div.img').html(imgStr)
          let $imgObj = $("<img>");
          $imgObj.attr("src", "../imgs/" + sFile + ".jpg");
          $imgObj.attr("height", "150px");
          $copy.find("div.simg").empty().append($imgObj);
          $copy.find("div.pnum").html(pNum);
          $copy.find("div.stype").html(sType);
          $copy.find("div.sbrand").html(sBrand);
          $copy.find("div.sname").html(sName);
          $copy.find("div.scolor").html("색상 : " + sColor);
          $copy.find("div.sizecategoryname").html("사이즈 : " + sizeCategoryName);
          $copy.find("div.sgrade").html("등급 : " + sGrade);
          $copy.find("div.maxprice").html("최고입찰가 : " + sHopePrice + "원");
          $copy.find("div.enddate").html("경매 마감일 : " + enddate);
          $parent.append($copy);
        });
        $origin.hide();
    },
    error: function (xhr) {
        alert(xhr.status);
    },
});
//--사용자의 찜목록 출력 END//
//찜하기 삭제 START//
 $("div.wish").on("click", "button.zsubmit", (e) =>{
     let pNum = $(e.target).parents("div.wishlist").find("div.pnum").html();
    let id = "bbb";
    let url = backUrl + "zzim/del.do";
    let data ={"pNum":pNum, "id":id}
        $.ajax({
            url: url,
            data: data,
            method: "post",
            success: function (jsonObj){
                alert(jsonObj)
                location.href = "./mypage_zzimlist.html"
            },
            error: function (xhr) {
                alert(xhr.status);
            },
        });
    });
    //찜하기 삭제 END//
    //상품사진 클릭시 상세화면 이동 START//
    $("div.wish").on("click", "div.simg", (e) => {
        let pNum = $(e.target).parents("div.wishlist").find("div.pnum").html();
        location.href = "./productdetail.html?pNum=" + pNum;
    });
    //상품사진 클릭시 상세화면 이동 END//

    //입찰하러 가기 버튼클릭시 할일 START//
    $("div.wish").on("click", "button.tsubmit", (e) =>{
        e.preventDefault();
        let pNum = $(e.target).parents("div.wishlist").find("div.pnum").html();
        location.href = "./productdetail.html?pNum=" + pNum;
    //입찰하러 가기 버튼클릭시 할일 END//
  });

  
  
});
    

