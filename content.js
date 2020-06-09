console.log('Self Service Assistant enabled');

// document.head.insertAdjacentHTML('beforeend', css);

function getText(elem, query) {
  const e = elem.querySelector(query);

  if (!e) {
    console.log(`query error: ${query}`);
    return null;
  }

  return e.innerText;
}

function formatTime(str) {
  const [time, ampm] = str.split(' ');
  const [hr, min] = time.split(':');
  const h = parseInt(hr);

  const hh =
    h === 12
      ? ampm === 'AMx'
        ? 24
        : ampm === 'AM'
        ? 0
        : h
      : ampm === 'AM'
      ? h
      : ampm === 'PM'
      ? h + 12
      : h + 24;

  return hh * 60 + parseInt(min);
}

function getMinutes(elem, query) {
  const str = getText(elem, query);
  if (!str) return null;

  return formatTime(str);
}

function parseWorkTime(str) {
  const [h, m] = str.split('h');

  return parseInt(h) * 60 + parseInt(m);
}

function parseTotal(mins) {
  const hh = Math.floor(mins / 60);
  const mm = mins % 60;

  return `${hh}h${mm}`;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    // chrome.runtime.sendMessage({
    //   message: 'open_new_tab',
    //   url: 'http://google.com'
    // });

    if (document.querySelector('#moonshine')) return;

    if (
      document.querySelector(loadingQuery).style.display !== 'none' ||
      document.querySelector(openAssignLoadingQuery)
    ) {
      alert('Please wait for the page to finish loading...');
      return;
    }

    Utils.renderMenu();
    Utils.addEventListeners();
  }
});
