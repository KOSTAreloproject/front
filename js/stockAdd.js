$(() => {
  //--StockAdd폼 서브밋 되었을 때 할 일 START--
  let $form = $("section>div.StockAdd>form");
  $form.submit((e) => {
    let url = backUrl + "stock/add";
    let formData = new FormData($form[0]);

    $.ajax({
      xhrFields: {
        withCredentials: true,
      },
      url: url,
      method: "post", //파일 업로드용 설정
      data: formData, //파일 업로드용 설정
      processData: false, //파일 업로드용 설정
      contentType: false, //파일 업로드용 설정
      success: function () {
        location.href = frontUrl + "index.html";
      },
      error: function (xhr) {
        alert("오류" + xhr.status);
      },
    });
    return false;
  });
  //--StockAdd폼 서브밋 되었을 때 할 일 END--

  $(document).on("change", ".file-input", function () {
    $filename = $(this).val();

    if ($filename == "") $filename = "파일을 선택해주세요.";

    $(".filename").text($filename);
  });

  $(".pants").hide();
  $(".shoes").hide();
  $('input[name="sType"]').change(function () {
    if ($(this).val() == "상의") {
      $(".top2").show();
      $(".pants").hide();
      $(".shoes").hide();
      $("#ex1 > img").attr("src", "/imgs/size/top.png");
    } else if ($(this).val() == "하의") {
      $(".top2").hide();
      $(".pants").show();
      $(".shoes").hide();
      $("#ex1 > img").attr("src", "/imgs/size/pants.png");
    } else if ($(this).val() == "신발") {
      $(".top2").hide();
      $(".pants").hide();
      $(".shoes").show();
      $("#ex1 > img").attr("src", "/imgs/size/shoes.png");
    }
  });

  var $inputs = $(
    'input[type="radio"], input[type="text"], input[type="number"], input[type="file"]'
  );

 
  $inputs.on("change", function () {
    // 모든 input 요소의 값을 가져와 변수에 저장
    var allValuesEntered = true;
    $inputs.each(function () {
      if (!$(this).val()) {
        allValuesEntered = false;
      }
    });

    // 모든 값이 입력된 경우 버튼을 활성화
    if (allValuesEntered) {
      $("input[type=submit]").prop("disabled", false);
      $("input[type=submit]").css("background-color", "#000000");
      $("input[type=submit]").css("cursor", "pointer");
    } else {
      $("input[type=submit]").attr("disabled", true);
      $("input[type=submit]").css("background-color", "#ebebeb");
      $("input[type=submit]").css("cursor", "default");
    }
  });
});
