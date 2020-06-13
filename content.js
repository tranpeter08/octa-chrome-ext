console.log('Self-Service Assistant enabled');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    console.log('test');

    const queries = [
      {
        menuTitle: 'Work Bid',
        bidId: workBidId,
        headerClasses: {
          parent: '',
          label: '',
          value: ''
        },
        fieldClasses: {
          parent: '',
          label: '',
          value: ''
        }
      }
    ];

    for (let i = 0; i < queries.length; i++) {
      const bidId = document.querySelector(queries[i].bidId);

      if (bidId) {
        console.log(bidId);

        // scrape
        // render favorites
        renderFavorites();
        break;
      }

      const title = document.querySelector(menuTitle).innerHTML;

      if (title === queries[i].menuTitle) {
        console.log(title);

        // render favorites
        renderFavorites();
        break;
      }
    }

    // chrome.runtime.sendMessage({
    //   message: 'open_new_tab',
    //   url: 'http://google.com'
    // });
    // if (
    //   document.querySelector(loadingQuery).style.display !== 'none' ||
    //   document.querySelector(openAssignLoadingQuery)
    // ) {
    //   alert('Please wait for the page to finish loading...');
    //   return;
    // }
    // const bidId = getText(document, assignmentQuery);
    // if (bidId) Utils.scrapePage(bidId);
    // if (!document.getElementById('SSA-container')) {
    //   Utils.renderMenu();
    //   Utils.addEventListeners();
    // }
  }
});
