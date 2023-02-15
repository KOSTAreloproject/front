$(() => {
  //ajax 함수 시작, 경매 진행 중 목록 띄우기 START
  function showAuctionIng(url, id) {
    let $origin = $("div.desc").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.desc").not(":first-child").remove();

    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
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
          $("div.count_ing").html(jsonObj.length);

          //복제본 만들어서 list에 추가
          for (let obj of jsonObj) {
            console.log();
            let anum = obj.anum;
            let aprice = obj.aprice;
            let pendDate = obj.product.pendDate;
            let pnum = obj.product.pnum;
            let sfile = obj.product.stock.sfile;
            let sizeCategoryName = obj.product.stock.sizes.sizeCategoryName;
            let sname = obj.product.stock.sname;
            let sbrand = obj.product.stock.sbrand;
            let sgrade = obj.product.stock.sgrade;

            let imgUrl = '../imgs/' + sfile + '.jpg';
            aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            
            // let imgUrl = '../imgs/' + sfile + '.jpg';
            let $copy = $origin.clone();

            // let $imgObj = $("<img>");
            // $imgObj.attr("src", "../imgs/" + sfile + ".jpg");
            // $imgObj.css("width", 100);
            $copy.find("div.s_file").attr("id", pnum);
            $copy
              .find("div#" + pnum)
              .css("background-image", "url(" + imgUrl + ")");
            $copy.find("div.s_file").html('')
            $copy.find("div.s_name").html(sname);
            $copy.find("div.s_brand").html(sbrand);
            $copy.find("div.s_grade").html(sgrade);
            $copy.find("div.size_name").html(sizeCategoryName);
            $copy.find("div.a_price").html(aprice);
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
      xhrFields: {
        withCredentials: true,
      },
      method: "get",
      data: "id=" + id,
      success: function (jsonObj) {
        console.log(jsonObj);
        console.log(jsonObj.length);
        //$붙이면 제이쿼리용 객체

        if (jsonObj.length != 0) {
          $("div.count_end").html(jsonObj.length);
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
  $("div.ing_tab").click(() => {
    location.href = frontUrl + "mypageIngList.html";
  });
  //경매 진행 중 클릭 시 END

  //경매 종료된 목록 click시 이벤트 START
  $("div.end_tab").click(() => {
    $("div.content_area").load("mypageEndList.html");

    let $origin = $("div.end_desc").first(); //객체들 중에서 첫번째 객체

    //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
    $("div.end_desc").not(":first-child").remove();

    $.ajax({
      url: backUrl + "auction/endlist.do",
      method: "get",
      xhrFields: {
        withCredentials: true,
      },
      data: "id=aaa",
      success: function (jsonObj) {
        console.log(jsonObj);
        console.log(jsonObj.length);

        //$붙이면 제이쿼리용 객체
        let $origin = $("div.end_desc");
        $origin.show();
        let $parent = $("div.list_end_area");
        if (jsonObj.length == 0) {
          let $copy = $origin.clone();
          let $divObj = $("<div></div>");
          $divObj.html("경매 종료 내역이 없습니다.");
          $divObj.addClass("zero_auction");
          $copy.empty().append($divObj);
          $parent.append($copy);
        } else {
          $("div.count_end").html(jsonObj.length);

          //복제본 만들어서 list에 추가
          for (let obj of jsonObj) {
            console.log(obj);
            let anum = obj.anum;
            let aprice = obj.aprice;
            let pendDate = obj.product.pendDate;
            let pnum = obj.product.pnum;
            let sfile = obj.product.stock.sfile;
            let sizeCategoryName = obj.product.stock.sizes.sizeCategoryName;
            let sname = obj.product.stock.sname;
            let sbrand = obj.product.stock.sbrand;
            let sgrade = obj.product.stock.sgrade;
            let maxPrice = obj.maxPrice;

            let $copy = $origin.clone();

            let imgUrl = '../imgs/' + sfile + '.jpg';
            aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // let $imgObj = $("<img>");
            // $imgObj.attr("src", "../imgs/" + sfile + ".jpg");
            $copy.find("div.end_s_file").attr("id", "end_"+pnum);
            $copy
              .find("div#end_" + pnum)
              .css("background-image", "url(" + imgUrl + ")");
            $copy.find("div.end_s_file").html('')
            $copy.find("div.end_s_name").html(sname);
            $copy.find("div.end_s_brand").html(sbrand);
            $copy.find("div.end_s_grade").html(sgrade);
            $copy.find("div.end_size_name").html(sizeCategoryName);
            $copy.find("div.end_a_price").html(aprice);
            $copy.find("div.end_end_date").html(pendDate);

            $parent.append($copy);

            if (maxPrice == aprice) {
              $copy.find("div.status").html("낙찰");
              let $btnObj = $("<input type='button' value='결제' class='buy'>");
              $btnObj.attr("id", anum);
              $copy.find("div.status").append($btnObj);
              let $btnObj2 = $(
                "<input type='button' value='포기' class='cancel'>"
              );
              $btnObj2.attr("id", anum);
              $copy.find("div.status").append($btnObj2);
            } else {
              $copy.find("div.status").html("미낙찰");
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

  //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 + 3일 setting START--
  let date = new Date() //시스템상 오늘 날짜
  let date2 = new Date()
  date2 = new Date(date2.setDate(date2.getDate() + 2)) //시스템 날짜 기준 3일 후
  let date3 = new Date()
  date3 = new Date(date3.setDate(date3.getDate() - 60)) //시스템 날짜 기준 3일 후
  
  $now = date.toISOString().slice(0, 10)
  $now2 = date2.toISOString().slice(0, 10)
  $now3 = date3.toISOString().slice(0, 10)
  
  $('input.start_day').val($now)
  $('input.end_day').val($now2)
  $('input#start_end_day').val($now3)
  $('input#end_end_day').val($now)
   //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 + 3일 setting END--

  //--ing 페이지 달력 좌측, 우측 min max 설정 START--
  date = new Date(date.setDate(date.getDate() + 6))
  $now2 = date.toISOString().slice(0, 10)
  $('input.start_day').attr('min', $now)
  $('input.start_day').attr('max', $now2)
  $('input.end_day').attr('min', $now)
  $('input.end_day').attr('max', $now2)
  //--ing 페이지 달력 좌측, 우측 min max 설정 END--

    //--end 페이지 달력 좌측, 우측 min max 설정 START--
    date = new Date()
    date = new Date(date.setDate(date.getDate() - 179))
    $now2 = date.toISOString().slice(0, 10)
    $('input#start_end_day').attr('min', $now2)
    $('input#start_end_day').attr('max', $now)
    $('input#end_end_day').attr('min', $now2)
    $('input#end_end_day').attr('max', $now)
    //--end 페이지 달력 좌측, 우측 min max 설정 END--

  //--최근 3일 버튼 클릭 event START--
  $(document).on('click', 'input#3days', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() + 2)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input.start_day').val($now)
    $('input.end_day').val($now2)
  })
  //--최근 3일 버튼 클릭 event END--

  //--최근 5일 버튼 클릭 event START--
  $(document).on('click', 'input#5days', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() + 4)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input.start_day').val($now)
    $('input.end_day').val($now2)
  })
  //--최근 5일 버튼 클릭 event END--

  //--최근 7일 버튼 클릭 event START--
  $(document).on('click', 'input#7days', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() + 6)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input.start_day').val($now)
    $('input.end_day').val($now2)
  })
  //--최근 7일 버튼 클릭 event END--

  //--최근 2개월 버튼 클릭 event START--
  $(document).on('click', 'input#2months', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() - 59)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input#start_end_day').val($now2)
    $('input#end_end_day').val($now)
  })
  //--최근 2개월 버튼 클릭 event END--

  //--최근 4개월 버튼 클릭 event START--
  $(document).on('click', 'input#4months', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() - 119)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input#start_end_day').val($now2)
    $('input#end_end_day').val($now)
  })
  //--최근 4개월 버튼 클릭 event END--

  //--최근 6개월 버튼 클릭 event START--
  $(document).on('click', 'input#6months', (e) => {
    let date = new Date() //시스템상 오늘 날짜
    let date2 = new Date() 
    date2 = new Date(date2.setDate(date2.getDate() - 179)) //시스템 날짜 기준 3일 후

    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    $('input#start_end_day').val($now2)
    $('input#end_end_day').val($now)
  })
  //--최근 6개월 버튼 클릭 event END--

  //--END page 날짜 클릭 최대기간 6개월 제한 START--
  $(document).on('change', 'input.days', (e) => {
    let $divObj = e.target
    let $
    console.log($divObj)
    alert('날짜 제한')
    // $('input.start_end_day').attr('min', $now2)
    // $('input.start_end_day').attr('max', $now)
  })
  //--END page 날짜 클릭 최대기간 6개월 제한 END--

  
  //   //--상품 클릭 되었을 때 START--
  //   $("div.productlist").on("click", "div.product", (e) => {
  //     //클릭한 상품번호 얻어오는 부분
  //     let prodNo = $(e.target).parents("div.product").find("div.prodNo").html(); //어디까지 찾느냐 div.product 까지
  //     //바로 위의 부모객체를 찾으려면 parent 메서드 쓰면됨
  //     //부모의 부모의 부모의 부모까지 다 찾는 것 parents
  //     //선택자에 만족하는 객체까지만 찾게 제한 파람값에다 적어주기

  //     location.href = "./productinfo.html?prodNo=" + prodNo;
  //   });
  //   //--상품 클릭 되었을 때 END--
});
