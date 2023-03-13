$(() => {
  //--상품 이미지 띄우기 START--
  function imgShow(num, id) {
    $.ajax({
      xhrFields: {
        responseType: "blob",
        withCredentials: true,
        cache: false,
      },
      url: backUrl + "stock/img/" + num,
      method: "get",
      success: function (result) {
        let blobStr = URL.createObjectURL(result);
        $("img#" + id).attr("src", blobStr);
      },
      error: function (xhr) {
        console.log(xhr.status);
      },
    });
  }
  //--상품 이미지 띄우기 END--

  //--결제 관련 정보 띄우기 START
  function showInfo(url) {
    let nowData = window.location.search.split("?")[1];

    let datas = nowData.split("&");
    let pNum = datas[0];
    let mNum = datas[1];
    let aNum = datas[2];
    let apriceStr = datas[3];

    let aprice = apriceStr.replace(/,/g, "");

    $.ajax({
      url: url,
      xhrFields: {
        withCredentials: true,
      },
      method: "post",
      data: JSON.stringify({
        mnum: mNum,
        pnum: pNum,
        anum: aNum,
      }),
      contentType: "application/json",
      success: function (jsonObj) {
        let sbrand = jsonObj.sbrand;
        let snum = jsonObj.snum;
        let sname = jsonObj.sname;
        let scolor = jsonObj.scolor;
        let sizeCategoryName = jsonObj.sizeCategoryName;
        let sgrade = jsonObj.sgrade;

        let name = jsonObj.name;
        let telStr = jsonObj.tel;
        let email = jsonObj.email;

        let tel = telStr.replace(
          /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
          "$1-$2-$3"
        );

        let addrList = jsonObj.addrList;
        let dfAddrNum = "";
        let dfAddrPost = "";
        let dfAddrRecipient = "";
        let dfAddrTel = "";
        let dfAddr = "";
        let dfAddrDetail = "";

        let total = parseInt(aprice) + 2500;
        total = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        for (let obj of addrList) {
          if (obj.addrType == 0) {
            dfAddrNum = obj.addrNum;
            dfAddrPost = obj.addrPostNum;
            dfAddrRecipient = obj.addrRecipient;
            dfAddrTel = obj.addrTel;
            dfAddr = obj.addr;
            dfAddrDetail = obj.addrDetail;
          }
        }

        let $imgObj = $("<img>");
        $imgObj.attr("id", "img_" + snum);
        $imgObj.attr("class", "data_img");
        $imgObj.attr("width", "130px");

        $("span#s_img").empty().append($imgObj);
        $("span#brand").html(sbrand);
        $("span#prod_name").html(sname);
        $("span#size").html(sizeCategoryName);
        $("span#prod_color").html(scolor);
        $("span#prod_grade").html(sgrade);
        $("span#price").html(apriceStr + " 원");
        $("span#price").attr("data-anum", aNum);

        imgShow(snum, "img_" + snum);

        $("div#buyerName").html(name);
        $("div#buyerName").attr("data-mnum", mNum);
        $("div#buyerName").attr("data-email", email);
        $("div#buyerTel").html(tel);

        if (dfAddrNum != "") {
          $("input#recipient").val(dfAddrRecipient);
          $("input#addrTel").val(dfAddrTel);
          $("input#post_num").val(dfAddrPost);
          $("input#post_num").attr("data-addrnum", dfAddrNum);
          $("input#address").val(dfAddr);
          $("input#address_detail").val(dfAddrDetail);
        }

        $("span#product_price").html(apriceStr + " 원");
        $("span#total_price").html(total + " 원");
      },

      error: function (xhr) {
        alert(xhr.status);
      },
    });
  }
  //--결제 관련 정보 띄우기 END

  showInfo(backUrl + "auction/pay");

  //--주소 변경 눌렀을 때 START--
  $(document).on("click", "input[id='addrChange']", function () {
    let $parent = $("div.addressList");
    let $origin = $("div.address").first();
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: backUrl + "address/list",
      method: "get",
      success: function (jsonObj) {
        let list = jsonObj;
        $(list).each((index, a) => {
          let addrNum = a.addrNum;
          let addrName = a.addrRecipient;
          let addrPostNum = a.addrPostNum;
          let addrTel = a.addrTel;
          let addr = a.addr;
          let addrDetail = a.addrDetail;
          let addrRecipient = a.addrRecipient;
          let addrType = a.addrType;
          let $copy = $origin.clone();
          $copy
            .find("div.addrName")
            .html(addrName)
            .attr("id", "addrName" + addrNum);
          $copy
            .find("div.addrTel")
            .html(addrTel)
            .attr("id", "addrTel" + addrNum);
          $copy
            .find("div.addrPostNum")
            .html("(" + addrPostNum + ")")
            .attr("id", "addrPostNum" + addrNum);
          $copy
            .find("div.addr_list")
            .html(addr)
            .attr("id", "addr_list" + addrNum);
          $copy
            .find("div.addr_detail")
            .html(addrDetail)
            .attr("id", "addr_detail" + addrNum);
          $copy.find('input[class="addrSelect"]').attr("id", "a_" + addrNum);
          $parent.append($copy);
        });
        $origin.hide();
      },
      error: function (xhr) {
        alert(xhr);
      },
    });
  });
  //--주소 변경 눌렀을 떄 END--
  //--주소선택 버튼 눌렀을 때 START--
  $(document).on("click", "input[class='addrSelect']", function (e) {
    let selectId = e.target.id;
    let id = selectId.split("_")[1];
    let selAddrRec = document.getElementById("addrName" + id).innerHTML;
    let selAddrTel = document.getElementById("addrTel" + id).innerHTML;
    let splitAddrPost1 = document.getElementById("addrPostNum" + id).innerHTML;
    let splitAddrPost2 = splitAddrPost1.split("(")[1];
    let selAddrPost = splitAddrPost2.split(")")[0];
    let selAddr = document.getElementById("addr_list" + id).innerHTML;
    let selAddrDetail = document.getElementById("addr_detail" + id).innerHTML;
    $("input#recipient").val(selAddrRec);
    $("input#addrTel").val(selAddrTel);
    $("input#post_num").val(selAddrPost);
    $("input#post_num").attr("data-addrnum", id);
    $("input#address").val(selAddr);
    $("input#address_detail").val(selAddrDetail);
  });
  //--주소선택 버튼 눌렀을 때 START--
  //--유효성 검사시 실패할때 띄우기 START--
  const filterByDebounce = (e, callback) => {
    timer = 200;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback("" + e.target.value);
    }, 200);
  };
  //--유효성 검사시 실패할때 띄우기 END--
  //--이름 유효성 검사 함수 START--
  function vaidateName(strName) {
    const reg_name = /^[가-힣a-zA-Z]{3,19}$/;
    if (!reg_name.test("" + strName)) {
      return false;
    }
    $("#input_title_name").css("display", "");
    $("#input_title_name_error").css("display", "none");
    $("#name_input").css("border-bottom", "");
    return true;
  }
  //--이름 유효성 검사 함수 END--
  //--전화번호 유효성 검사 함수 START--
  function vaidateTel(strTel) {
    const reg_tel =
      // /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
      /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
    if (!reg_tel.test("" + strTel)) {
      return false;
    }
    $("#input_title_hp").css("display", "");
    $("#input_title_hp_error").css("display", "none");
    $("#hp_input").css("border-bottom", "");
    return true;
  }
  //--전화번호 유효성 검사 함수 END--
  //--작성 폼에서 실시간 이름 유효성 검사 START--
  document.querySelector("#name_input_box").addEventListener("input", (e) => {
    filterByDebounce(e, (strName) => {
      let errorMsg = "";
      if (!vaidateName(strName)) {
        errorMsg = "올바른 이름을 입력해주세요.  (2 - 50자)";
        $("#input_title_name").css("display", "none");
        $("#input_title_name_error").css("display", "");
        $("#name_input").css("border-bottom", "1px solid red");
      } else {
      }
      document.querySelector("#name_input_error").innerHTML = errorMsg;
    });
  });
  //--작성 폼에서 실시간 이름 유효성 검사 END--
  //--작성 폼에서 실시간 전화번호 유효성 검사 START--
  document.querySelector("#hp_input_box").addEventListener("input", (e) => {
    filterByDebounce(e, (strTel) => {
      let errorMsg = "";
      if (!vaidateTel(strTel)) {
        errorMsg = "정확한 전화번호를 입력해주세요.";
        $("#input_title_hp").css("display", "none");
        $("#input_title_hp_error").css("display", "");
        $("#hp_input").css("border-bottom", "1px solid red");
      } else {
      }
      document.querySelector("#hp_input_error").innerHTML = errorMsg;
    });
  });
  //--작성 폼에서 실시간 전화번호 유효성 검사 END--
  //--주소창 클릭시 카카오 주소 팝업 START--
  document.getElementById("kakaoOpen").addEventListener("click", function () {
    //주소입력칸을 클릭하면
    //카카오 지도 발생
    new daum.Postcode({
      oncomplete: function (data) {
        //선택시 입력값 세팅
        document.getElementById("address1_input").value = data.address; // 주소 넣기
        document.getElementById("zipcode_input").value = data.zonecode; // 우편번호 넣기
      },
    }).open();
  });
  //--주소창 클릭시 카카오 주소 팝업 END--
  //--새 주소록 추가 클릭시 폼 보이기 START--
  $("#addrNew").click(function () {
    resetData();
  });
  //--새 주소록 추가 클릭시 폼 보이기 START--

  //--저장하기 눌렀을 때 START--
  $("#save").click(function () {
    let url = backUrl + "address/add";
    let $addrRecipient = $("#addressname_input").val();
    let $addrPostNum = $("#zipcode_input").val();
    let $addrTel = $("#hp_input").val();
    let $addr = $("#address1_input").val();
    let $addrDetail = $("#address2_input").val();
    let $addrName = $("#name_input").val();
    let addrType = 0;
    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "post",
      data: JSON.stringify({
        addrName: $addrName,
        addrPostNum: $addrPostNum,
        addrTel: $addrTel,
        addr: $addr,
        addrDetail: $addrDetail,
        addrRecipient: $addrRecipient,
        addrType: addrType,
      }),
      contentType: "application/json",
      success: function () {
        location = location;
        resetData();
      },
      error: function (jsonObj) {
        alert(jsonObj.responseJSON.msg);
      },
    });
  });
  //--저장하기 눌렀을 때 END--
  //--새 주소록 추가 취소 버튼 클릭시 폼 숨기기 START--
  function resetData() {
    $("#addressname_input").val("");
    $("#zipcode_input").val("");
    $("#hp_input").val("");
    $("#address1_input").val("");
    $("#address2_input").val("");
    $("#name_input").val("");
    document.querySelector("#name_input_error").innerHTML = "";
    document.querySelector("#hp_input_error").innerHTML = "";
    $("#input_title_name").css("display", "");
    $("#input_title_name_error").css("display", "none");
    $("#name_input").css("border-bottom", "");
    $("#input_title_hp").css("display", "");
    $("#input_title_hp_error").css("display", "none");
    $("#hp_input").css("border-bottom", "");
    $("#input_button_check").prop("checked", false);
  }
  //--새 주소록 추가 취소 버튼 클릭시 폼 숨기기 END--

  //--결제 버튼 클릭시 START
  $("input#pay_price").click((e) => {
    let anum = $("span#price").attr("data-anum");
    // let mnum = $("div#buyerName").attr("data-mnum");
    let addrnum = $("input#post_num").attr("data-addrnum");
    let omemo = $("input#o_memo").val();

    let sname = $("span#prod_name").html();
    let priceStr = $("span#total_price").html();
    let email = $("div#buyerName").attr("data-email");
    let buyer = $("div#buyerName").html();
    let tel = $("div#buyerTel").html();
    let addr = $("input#address").val();
    let addrdetail = $("input#address_detail").val();
    let postcode = $("input#post_num").val();

    let price = parseInt(priceStr.replace(/,/g, ""));

    let date = new Date();
    function pad2(n) {
      return n < 10 ? "0" + n : n;
    }
    let $nowtime =
      date.getFullYear().toString() +
      pad2(date.getMonth() + 1) +
      pad2(date.getDate()) +
      pad2(date.getHours()) +
      pad2(date.getMinutes()) +
      pad2(date.getSeconds());
    let uid = "ORD" + $nowtime + "-" + anum;
    console.log(uid);
    if (addrnum == null) {
      alert("주소를 입력하시오");
    } else {
      let IMP = window.IMP;
      IMP.init("imp55760817");
      IMP.request_pay(
        {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: uid,
          name: sname,
          amount: price,
          buyer_email: email,
          buyer_name: buyer,
          buyer_tel: tel,
          buyer_addr: addr,
          buyer_postcode: postcode,
          m_redirect_url: "./orderEnd.html",
        },
        function (rsp) {
          // callback
          if (rsp.success) {
            // 결제 성공 시: 결제 승인 또는 가상계좌 발급에 성공한 경우
            // jQuery로 HTTP 요청

            jQuery
              .ajax({
                xhrFields: {
                  withCredentials: true,
                },
                url: backUrl + "order-delivery/add",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                data: JSON.stringify({
                  imp_uid: rsp.imp_uid,
                  uid: rsp.merchant_uid,
                  amount: rsp.paid_amount,
                  anum: anum,
                  addrnum: addrnum,
                  omemo: omemo,
                  paynum: rsp.apply_num,
                }),
              })
              .done(function (data) {
                endPay(data, anum, price);
              });
          } else {
            alert("결제에 실패하였습니다. 에러 내용: " + rsp.error_msg);
            endCancelPay();
          }
        }
      );
    }
  });
  //--결제 버튼 클릭시 END

  //--결제 완료시 페이지 이동 START--
  function endPay(data, anum, price) {
    alert(data.msg);
    if (data.status == -1) {
      location.href = frontUrl + "index.html";
    } else {
      location.href = frontUrl + "orderEnd.html?" + anum + "&" + price;
    }
  }
  //--결제 완료시 페이지 이동 END--

  //--결제 실패시 페이지 이동 START--
  function endCancelPay() {
    location.href = frontUrl + "index.html";
  }
  //--결제 실패시 페이지 이동 END--
});
