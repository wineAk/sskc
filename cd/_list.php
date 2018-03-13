<?php
  // ディレクトリ名
  $master  = "apk";
  $develop = "apk_d";
  // ファイル一覧を取得
  function getApkList($dir){
    $res_dir = opendir($dir);
    while(false !== ($file_list[] = readdir($res_dir)));
    closedir($res_dir); // ディレクトリハンドルを閉じる
    sort($file_list); // ソート
    $file_list = array_diff($file_list, array(".", "..", "desktop.ini")); // 削除実行
    $file_list = array_values($file_list); // indexを詰める
    return $file_list;
  }
  // ファイルの最新版を取得
  function getApkLast($file_list){
    $file_last = end($file_list); // Arrayの最後
    $file_name = str_replace('CloudScan_ver', '', $file_last);
    $file_name = str_replace('.apk', '', $file_name);
    return array($file_name, $file_last);
  }
?>