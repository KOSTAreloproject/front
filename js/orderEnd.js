$(() => {
  let datas = window.location.search.split("?")[1];
  let data = datas.split("&");

  let anum = data[0];
  let totalStr = data[1];
  let total = totalStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let apriceStr = parseInt(totalStr) - 2500;
  let aprice = apriceStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  $("span#total_pay_price").html(total);
  $("span#product_price").html(aprice);

  //--구매 상세보기 클릭시 START
  $("button#buy_detail").click(() => {
    location.href = frontUrl + "myOrderDetail.html?" + anum;
  });
  //--구매 상세보기 클릭시 END
});
