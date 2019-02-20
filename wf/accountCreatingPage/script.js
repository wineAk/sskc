// 税金
const tax = 1.08;
// サービス
const service = [{
    'id': 'lead',
    'list': 'Lead',
    'button': 'Lead',
    'color': 'rgba(142, 168, 0, 1)'
  },
  {
    'id': 'sales',
    'list': 'Sales',
    'button': 'Sales',
    'color': 'rgba(13, 123, 166, 1)'
  },
  {
    'id': 'teleapo',
    'list': 'テレアポ職人',
    'button': 'テレアポ',
    'color': 'rgba(68, 157, 49, 1)'
  },
  {
    'id': 'form',
    'list': 'WEBフォーム',
    'button': 'フォーム',
    'color': 'rgba(180, 108, 213, 1)'
  },
  {
    'id': 'tracking',
    'list': 'WEB行動解析',
    'button': '行動解析',
    'color': 'rgba(233, 138, 75, 1)'
  },
  {
    'id': 'cti',
    'list': 'CloudCTI',
    'button': 'CTI',
    'color': 'rgba(0, 196, 196, 1)'
  },
  {
    'id': 'scan',
    'list': 'CloudScan',
    'button': 'Scan',
    'color': 'rgba(206, 53, 53, 1)'
  },
  {
    'id': 'api',
    'list': 'API',
    'button': 'API',
    'color': 'rgba(78, 132, 196, 1)'
  }];
