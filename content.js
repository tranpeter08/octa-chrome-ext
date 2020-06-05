console.log('Self Service Assistant enabled');

document.head.insertAdjacentHTML('beforeend', css);

function getText(elem, query) {
  return elem.querySelector(query).innerText;
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

    const list = document.querySelectorAll(listDetailQuery);

    if (!list.length) {
      alert('Please select an assignment');
      return;
    }

    let totalWork = 0;
    let totalSplit = 0;
    const daysOff = [];

    list.forEach(e => {
      const runId = getText(e, idQuery);

      if (runId === 'OFF') {
        daysOff.push(getText(e, workdayQuery));
        return;
      }

      const startTime = getMinutes(e, startTimeQuery);
      const endTime = getMinutes(e, endTimeQuery);
      const workTime = parseWorkTime(getText(e, workQuery));
      const splitTime = endTime - startTime - workTime;

      e.querySelector(detailViewQuery).insertAdjacentHTML(
        'beforeend',
        `<span style="${border}" class="${fieldCellClasses}">
          <span class="${fieldCellLabelClasses}">Splits: </span>  
          <span class="${fieldCellValueClasses}">${parseTotal(splitTime)}</span>
      </span>`
      );

      totalSplit += splitTime;
      totalWork += workTime;
    });

    const header = document.querySelector(headerQuery);
    const bidId = getText(document, assignmentQuery);
    totalSplit = parseTotal(totalSplit);
    totalWork = parseTotal(totalWork);

    if (!header) {
      alert('error');
      return;
    }

    header.insertAdjacentHTML(
      'beforeend',
      `<div id="moonshine"></div>
      <div style="${border}" class="${headerClasses}">
        <div class="${headerLabelClasses}">Total Work Time: </div>
        <div class="${headerValueClasses}">${totalWork}</div>
      </div>
      <div style="${border}" class="${headerClasses}">
        <div class="${headerLabelClasses}">Total Split Time: </div>
        <div class="${headerValueClasses}">${totalSplit}</div>
      </div>
      <button id="toggle-menu">MENU</button>
      <div id="SSA-container" class="hidden">
        <button id="close-menu">CLOSE</button>

        <h2>Saved Bids</h2>
        <ul id="bids-container"></ul>

        <button id="save-run">SAVE</button>
      </div>
      `
    );

    State.data = {
      bidId,
      totalWork,
      totalSplit,
      daysOff
    };

    Utils.addEventListeners();
    Utils.renderBids();
  }
});
