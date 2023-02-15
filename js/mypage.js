$(() => {
  //ajax 함수 시작, 경매 진행 중 목록 띄우기 START
  function showAuctionIng(url, id) {
    let $origin = $("div.desc").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.desc").not(":first-child").remove();

   
    $.ajax({
      url: url,
      method: "get",
      data: "id=" + id,
      success: function (jsonObj) {
        console.log(jsonObj);
        console.log(jsonObj.length);

        //$붙이면 제이쿼리용 객체
        let $origin = $("div.desc");
        $origin.show();
        let $parent = $("div.list_area");
        if (jsonObj.length == 0) {
          let $copy = $origin.clone();
          let $divObj = $("<div></div>");
          $divObj.html("구매 입찰 내역이 없습니다.");
          $divObj.addClass("zero_auction");
          $copy.empty().append($divObj);
          $parent.append($copy);
        } else {
          $("dd.count_ing").html(jsonObj.length);

          //복제본 만들어서 list에 추가
          for (let obj of jsonObj) {
            let anum = obj.anum;
            let aprice = obj.aprice;
            let pendDate = obj.product.pendDate;
            let pnum = obj.product.pnum;
            let sfile = obj.product.stock.sfile;
            let sizeCategoryName = obj.product.stock.sizes.sizeCategoryName;
            let sname = obj.product.stock.sname;

            let $copy = $origin.clone();

            // let $imgObj = $("<img>");
            // $imgObj.attr("src", "../imgs/" + sfile + ".jpg");
            $copy.find("div.product").html(sname);
            $copy.find("div.product").attr("id", pnum);
            $copy.find("div.size_name").html(sizeCategoryName);
            $copy.find("div.auction_price").html(aprice);
            $copy.find("div.product_status").html(pendDate);
            $copy.find("div.end_date").html(pendDate);

            $parent.append($copy);
          }
        }
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //ajax 함수 끝
  //경매 진행 중인 목록 띄우기 END

  //경매 종료된 항목들 개수 세기 START
  function showAuctionEnd(url, id) {
    $.ajax({
      url: url,
      method: "get",
      data: "id=" + id,
      success: function (jsonObj) {
        console.log(jsonObj);
        console.log(jsonObj.length);
        //$붙이면 제이쿼리용 객체

        if (jsonObj.length != 0) {
          $("dd.count_end").html(jsonObj.length);
        }
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //ajax 함수 끝
  //경매 종료된 항목들 개수 세기 END

  let url = backUrl + "auction/inglist.do";

  //경매 진행 중 목록 요청 작업 Start
  showAuctionIng(url, "aaa");
  //경매 진행 중 요청 작업 END

  url = backUrl + "auction/endlist.do";

  //경매 종료 갯수 요청 작업 Start
  showAuctionEnd(url, "aaa");
  //경매 종료 갯수 요청 작업 END

  //경매 진행 중 클릭 시 START
  $("dt.title_ing").click(() => {
    location.href = frontUrl + "mypageIngList.html";
  });
  //경매 진행 중 클릭 시 END

  //경매 종료된 목록 click시 이벤트 START
  $("dt.title_end").click(() => {
    $("div.auction_list").load("mypageEndList.html");

    let $origin = $("div.item_list").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.item_list").not(":first-child").remove();
    

    
    $.ajax({
      url: backUrl + "auction/endlist.do",
      method: "get",
      data: "id=aaa",
      success: function (jsonObj) {
        console.log(jsonObj);
        console.log(jsonObj.length);

        //$붙이면 제이쿼리용 객체
        let $origin = $("div.item_list");
        $origin.show();
        let $parent = $("div.list_area");
        if (jsonObj.length == 0) {
          let $copy = $origin.clone();
          let $divObj = $("<div></div>");
          $divObj.html("경매 종료 내역이 없습니다.");
          $divObj.addClass("zero_auction");
          $copy.empty().append($divObj);
          $parent.append($copy);
        } else {
          $("dd.count_end").html(jsonObj.length);

          //복제본 만들어서 list에 추가
          for (let obj of jsonObj) {
            console.log(obj);
            let anum = obj.anum;
            let aprice = obj.aprice;
            let maxPrice = obj.maxPrice;
            let pendDate = obj.product.pendDate;
            let pnum = obj.product.pnum;
            let sfile = obj.product.stock.sfile;
            let sizeCategoryName = obj.product.stock.sizes.sizeCategoryName;
            let sname = obj.product.stock.sname;

            let $copy = $origin.clone();

            // let $imgObj = $("<img>");
            // $imgObj.attr("src", "../imgs/" + sfile + ".jpg");
            $copy.find("div.product").html(sname);
            $copy.find("div.product").attr("id", pnum);
            $copy.find("div.size_name").html(sizeCategoryName);
            $copy.find("div.auction_price").html(aprice);
            $copy.find("div.end_date").html(pendDate);
            if (maxPrice == aprice) { 
              $copy.find("div.status").html('낙찰');
            } else {
              $copy.find("div.status").html('미낙찰');
            }
            $parent.append($copy);
          }
        }
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr.status);
      },
    });
  });
  //ajax 함수 끝
  //경매 종료된 목록 띄우기 END


  //   //상품 클릭 되었을 때 START
  //   $("div.productlist").on("click", "div.product", (e) => {
  //     //클릭한 상품번호 얻어오는 부분
  //     let prodNo = $(e.target).parents("div.product").find("div.prodNo").html(); //어디까지 찾느냐 div.product 까지
  //     //바로 위의 부모객체를 찾으려면 parent 메서드 쓰면됨
  //     //부모의 부모의 부모의 부모까지 다 찾는 것 parents
  //     //선택자에 만족하는 객체까지만 찾게 제한 파람값에다 적어주기

  //     location.href = "./productinfo.html?prodNo=" + prodNo;
  //   });
  //   //상품 클릭 되었을 때 END
});
