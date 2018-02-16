// --------------------
// 各種処理
// --------------------
$(function() {
  $("input").click(function(){
    if($(this).val() == number) {
      $(this).prop("checked", false);
      number = 0;
    } else {
      number = $(this).val();
    }
  });
});