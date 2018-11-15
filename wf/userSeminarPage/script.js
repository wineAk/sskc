$(function(){
    // ラジオボタンの処理（Bug Fixed）
    var obj = {};
    $(document).on('click', 'input:radio', function() {
        var value = $(this).val();
        var name = $(this).attr('name');
        if(value == obj[name]) {
            $(this).prop('checked', false);
            obj[name] = 0;
        } else {
            $(this).prop('checked', true);
            obj[name] = value;
        }
    });
});