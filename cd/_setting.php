<?php
  // タイムゾーンを設定
  date_default_timezone_set("Asia/Tokyo");
  // minify
  function phpMinify($buffer) {
    $search  = array("/\r\n|\n|\r|<!--[\s\S]*?-->/s", "/(\s)+/s", "/>(\s)/s", "/(\s)</s");
    $replace = array("", "\\1", ">", "<");
    $buffer  = preg_replace($search, $replace, $buffer);
    return $buffer;
  }
  ob_start("phpMinify");
?>