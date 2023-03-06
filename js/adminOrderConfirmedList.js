$(() => {
    //ajax 함수 시작, 경매 진행 중 목록 띄우기 START
    function showOrderDelivery(url) {
      let $origin = $("div.desc").first(); //객체들 중에서 첫번째 객체
  
      //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
      $("div.desc").not(":first-child").remove();
  
      $.ajax({
        url: url,
        xhrFields: {
          withCredentials: true,
        },
        method: "get",
        success: function (jsonObj) {
          console.log(jsonObj);
  
          //$붙이면 제이쿼리용 객체
          let $origin = $("div.desc");
          $origin.show();
          let $parent = $("div.list_area");
          if (jsonObj.status == -1) {
            let $copy = $origin.clone();
            let $divObj = $("<div></div>");
            $divObj.html(jsonObj.msg);
            $divObj.addClass("zero_order_delivery");
            $copy.empty().append($divObj);
            $parent.append($copy);
          } else {
            console.log(jsonObj.length);
            
            //복제본 만들어서 list에 추가
            for (let obj of jsonObj) {
              let anum = obj.anum;
              let aprice = obj.aprice;
              let odate = obj.oDate;
              let dCompleteDay = obj.dCompleteDay;
              // let pendDate = obj.pEndDate;
              let pnum = obj.pnum;
              let snum = obj.snum;
              let sizeCategoryName = obj.sizeCategoryName;
              let sname = obj.sname;
            //   let sbrand = obj.sbrand;
              let scolor = obj.scolor;
              let sgrade = obj.sgrade;
              console.log(odate)
              
              aprice = aprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              
              let $imgObj = $('<img>');
              $imgObj.attr("id", "img_"+snum);
              $imgObj.attr('width', '130px');
  
              let $copy = $origin.clone();
              $copy.attr("id", pnum);
              $copy.find("div.s_img").empty().append($imgObj);
              $copy.find("div.s_name").html(sname);
              $copy.find("div.s_color").html(scolor);
              $copy.find("div.s_grade").html(sgrade);
              $copy.find("div.size_name").html(sizeCategoryName);
              $copy.find("div.a_price").html(aprice);
              $copy.find("div.o_date").html(dCompleteDay);
  
              $parent.append($copy);
              imgShow(snum, "img_"+snum);
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
  
   
    //--상품 이미지 띄우기 START--
    function imgShow(num, id){
      $.ajax({
        xhrFields: {
          responseType: 'blob',
          withCredentials: true,
          cache: false, 
        },
        url: backUrl+'stock/img/'+num,
          method: "get",
          success: function (result) {
            let blobStr = URL.createObjectURL(result);
            $('img#'+id).attr('src', blobStr);
        },
        error: function (xhr) {
          console.log(xhr.status);
        },
      });
    }
    //--상품 이미지 띄우기 END--
  
    let url = backUrl + "orders/confirmlist";
  
    //경매 진행 중 목록 요청 작업 Start
    showOrderDelivery(url);
    //경매 진행 중 요청 작업 END
  
    //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 60일 setting START--
    let date = new Date() //시스템상 오늘 날짜
    
    let date2 = new Date()
    date2 = new Date(date2.setDate(date2.getDate() - 60)) //시스템 날짜 기준 2개월 전
    
    $now = date.toISOString().slice(0, 10)
    $now2 = date2.toISOString().slice(0, 10)
    
    $('input.start_day').val($now2)
    $('input.end_day').val($now)
    
     //--달력 좌측에 현재 날짜 지정, 우측에 현재 날짜 - 60일 setting END--
  
    //--달력 좌측, 우측 min max 설정 START--
    date = new Date(date.setDate(date.getDate() - 180))
    $now2 = date.toISOString().slice(0, 10)
    $('input.start_day').attr('min', $now2)
    $('input.start_day').attr('max', $now)
    $('input.end_day').attr('min', $now2)
    $('input.end_day').attr('max', $now)
    //--달력 좌측, 우측 min max 설정 END--
  
    //--최근 2개월 버튼 클릭 event START--
    $(document).on('click', 'input#2months', (e) => {
      let date = new Date() //시스템상 오늘 날짜
      let date2 = new Date() 
      date2 = new Date(date2.setDate(date2.getDate() - 59)) //시스템 날짜 기준 3일 후
  
      $now = date.toISOString().slice(0, 10)
      $now2 = date2.toISOString().slice(0, 10)
      $('input.start_day').val($now2)
      $('input.end_day').val($now)
    })
    //--최근 2개월 버튼 클릭 event END--
  
    //--최근 4개월 버튼 클릭 event START--
    $(document).on('click', 'input#4months', (e) => {
      let date = new Date() //시스템상 오늘 날짜
      let date2 = new Date() 
      date2 = new Date(date2.setDate(date2.getDate() - 119)) //시스템 날짜 기준 3일 후
  
      $now = date.toISOString().slice(0, 10)
      $now2 = date2.toISOString().slice(0, 10)
      $('input.start_day').val($now2)
      $('input.end_day').val($now)
    })
    //--최근 4개월 버튼 클릭 event END--
  
    //--최근 6개월 버튼 클릭 event START--
    $(document).on('click', 'input#6months', (e) => {
      let date = new Date() //시스템상 오늘 날짜
      let date2 = new Date() 
      date2 = new Date(date2.setDate(date2.getDate() - 179)) //시스템 날짜 기준 3일 후
  
      $now = date.toISOString().slice(0, 10)
      $now2 = date2.toISOString().slice(0, 10)
      $('input.start_day').val($now2)
      $('input.end_day').val($now)
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
  