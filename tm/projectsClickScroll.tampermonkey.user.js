// ==UserScript==
// @name         案件クリックでページ上部へスクロール（Sales）
// @namespace    https://my.saaske.com/
// @version      0.1
// @description  none
// @author       wineAk
// @match        https://my.saaske.com/*
// @grant        none
// ==/UserScript==

(() => {
  const projectsElms = document.querySelectorAll('[rel="projects_detail"]')
  if (projectsElms == null) return
  const opt = { top: 0, behavior: 'smooth' }
  projectsElms.forEach(e => e.addEventListener('click', _ => window.scroll(opt)))
})()