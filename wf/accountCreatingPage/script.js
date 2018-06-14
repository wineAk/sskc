const information = "[script] 1.1.5";
// --------------------
// 初期設定
// --------------------
// 各サービスの正規表現
const classReg = /(lead|sales|teleapo|web|tracking|cti|scan|api)_.{3}/i;
// 入力枠のClassを指定しておくこと
const classObj = {
  "number12" : "password_txt", // パスワード
  "number14" : "account_paid", // 有料アカウント
  "number15" : "account_free", // 無料アカウント
  "number16" : "account_num",  // アカウント合計数
  "number17" : "account_fee",  // アカウント料金
  "number18" : "account_sum",  // アカウント料金 合計
  "number21" : "trial_period", // お試し期間
  // 変動箇所
  "number40" : "service_fee_sum", // サービス料金 合計
  "number41" : "saaske_fee_sum",  // サスケ 合計
  "number42" : "saaske_tax_sum",  // サスケ 合計 税込み
  // 各種サービス
  "number24" : "lead_fee",  // Lead：金額
  "number25" : "lead_pln",  // Lead：プラン
  "number26" : "sales_fee", // Sales：金額
  "number27" : "sales_pln", // Sales：プラン
  "number28" : "teleapo_fee",
  "number29" : "teleapo_pln" ,
  "number30" : "web_fee",
  "number31" : "web_pln",
  "number32" : "tracking_fee",
  "number33" : "tracking_pln",
  "number34" : "cti_fee",
  "number35" : "cti_pln",
  "number36" : "scan_fee",
  "number37" : "scan_pln",
  "number38" : "api_fee",
  "number39" : "api_pln",
};
// 消費税
const tax = 1.08;
// --------------------
// パスワード生成
// --------------------
function createPassword(){
  const passNum = Number($('#password input[name="num"]').val());
  let n = 26; // ランダム調整
  let randomString = "";
  let baseString = "abcdefghijklmnopqrstuvwxyz";
  // 数字も使用なら追加
  if($('#password input[name="number"]').prop("checked")){
    baseString += "0123456789";
    n += 10;
  }
  // 大文字も使用なら追加
  if($('#password input[name="bigger"]').prop("checked")){
    baseString += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    n += 26;
  }
  // 文字列生成
  for(let i=0; i<passNum; i++){
    randomString += baseString.charAt(Math.floor(Math.random()*n));
  }
  return randomString;
}
// --------------------
// 来月の日付を登録
// http://wannabehuman.hatenablog.com/entry/2017/02/15/233615
// http://qiita.com/Slowh/items/5c0b4c16a68f2a29f7e3
// --------------------
function getAddMonthDate(year, month, day){
  const addMonth = month + 1; // 翌月
  let endDate = getEndOfMonth(year, addMonth); // 翌月の最終日
  if(day > endDate){day = endDate;} // 「今日の日付(31日)」が「翌月の最終日(28日)」より大きいとき、最終日を指定する
  const addMonthDate = new Date(year, addMonth-1, day); // 計算した結果をnew Dateの形式へ変換
  const addMonthDateStr = addMonthDate.toLocaleDateString(); // new Dateをyyyy/m/dへ変換
  return addMonthDateStr;
}
//今月の月末日を取得 (翌月の0日目=今月の末日)
function getEndOfMonth(year, addMonth){
  const endDate = new Date(year, addMonth, 0);
  return endDate.getDate();
}
// --------------------
// 自動計算処理
// --------------------
function autoCalculation(){
  //アカウント数の処理
  const paidAccount = Number($('.account_paid input[type="text"]').val());
  const freeAccount = Number($('.account_free input[type="text"]').val());
  $('.account_num input[type="text"]').val(paidAccount + freeAccount);
  //アカウント金額の処理
  const feeAccount = Number($('.account_fee input[type="text"]').val());
  $('.account_sum input[type="text"]').val(paidAccount * feeAccount);
  //各サービス金額の処理
  const feeLead     = Number($('.lead_fee input[type="text"]').val());
  const feeSales    = Number($('.sales_fee input[type="text"]').val());
  const feeTeleapo  = Number($('.teleapo_fee input[type="text"]').val());
  const feeWeb      = Number($('.web_fee input[type="text"]').val());
  const feeTracking = Number($('.tracking_fee input[type="text"]').val());
  const feeCti      = Number($('.cti_fee input[type="text"]').val());
  const feeScan     = Number($('.scan_fee input[type="text"]').val());
  const feeApi     = Number($('.api_fee input[type="text"]').val());
  $('.service_fee_sum input[type="text"]').val(feeLead + feeSales + feeTeleapo + feeWeb + feeTracking + feeCti + feeScan + feeApi);
  //サスケ 合計
  const account = Number($('.account_sum input[type="text"]').val());
  const service = Number($('.service_fee_sum input[type="text"]').val());
  $('.saaske_fee_sum input[type="text"]').val(account + service);
  // サスケ 合計 税込み
  const feeSaaske = Number($('.saaske_fee_sum input[type="text"]').val());
  const feeSaaskeTax = taxCalculation(feeSaaske);
  $('.saaske_tax_sum input[type="text"]').val(feeSaaskeTax);
}
// 消費税計算 (切り捨てfloor, 切り上げceil, 四捨五入round)
function taxCalculation(price){
  const priceTax = price * tax;
  return Math.floor(priceTax);
}
// --------------------
// 各種処理
// --------------------
$(function() {
  console.info(information);
  const url = location.href;
  const urlReg = /secure-link\.jp\/wf\/index\.cgi/i;
  $(".clr").each(function(i){
    // liタグへClass追加
    const classNum = i + 1;
    const className = `number${classNum}`; // ナンバリング
    const classObjName = classObj[className]; // 特定のClassも追加
    const thisInput = $(this).find('input[type="text"]').val();
    const thisText = $(this).children("div").text();
    const trgtReg = /^(円（税抜き・月額）|件プラン)$/;
    const classNames = (function(){
      // 確認画面でtrgtRegと完全一致したとき
      if(trgtReg.test(thisText) && urlReg.test(url)) return `${className} ${classObjName} display_none_imp`;
      // 入力画面でclassObjにサービス名が含まれ、金額・プラン記入済みのとき
      if(classReg.test(classObjName) && !urlReg.test(url) && thisInput!="") return `${className} ${classObjName} clicked`;
      // 入力画面でclassObjにサービス名が含まれているとき
      if(classReg.test(classObjName) && !urlReg.test(url)) return `${className} ${classObjName} display_none`;
      // classObjがあるとき
      if(classObjName != null) return `${className} ${classObjName}`; // "null" or "void 0"
      // それ以外のとき
      return `${className}`;
    })();
    $(this).addClass(classNames);
  });
  // テキストボックスへ入力などが合った際の処理
  $(document).on("input keyup blur", ".form_list input", function(){
    autoCalculation(); // 自動計算処理
  });
  // パスワードボタン
  $('#password input[type="button"]').click(function(){
    const pass = createPassword();
    $('.password_txt input[type="text"]').eq(0).val(pass);
  });
  // 1ヶ月後ボタン
  $(".next_month").click(function(){
    const dt = new Date();
    const nowYear = dt.getFullYear();
    const nowMonth = dt.getMonth()+1;
    const nowDay = dt.getDate();
    const nextYMD = getAddMonthDate(nowYear, nowMonth, nowDay);
    $('.trial_period input[type="text"]').val(nextYMD);
  });
  // 各製品ボタン
  $(".service_button").click(function() {
    const id = $(this).attr("id");
    const targetPrnt = $(`.${id}_fee, .${id}_pln`);
    const targetChld = $(`.${id}_fee input[type="text"], .${id}_pln input[type="text"]`);
    if(targetPrnt.hasClass("clicked")){ // 閉じるとき
      targetPrnt.removeClass("clicked");
      targetChld.val("");
    } else { // 開くとき
      targetPrnt.addClass("clicked");
      if(targetChld.val() == ""){targetChld.val("1");}
    }
    targetPrnt.stop(true,true).fadeToggle(1000); // 入力フォームの開閉
    autoCalculation(); // 自動計算処理
  });
});