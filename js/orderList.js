$(() => {
    //구매확정 버튼 클릭됐을 때 START
    $(document).on("click", "input[class='confirmed']", (e)=> {
      let oNum = $(e.target).attr('id');
      let result = confirm('구매 확정을 하시겠습니까?');
      if (result) {
        $.ajax({
          url: backUrl + 'orderDelivery/confirm.do',
          method: 'get',
          data: 'oNum='+oNum,
          success: function(jsonObj) {
            let msg = jsonObj.msg;
            alert(msg);
            location.href = frontUrl + 'orderList.html'
          },
          error : function(xhr) {
            alert(xhr.status)
          }
        })
      }
      
    })
    //구매확정 버튼 클릭됐을 때 END


    //ajax 함수 시작, 구매 목록 띄우기 START
    function showOrderList(url, id) {
      let $origin = $("div.desc").first(); //객체들 중에서 첫번째 객체
  
      //첫번째 자식 제외하고 다 지우기, empty는 부모 기준에서 지우는 거라 remove 쓰는 게 낫다
      $("div.desc").not(":first-child").remove();
  
     
      $.ajax({
        url: url,
        method: "get",
        xhrFields: {
          withCredentials: true,
        },
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
            $divObj.html("구매 내역이 없습니다.");
            $divObj.addClass("zero_order");
            $copy.empty().append($divObj);
            $parent.append($copy);
          } else {
            //복제본 만들어서 list에 추가
            for (let obj of jsonObj) {
              let dstatus = obj.od.dstatus;
              let anum = obj.anum;
              let oDate = obj.odate;
              let price = obj.scbid.a.aprice;
              let pnum = obj.scbid.a.product.pnum;
              let sizeCategoryName = obj.scbid.a.product.stock.sizes.sizeCategoryName;
              let sname = obj.scbid.a.product.stock.sname;
  
              let $copy = $origin.clone();
  
              // let $imgObj = $("<img>");
              // $imgObj.attr("src", "../imgs/" + sfile + ".jpg");
              $copy.attr("id", "o_"+anum);
              $copy.find("div.product").html(sname);
              $copy.find("div.product").attr("id", "p_"+pnum);
              $copy.find("div.size_name").html(sizeCategoryName);
              $copy.find("div.price").html(price);
              $copy.find("div.order_date").html(oDate);
              
              if (dstatus == 3) {
                $copy.find("div.order_status").html('구매확정');
              } else if (dstatus == 2) {
                $copy.find("div.order_status").html('배송완료');
                let $btnObj = $("<input type='button' value='구매확정' class='confirmed'>");
                $btnObj.attr("id", anum);
                $copy.find("div.order_status").append($btnObj)
              } else if (dstatus == 1) {
                $copy.find("div.order_status").html('배송 중');
              } else {
                $copy.find("div.order_status").html('배송 준비 중');
                let $btnObj = $("<input type='button' value='배송지 변경' class='change_addr'>");
                $btnObj.attr("id", anum);
                $copy.find("div.order_status").append($btnObj)
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
    }
    //ajax 함수 끝
    //구매 목록 띄우기 END
  
    let url = backUrl + "orders/list.do";
  
    //구매 목록 요청 작업 Start
    showOrderList(url, "aaa");
    //구매 목록 요청 작업 END
    
    
    
  
  
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
  