$(function() {
  // 初回にGETで検索条件リストを取得
  apiProcess("GET");
  // ボタンクリックでメソッドごとの処理を行う
  $(".box_setting .button").on("click", function() {
    const process = $('#target').data("process"); // 多重処理を防ぐdataタグを取得
    const method = $(this).data("method");
    if (process == "") apiProcess(method);
  });
});
// APIの取得関数
function apiProcess(mtd) {
  const key = $("#apikey").val();
  const tkn = $("#token").val();
  const num = $("#list").val();
  if (/^POST$/.test(mtd) && num == null) return; // POST時にnumが無ければ処理を行わない。
  $("#target").data("process", mtd); // 多重処理を防ぐdataタグを付与
  result("取得中…", "データを取得しています。");
  $.ajax({
    url: "api.php",
    type: "POST",
    dataType: "JSON",
    data: {
      method: mtd,
      apikey: key,
      token: tkn,
      number: num,
    },
  })
  .done(function(response) {
    console.log(response);
    $("#target").data("process", ""); // 多重処理を防ぐdataタグを削除
    // エラーが返ってきたとき
    if (response.message != null) {
      const mess = response.message;
      result("エラーが発生しました", mess);
      return;
    }
    // サスケAPIからエラーが返ってきたとき
    if (response.error != null) {
      const mess = response.error.message;
      const id = response.error.id;
      const code = response.error.code;
      result("エラーが発生しました", `${mess} (id:${id} / code:${code})`);
      return;
    }
    // GETの時はプルダウン、POSTの時はテーブルを生成する
    if (/^GET$/.test(mtd)) {
      pulldownProcess(response);
    } else if (/^POST$/.test(mtd)) {
      tableProcess(response);
    }
  })
  .fail(function() {
    console.log(arguments);
    $('#target').data("process", ""); // 多重処理を防ぐdataタグを削除
    result("失敗しました", "コンソールログをご確認ください。");
  });
}
// プルダウンの処理関数
function pulldownProcess(obj) {
  $("#list").empty();
  pulldownCreate(obj.all_customers, "全顧客一覧");
  pulldownCreate(obj.history_group, "履歴グループ");
  pulldownCreate(obj.lead_source, "リードソース");
  pulldownCreate(obj.mail_history, "メール送信履歴");
  pulldownCreate(obj.web_visitors, "Web訪問者");
  result("リスト名", "検索条件の保存名");
}
// プルダウンの生成関数
function pulldownCreate(ary, name) {
  if (ary == null) return; // 検索条件の保存がない場合は処理を行わない
  let html = "";
  html += `<optgroup label="${name}">\n`;
  // 検索条件リストごとの処理
  for (let i = 0, l = ary.length; i < l; i++) {
    const name = ary[i].saved_name;
    const num = ary[i].saved_number;
    html += `<option value="${num}">${name}</option>\n`;
  }
  html += `</optgroup>\n`;
  $("#list").append(html);
}
// 顧客テーブルの生成関数
function tableProcess(obj) {
  const list = obj.list;
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512"><path d="M512 230L283 45v94C61 141-22 307 5 467c49-99 150-138 278-143v92l229-186z"/></svg>`;
  let html = "";
  // 1社ごとの処理
  for (let i = 0, l = list.length; i < l; i++) {
    const sskc = list[i].saaske_code;
    const link = list[i].direct_link.replace(/https:\/\/\/\?/, "https://my.saaske.com/?"); // 不具合の対応
    const data = list[i].customer_details;
    html += `<div class="data">\n`;
    html += `<div class="sskc">${sskc}</div>\n`;
    // 顧客テーブルごとの処理
    for (let n = 0, m = data.length; n < m; n++) {
      const dataName = data[n].name;
      const dataValue = data[n].value;
      const dataTag = (function() {
        if (/^会社名$/.test(dataName)) return "company";
        if (/^電話番号$/.test(dataName)) return "tel";
        if (/^都道府県$/.test(dataName)) return "city";
        if (/^名前$/.test(dataName)) return "name";
        return "";
      })();
      if (dataTag !== "") {
        html += `<div class="${dataTag}">${dataValue}</div>\n`;
      }
    }
    html += `<div class="link"><a href="${link}" target="_blank">${icon}</a></div>\n`;
    html += `</div>\n`;
  }
  // 一覧種別
  const saveName = obj.list_name;
  const saveNum = obj.number;
  const text = `${saveName} (${saveNum}件)`;
  const listType = obj.list_type;
  const listName = (function() {
    if (/^All customers$/.test(listType)) return "全顧客一覧";
    if (/^Lead source$/.test(listType)) return obj.lead_source_name;
    if (/^History group$/.test(listType)) return obj.history_group_name;
    if (/^Correspondence history$/.test(listType)) return "対応履歴";
    if (/^Mail history$/.test(listType)) return "メール送信履歴";
    if (/^WEB visitors$/.test(listType)) return "WEB訪問者";
  })();
  $(".data").remove();
  result(listName, text, html);
}
// 結果を表示させる関数
function result(title, text, data) {
  $("#target_name").text(title);
  $("#target_save_name").text(text);
  $("#target").append(data);
}