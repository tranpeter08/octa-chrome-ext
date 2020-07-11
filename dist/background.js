// chrome.storage.sync.set('bids', {});

chrome.storage.sync.get('bids', function (res) {
  console.log(res);

  if (!res.bids) {
    console.log('no bids');

    chrome.storage.sync.set({
      bids: {},
    });
  }
});

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {message: 'clicked_browser_action'});
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'open_new_tab') {
    chrome.tabs.create({url: request.url});
  }
});
