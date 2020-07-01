'use strict';
console.log('Self-Service Assistant enabled');

let keys = {};

document.addEventListener('keydown', (e) => {
  const {keyCode: kc} = e;
  const codes = [16, 17, 72];

  if (codes.includes(kc) && !keys[kc]) {
    keys[kc] = true;
  }

  for (const code of codes) {
    if (!keys[code]) return;
  }

  console.log('BOOM');
});

document.addEventListener('keyup', () => {
  keys = {};
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    Utils.configureApp();
  }
});
