$(() => {
  // 체크박스 전체 선택
  $(".checkbox_group").on("click", "#check_all", function () {
    $(this)
      .parents(".checkbox_group")
      .find("input")
      .prop("checked", $(this).is(":checked"));
    updateButtonState();
  });

  // 체크박스 개별 선택
  $(".checkbox_group").on("click", ".normal", function () {
    var is_checked = true;

    $(".checkbox_group .normal").each(function () {
      is_checked = is_checked && $(this).is(":checked");
    });

    $("#check_all").prop("checked", is_checked);
    updateButtonState();
  });
  // -- 동의하기 버튼 활성화 start --

  function updateButtonState() {
    var all_checked = true;
    $(".checkbox_group .normal").each(function () {
      all_checked = all_checked && $(this).is(":checked");
    });

    if (all_checked) {
      $("#join_btn").attr("disabled", false);
      $("#join_btn").css("background-color", "#000000");
      $("#join_btn").css("cursor", "pointer");
    } else {
      $("#join_btn").attr("disabled", true);
      $("#join_btn").css("background-color", "#ebebeb");
      $("#join_btn").css("cursor", "default");
    }
  }
  // -- 동의하기 버튼 활성화 end --
});