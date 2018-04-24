<?php
  header("Content-Type: application/json");
  // jsからPOSTされた情報
  $method = $_POST["method"];
  $apikey = $_POST["apikey"];
  $token = $_POST["token"];
  $number = $_POST["number"];
  // APIに必要なcontentとheaderを作成
  $content = [
    "saved_number" => $number,
  ];
  $header = [
    "Content-type: application/json; charset=UTF-8",
    "x-api-key: {$apikey}",
    "x-token: {$token}",
  ];
  // cURLで処理
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, "https://api.saaske.com/v1/lead/list");
  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
  // POSTのときのみcontentを送信する
  if($method == "POST"){
    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($content));
  }
  curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HEADER, true);
  // responseからheaderを削除し、bodyを返す
  $response = curl_exec($curl);
  $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
  $body = substr($response, $header_size);
  echo $body;
  curl_close($curl);
?>