$(function(){
  // 初回にGETで検索条件リストを取得
  apiProcess("GET");
  // ボタンクリック時にPOSTで顧客リストを取得
  $("#post").on("click", function(){
    apiProcess("POST");
  });
});
// APIの取得関数
function apiProcess(mtd){
  let key = $("#apikey").val();
  let tkn = $("#token").val();
  let num = $("#list").val();
  // POST時numが無ければ処理を行わない
  if(/^POST$/.test(mtd) && num == null){ return; }
  if(/^POST$/.test(mtd)){ result("取得中･･･", "リストを取得しています。"); }
  $.ajax({
    url: "api.php",
    type: "post",
    dataType: "json",
    data: {
      method: mtd,
      apikey: key,
      token: tkn,
      number: num,
    },
  })
  .done(function(response){
    console.log(response);
    // 403が返ってきたとき
    if(/^Forbidden$/.test(response.message)){
      result("エラーが発生しました", "設定が間違えてないかご確認ください。");
      return;
    }
    // サスケAPIからエラーが返ってきたとき
    if(response.error != null){
      result("エラーが発生しました", `${response.error.message} (id:${response.error.id} / code:${response.error.code})`);
      return;
    }
    // GETの時はプルダウン、POSTの時はテーブルを生成する
    if(/^GET$/.test(mtd)){
      pulldownProcess(response);
    } else if(/^POST$/.test(mtd)){
      tableProcess(response);
    }
  })
  .fail(function(){
    result("失敗しました", "検索条件の保存を行ったアカウントではありません。")
  });
}
// プルダウンの生成関数
function pulldownProcess(obj){
  pulldownCreate(obj.all_customers, "全顧客一覧");
  pulldownCreate(obj.history_group, "履歴グループ");
  pulldownCreate(obj.lead_source, "リードソース");
  pulldownCreate(obj.mail_history, "メール送信履歴");
  pulldownCreate(obj.web_visitors, "Web訪問者");
  function pulldownCreate(ary, name){
    if(ary == null){ return; } // 検索条件の保存がない場合は処理を行わない
    let html = "";
    html += `<optgroup label="${name}">\n`;
    // 検索条件リストごとの処理
    for(let i=0,l=ary.length; i<l; i++){
      let name = ary[i].saved_name;
      let num = ary[i].saved_number;
      html += `<option value="${num}">${name}</option>\n`;
    }
    html += `</optgroup>\n`;
    $("#list").append(html);
  }
}
// 顧客テーブルの生成関数
function tableProcess(obj){
  let list = obj.list;
  let icon = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M512 230L283 45v94C61 141-22 307 5 467c49-99 150-138 278-143v92l229-186z"/></svg>`;
  let html = "";
  // 1社ごとの処理
  for(let i=0,l=list.length; i<l; i++){
    let sskc = list[i].saaske_code;
    let link = list[i].direct_link.replace(/https:\/\/\/\?/, "https://my.saaske.com/?"); // 不具合の対応
    let data = list[i].customer_details;
    html += `<div class="data">\n`;
    html += `<div class="sskc">${sskc}</div>\n`;
    // 顧客テーブルごとの処理
    for(let n=0,m=data.length; n<m; n++){
      let dataName = data[n].name;
      let dataValue = data[n].value;
      let dataTag = (function(){
        if(/^会社名$/.test(dataName)) return "company";
        if(/^電話番号$/.test(dataName)) return "tel";
        if(/^都道府県$/.test(dataName)) return "city";
        if(/^名前$/.test(dataName)) return "name";
        return "";
      })();
      if(dataTag !== ""){
        html += `<div class="${dataTag}">${dataValue}</div>\n`;
      }
    }
    html += `<div class="link"><a href="${link}" target="_blank">${icon}</a></div>\n`;
    html += `</div>\n`;
  }
  // 一覧種別
  let saveName = obj.list_name;
  let saveNum = obj.number;
  let text = `${saveName} (${saveNum}件)`;
  let listType = obj.list_type;
  let listName =  (function(){
    if(/^All customers$/.test(listType)) return "全顧客一覧";
    if(/^Lead source$/.test(listType)) return obj.lead_source_name;
    if(/^History group$/.test(listType)) return obj.history_group_name;
    if(/^Correspondence history$/.test(listType)) return "対応履歴";
    if(/^Mail history$/.test(listType)) return "メール送信履歴";
    if(/^WEB visitors$/.test(listType)) return "WEB訪問者";
  })();
  $(".data").remove();
  result(listName, text, html);
}
// 結果を表示させる関数
function result(title, text, data){
  $("#target_name").text(title);
  $("#target_save_name").text(text);
  $("#target").append(data);
}