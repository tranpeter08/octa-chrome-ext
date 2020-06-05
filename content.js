console.log('Self Service Assistant enabled');

// styles
const border = 'border: 1px solid grey;border-radius: .2rem; padding: .1rem;';
const btnStyle = 'position: fixed; bottom: 20px; right: 20px;';

// queries
const listDetailQuery = '.OpenAssignmentBidOpenAssignmentDetailWorkday_View';
const idQuery =
  '.OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value.DisplayIdentifier_Cell_Value';
const startTimeQuery =
  '.OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value.StartTime_Cell_Value';
const endTimeQuery =
  '.OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value.EndTime_Cell_Value';
const workQuery =
  '.OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value.WorkingTime_Cell_Value';
const loadingQuery = '#Loading';
const openAssignLoadingQuery = '.LoadingPanel.OpenAssignmentBidLoadingPanel';

// field classes
const fieldCellClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell  Field_Cell';
const fieldCellLabelClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Label Cell_Label';
const fieldCellValueClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value Cell_Value';

// header class
const headerClasses =
  'OpenAssignmentBidOpenAssignmentDetailHeader_Cell Field_Cell';
const headerLabelClasses =
  'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Label Cell_Label';
const headerValueClasses =
  'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value Cell_Value';

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

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
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

    list.forEach((e) => {
      const runId = getText(e, idQuery);

      if (runId === 'OFF') return;

      const startTime = getMinutes(e, startTimeQuery);
      const endTime = getMinutes(e, endTimeQuery);
      const workTime = parseWorkTime(getText(e, workQuery));
      const splitTime = endTime - startTime - workTime;

      e.insertAdjacentHTML(
        'beforeend',
        `<span style="${border}" class="${fieldCellClasses}">
          <span class="${fieldCellLabelClasses}">Splits: </span>  
          <span class="${fieldCellValueClasses}">${parseTotal(splitTime)}</span>
      </span>`
      );

      totalSplit += splitTime;
      totalWork += workTime;
    });

    const header = document.querySelector(
      '.OpenAssignmentBidOpenAssignmentDetailHeader_View'
    );

    if (!header) {
      alert('error');
      return;
    }

    header.insertAdjacentHTML(
      'beforeend',
      `<div id="moonshine"></div>
      <div style="${border}" class="${headerClasses}">
        <div class="${headerLabelClasses}">Total Work Time: </div>
        <div class="${headerValueClasses}">${parseTotal(totalWork)}</div>
      </div>
      <div style="${border}" class="${headerClasses}">
        <div class="${headerLabelClasses}">Total Split Time: </div>
        <div class="${headerValueClasses}">${parseTotal(totalSplit)}</div>
      </div>
      <button id="toggle-menu" style="${btnStyle}">SAVE</button>
      `
    );
  }
});
