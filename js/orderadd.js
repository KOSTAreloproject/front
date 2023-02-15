$(() => {
    //회원 기본주소 띄우기 START
    function showAddress(url, id) {
      $.ajax({
        url: url,
        xhrFields: {
          withCredentials: true,
        },
        method: "get",
        data: "id=" + id,
        success: function (jsonObj) {
          console.log(jsonObj);
  
          //기본주소 찾아서 넣어주기
          for (let obj of jsonObj) {
            let addr = obj.addr;
            let detail = obj.addrDetail;
            let addrNum = obj.addrNum;
            let addrPostNum = obj.addrPostNum;
            let addrRecipient = obj.addrRecipient;
            let addrTel = obj.addrTel;
            let addrType = obj.addrType;
            if (addrType == 0) {
              $("input#name").val(addrRecipient);
              $("input#name").attr("class", addrNum);
              $("input#tel").val(addrTel);
              $("input#post_num").val(addrPostNum);
              $("input#address").val(addr);
              $("input#address_detail").val(detail);
              $("input#name").val(addrRecipient);
            }
          }
        },
  
        error: function (xhr) {
          alert(xhr.status);
        },
      });
    }
    //회원 기본주소 띄우기 END
  
    function showProduct(url, pNum) {
      $.ajax({
        url: url,
        method: "get",
        data: "pNum=" + pNum,
        success: function (jsonObj) {
          console.log(jsonObj);
  
          //기본주소 찾아서 넣어주기
          for (let obj of jsonObj) {
            let addr = obj.addr;
            let detail = obj.addrDetail;
            let addrNum = obj.addrNum;
            let addrPostNum = obj.addrPostNum;
            let addrRecipient = obj.addrRecipient;
            let addrTel = obj.addrTel;
            let addrType = obj.addrType;
            if (addrType == 0) {
              $("input#name").val(addrRecipient);
              $("input#name").attr("class", addrNum);
              $("input#tel").val(addrTel);
              $("input#post_num").val(addrPostNum);
              $("input#address").val(addr);
              $("input#address_detail").val(detail);
              $("input#name").val(addrRecipient);
            }
          }
        },
  
        error: function (xhr) {
          alert(xhr.status);
        },
      });
    }
    let url = backUrl + "address/list.do";
    showAddress(url, "aaa");
  
    url = backUrl + "product/detail.do";
    showProduct(url, "3");
  });