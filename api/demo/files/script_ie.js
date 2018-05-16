window.onload = function() {
  // IEでは利用できない旨を表示（記載しているJavaScriptがES6な為）
  var userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.match(/(msie|trident)/i)) {
    document.getElementById("ie_alert").className = "alert_text box";
  }
};