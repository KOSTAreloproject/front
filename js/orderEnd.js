$(function () {
    const productId = $('#productId').val();
    const price = $('#price').val();
    const date = $('#date').val();
    const price_replace = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let today = new Date();
    today.setDate(today.getDate() + parseInt(date));
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date2 = today.getDate();
    let todayStr = `${year}/${month >= 10 ? month : '0' + month}/${date2 >= 10 ? date2 : '0' + date2}`;

    if(date==0){
        $('.statusType_txt').text('즉시 구매가 완료 되었습니다.');
        $('.price_now_title').text(' 총 결제금액 ');
        $('.price_finish').text(price_replace);
        $('.statusType').text('즉시 구매가');
    }else if(date!=0){
        $('.statusType_txt').text('구매 입찰이 완료 되었습니다.');
        $('.sub_content').append("<p>'구매내역 > 입찰 중' 상태일 때는 입찰 지우기가 가능합니다.</p>");
        $('.price_now_title').text(' 총 결제금액 ');
        $('.price_finish').text(price_replace);
        $('.statusType').text('입찰 희망가');
        $('.price_total').append("<dl class='price_box'><dt class='price_title'> 입찰 마감기한 </dt>" +
            "<dd class='price_empty_price'>"+date+"일 - "+todayStr+"까지</dd></dl>")
    }
    axios.get('/api/pro_buyfinish/'+productId)
        .then(function (response) {
            console.log(response);
            let productOriginFileName = response.data.data.productOriginFileName;
            $('.product_img').attr("src", "/lib/product/"+productOriginFileName);
        }).catch(function (err) {
        console.log(err);
    });
});