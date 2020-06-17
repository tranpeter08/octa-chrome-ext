'use strict';
console.log('Self-Service Assistant enabled');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    Utils.configureApp();
  }
});
