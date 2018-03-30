$(function(){
  $('input[type=button]').on('click', function(){
    var cmd = $(this).data('cmd');
    var mtd = $(this).data('mtd');
    var key = $('#apikey').val();
    var tkn = $('#token').val();
    var num = $('#number').val();
    $.ajax({
      url: 'api.php',
      type: 'post',
      dataType: 'json',
      data: {
        command: cmd,
        method: mtd,
        apikey: key,
        token: tkn,
        number: num,
      },
    })
    .done(function(response){
      resultProcess(response, '成功');
    })
    .fail(function(){
      resultProcess(arguments, '失敗');
    });
  });
  function resultProcess(data, text){
    console.log(data);
    $('#result_json').val(JSON.stringify(data, null, 2));
    $('#result_text').text(text);
  }
});