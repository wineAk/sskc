<?php
  header("Content-Type: application/json");
  // jsからPOSTされた情報
  $apikey = $_POST["apikey"];
  $token = $_POST["token"];
  // APIへPOST
  $header = [
    "Content-type: application/json; charset=UTF-8",
    "x-api-key: {$apikey}",
    "x-token: {$token}"
  ];
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_URL, "https://api.saaske.com/v1/lead/list");
  curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
  curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($curl, CURLOPT_HEADER, true);
  $response = curl_exec($curl);
  $header_size = curl_getinfo($curl, CURLINFO_HEADER_SIZE);
  $header = substr($response, 0, $header_size);
  $body = substr($response, $header_size);
  echo $body;
?>