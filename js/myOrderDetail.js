$(function(){

    let anum = window.location.search.split('?')[1];
    console.log(anum);
    //--상품 디테일 띄우기 START--
    $.ajax({
        xhrFields: {
        withCredentials: true,
        cache: false, 
        },
        url: backUrl+'orders/detail/'+anum,
        method: "get",
        success: function (result) {
            console.log(result);
            let addr = result.addr;
            let addrDetail = result.addrDetail;
            let addrPostNum = result.addrPostNum;
            let addrRecipient = result.addrRecipient;
            let addrTel = result.addrTel;
            let aprice = result.aprice;
            let dstatus = result.dstatus;
            let trackingInfo = result.dtrackingInfo;
            let oDate = result.oDate;
            let pnum = result.pnum;
            let sbrand = result.sbrand;
            let scolor = result.scolor;
            let sgrade = result.sgrade;
            let sizeCategoryName = result.sizeCategoryName;
            let sname = result.sname;
            let snum = result.snum;

            let $imgObj = $('<img>');
            $imgObj.attr("id", "img_"+snum);
            $imgObj.attr('width', '200px');

            $('span#pro_img').empty().append($imgObj);

            $('span#proName').html(sname);
            $('span#proColor').html(scolor);
            $('span#brand').html(sbrand);
            $('span#size').html(sizeCategoryName);
            $('span#grade').html(sgrade);
            $('span#price').html(aprice);

            $('span#nameD').html(addrRecipient);
            $('span#hpC').html(addrTel);
            $('span#postN').html(addrPostNum);
            $('span#address').html(addr);
            $('span#addressDetail').html(addrDetail);
            orderStatus = '';
            if (dstatus == 0) {
                orderStatus = '배송 준비 중'
            } else if (dstatus == 1) {
                orderStatus = '배송 중'
            } else if (dstatus == 2) {
                orderStatus = '배송 완료'
            } else {
                orderStatus = '구매 확정'
            }

            $('span#statusD').html(orderStatus);
            $('span#TnumD').html(trackingInfo);
            $('span#regD').html(oDate);
            imgShow(snum, "img_"+snum);
        },
        error: function (xhr) {
        console.log(xhr.status);
        },
    });

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

});