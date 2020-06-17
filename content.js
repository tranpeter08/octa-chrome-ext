'use strict';
console.log('Self-Service Assistant enabled');

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    // const {queries} = Config;

    // for (let i = 0; i < queries.length; i++) {
    //   const q = queries[i];
    //   const bidId = document.querySelector(q.bidIdQ);
    //   const favorites = document.getElementById('ssa-app');

    //   if (bidId) {
    //     State.settings = q;
    //     DOM.scrape(bidId.innerText);
    //   }

    //   const title = document.querySelector(menuTitleQ).innerHTML;

    //   if ((title === queries[i].menuTitle || bidId) && !favorites) {
    //     DOM.renderFavorites();
    //     break;
    //   }
    // }

    Utils.configureApp();
  }
});
