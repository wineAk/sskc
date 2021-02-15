$(function() {
  var weFormModal = function() {
    var match = WEBFORMID;
    //var inputVal = $('input[type=hidden][name="c"]').val();
    //if (inputVal) match = inputVal;
    //var imgMatch = $('body > div > img').attr('src').match(/(wf[0-9]+)/);
    //if (imgMatch) match = imgMatch[1];
    //$('head > script').each(function() {
    //  var src = $(this).attr('src');
    //  if (!src) return;
    //  var srcMatch = src.match(/(wf[0-9]+)/);
    //  if (srcMatch) match = srcMatch[1];
    //});
    //if (match === '') return;
    var url = 'https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=https%3A%2F%2Fsecure-link.jp%2Fwf%2F%3Fc%3D' + match;
    $('.modal-image').attr('src', url);
    $('.modal').css('display', 'block');
    $('.modal').insertAfter('body');
  };
  weFormModal();
  $('#anchor_inquiryForm > div > div > div > div > article > form > div > input[type=submit]').val('送信する');
  $('[type="file"]').each(function(i) {
    var id = $(this).attr('id');
    var txt = (i === 0) ? '表面' : '裏面';
    $(this).attr('accept', 'image/*');
    $(this).wrap('<label for="' + id +'" class="file-container">');
    $(this).before('<div class="file-ui">名刺の「' + txt + '」を撮る</div>');
    $(this).after('<span>選択されていません</span>');
    $(this).parent().before('<img id="img' + id + '" src="">');
  });
  $('.form_list li').each(function() {
    var text = $(this).text();
    (/名刺/.test(text)) ? $(this).addClass('input-card') : $(this).addClass('input-text');
    if (/裏|部署|役職/.test(text)) $(this).addClass('not-required');
  });
  $('.input-card').wrapAll('<div id="input-card-container">');
  $('.input-text').wrapAll('<div id="input-text-container">');
  $(".card-dl").attr('href', $('.card-image img').attr('src'));

  var required = function (trg) {
    $('#input-card-container input, #input-text-container input').each(function() {
      $(this).removeAttr('required');
    });
    $('#input-' + trg + '-container input').each(function() {
      if ($(this).parents('li.clr').hasClass('not-required')) return;
      $(this).parents('li.clr').find('.span_3').addClass('required');
      $(this).attr('required', true);
    });
  };
  var inputOpen = function(val) {
    if (val === 'card') {
      $('#input-card-container').stop(true, true).fadeToggle(1000);
      $('#input-text-container').stop(true, true).toggle();
    } else {
      $('#input-card-container').stop(true, true).toggle();
      $('#input-text-container').stop(true, true).fadeToggle(1000);
    }
  };
  var nowVal = $('[name="your-card"]').val();
  required(nowVal);
  //inputOpen(nowVal);

  $('[name="your-card"]').on('change', function () {
    var val = $(this).val();
    required(val);
    inputOpen(val);
  });
  $('[type="file"]').on('change', function (e) {
    if (!this.files.length) return;
    var id = $(this).attr('id');
    var fileName = $(this).prop('files')[0];
    $(this).next().text(fileName.name);
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#img' + id).attr('src', reader.result);
    }
    reader.readAsDataURL(fileName);
  });
  $(".card-open .card-title").on("click", function() {
    $("#tableToggle").stop(true, true).fadeToggle(1000);
    $(".card-open").css('display', 'none');
    $(".card-close").css('display', 'block');
  });
  $(".card-close .card-title").on("click", function() {
    $("#tableToggle").stop(true, true).fadeToggle(500);
    $(".card-close").css('display', 'none');
    $(".card-open").css('display', 'block');
  });
  $(".card-dl").on("click", function(e) {
    var hrefPath = cardBase64;
    var fileName = '名刺画像.jpg';
    $(e.target).attr({
      download: fileName,
      href: hrefPath
    });
  });
  $('.modal-close').on('click', function() {
    $('.modal').stop(true, true).fadeToggle(1000);
  });
});