// ターゲット
const target = {
  // ご契約者情報
  'membership_type': 'wf21845574052', // 会員種別
  // アカウント情報1
  'login_id': 'wf21845574010', // ログインID
  'login_password': 'wf21845574011', // パスワード
  // アカウント情報2
  'account_paid': 'wf21845574016', // 有料アカウント数
  'account_free': 'wf21845574017', // 無料アカウント数
  'account_num': 'wf21845574028', // (アカウント合計数)
  'account_fee': 'wf21845574015', // アカウント料金
  'account_fee_sum': 'wf21845574029', // (アカウント料金 合計)
  // 契約情報1
  'trial_period': 'wf21845574020', // お試し期間
  'method_payment': 'wf21845574021', // 支払い
  // 契約情報2
  'service_fee_sum': 'wf21845574024', // (サービス料金 合計)
  // その他
  'saaske_fee': 'wf21845574044', // サスケ 合計
  'saaske_fee_tax': 'wf21845574049', // サスケ 合計 税込み
};
// パスワード生成
function registerPassword() {
  const passNum = Number($('#password input[name=num]').val());
  let n = 26; // ランダム調整
  let randomString = '';
  let baseString = 'abcdefghijklmnopqrstuvwxyz';
  // 数字も使用なら追加
  if ($('#password input[name=number]').prop('checked')) {
    baseString += '0123456789';
    n += 10;
  }
  // 大文字も使用なら追加
  if ($('#password input[name=bigger]').prop('checked')) {
    baseString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    n += 26;
  }
  // 文字列生成
  for (let i = 0; i < passNum; i++) {
    randomString += baseString.charAt(Math.floor(Math.random() * n));
  }
  $(`[name=${target['login_password']}]`).val(randomString);
}
// 来月の日付を登録
function registerNextMonthDate() {
  const nowDate = new Date();
  const nowYear = nowDate.getFullYear();
  const nowMonth = nowDate.getMonth() + 1;
  const nowDay = nowDate.getDate();
  const setYear = (function() {
    if (nowMonth === 12) return nowYear + 1;
    return nowYear;
  })();
  const setMonth = (function() {
    if (nowMonth === 12) return 1;
    return nowMonth + 1;
  })();
  const setDay = (function() {
    const lastDay = new Date(setYear, setMonth, 0).getDate(); // 0日目=その月の最終日となる
    if (nowDay > lastDay) return lastDay; // 「今日の日付(31日)」が「翌月の末日(28日)」より大きいとき、翌月の末日の日付を指定する
    return nowDay;
  })();
  $(`[name=${target['trial_period']}]`).val(`${setYear}/${setMonth}/${setDay}`);
}
// 自動計算処理
function automaticCalculation() {
  // アカウント情報2
  const account_paid = Number($(`[name=${target['account_paid']}]`).val()); // 有料アカウント数
  const account_free = Number($(`[name=${target['account_free']}]`).val()); // 無料アカウント数
  $(`[name=${target['account_num']}]`).val(account_paid + account_free); // (アカウント合計数)
  const account_fee = Number($(`[name=${target['account_fee']}]`).val()); // アカウント料金
  $(`[name=${target['account_fee_sum']}]`).val(account_paid * account_fee); // (アカウント料金 合計)
  // 契約情報2
  let service_fee = 0;
  $('.service-list').each(function() {
    // .service-list-planを持ってない要素にあるinput（=各サービスの金額）だけ足していく
    if (!$(this).hasClass('service-list-plan')) service_fee += Number($(this).find('input').val());
  });
  $(`[name=${target['service_fee_sum']}]`).val(service_fee);
  // その他
  const account_fee_sum = Number($(`[name=${target['account_fee_sum']}]`).val()); // (アカウント料金 合計)
  const service_fee_sum = Number($(`[name=${target['service_fee_sum']}]`).val()); // (サービス料金 合計)
  $(`[name=${target['saaske_fee']}]`).val(account_fee_sum + service_fee_sum); // サスケ 合計
  const saaske_fee = Number($(`[name=${target['saaske_fee']}]`).val()); // サスケ 合計
  $(`[name=${target['saaske_fee_tax']}]`).val(taxCalculation(saaske_fee)); // サスケ 合計 税込み
}
// 消費税計算 (切り捨てfloor, 切り上げceil, 四捨五入round)
function taxCalculation(price) {
  const priceTax = price * tax;
  return Math.floor(priceTax);
}
// --------------------
// 各種処理
// --------------------
$(function() {
  // style＆製品ボタンを書き出す
  let styleHtml = '';
  let buttonHtml = '';
  for (let i = 0, n = service.length; i < n; i++) {
    const id = service[i].id;
    const btn = service[i].button;
    const clr = service[i].color;
    styleHtml += `[data-service="${id}"] {background-color:${clr};border-color:${clr};}`;
    buttonHtml += `<div data-service="${id}">${btn}</div>`;
  }
  $('head').append(`<style>${styleHtml}</style>`);
  $('#service').append(buttonHtml);
  // サービス毎にClassを降る
  $('.clr').each(function() {
    const labelText = $(this).find('label.col.span_3').text();
    const labelTextRep = labelText.replace(/\s|：(金額|プラン)/g, '');
    const serviceName = (function() {
      for (let i = 0, n = service.length; i < n; i++) {
        const list = service[i].list;
        if (labelTextRep === list) return service[i].id;
      }
      return null;
    })();
    if (serviceName == null) {
      if (/合計/.test(labelText)) $(this).addClass('sum-list');
      if (/アカウント/.test(labelText)) $(this).addClass('account-list');
    } else {
      $(this).data('service', serviceName);
      $(this).attr('data-service', serviceName);
      $(this).addClass('service-list');
      if (/プラン/.test(labelText)) $(this).addClass('service-list-plan');
      // inputに記入あったら表示させておく
      if ($(this).find('input').val() !== '') $(`[data-service=${serviceName}].service-list`).css('display', 'list-item');
    }
  });
  // 合計を表示させる場所はreadonlyに
  $(`[name=${target['account_num']}], [name=${target['account_fee_sum']}], [name=${target['service_fee_sum']}], [name=${target['saaske_fee']}], [name=${target['saaske_fee_tax']}]`).prop('readonly', true);
  // 支払いの選択を制御
  $(`[name=${target['method_payment']}]:eq(0), [name=${target['method_payment']}]:eq(1)`).prop('disabled', true);
  // 諸々初回処理
  automaticCalculation();
  registerPassword();
  registerNextMonthDate();
  // 自動計算
  $('.form_list input').on('input keyup blur', function() {
    automaticCalculation();
  });
  // パスワード
  $('#password input[type=button]').on('click', function() {
    registerPassword();
  });
  // 1ヶ月後
  $('#next_month').on('click', function() {
    registerNextMonthDate();
  });
  // 無料・有料会員
  $(`[name=${target['membership_type']}]`).on('change', function() {
    $(`[name=${target['method_payment']}]`).prop('disabled', true);
    if (/無料/.test($(this).val())) {
      registerNextMonthDate();
      $(`[name=${target['method_payment']}]:eq(2)`).prop('disabled', false).prop('checked', true);
    } else {
      $(`[name=${target['trial_period']}]`).val('');
      $(`[name=${target['method_payment']}]:eq(0)`).prop('disabled', false).prop('checked', true);
      $(`[name=${target['method_payment']}]:eq(1)`).prop('disabled', false);
    }
  });
  // 製品ボタン
  $('#service div').on('click', function() {
    const serviceName = $(this).data('service');
    const targetDom = $(`[data-service=${serviceName}].service-list`);
    if (targetDom.data('open')) {
      targetDom.data('open', false);
      targetDom.find('input').val('');
    } else {
      targetDom.data('open', true);
      if (targetDom.find('input').val() === '') targetDom.find('input').val('1');
    }
    targetDom.stop(true, true).fadeToggle(1000); // 入力フォームの開閉
    automaticCalculation(); // 自動計算処理
  });
});