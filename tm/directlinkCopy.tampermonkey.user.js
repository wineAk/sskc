// ==UserScript==
// @name         ダイレクトリンクコピー
// @namespace    https://my.saaske.com/
// @version      0.1
// @description  none
// @author       wineAk
// @match        https://my.saaske.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var directLink = document.querySelector('.direct_link');
    if (directLink == null) return;
    directLink.addEventListener('click', function(event) {
        const txt = directLink.textContent;
        const url = txt.match(/(https.+)/)[0];
        const textarea = document.createElement('textarea');
        textarea.textContent = url;
        const body = document.getElementsByTagName("body")[0];
        body.appendChild(textarea);
        textarea.select();
        const res = document.execCommand('copy');
        body.removeChild(textarea);
        if (res) alert('コピー完了\n'+url);
    },false);
})();