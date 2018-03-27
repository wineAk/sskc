$(function(){
  $('#execute').click(function(){
    $.ajax({
      url: 'api.php',
      type: 'post',
      dataType: 'json',
      data: {
        apikey: $('#apikey').val(),
        token: $('#token').val(),
        number: $('#number').val(),
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