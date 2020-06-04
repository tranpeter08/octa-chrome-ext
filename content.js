console.log('chrome extension applicable');

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

// html classes
const fieldCellClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell  Field_Cell';
const fieldCellLabelClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Label Cell_Label';
const fieldCellValueClasses =
  'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value Cell_Value';

function getInnerText(elem, query) {
  return elem.querySelector(query).innerText;
}

function formatTime(str) {
  const [time, ampm] = str.split(' ');
  const [hr, min] = time.split(':');

  const h =
    time === '12:00 AM'
      ? 0
      : time === '12:00 PM'
      ? 12
      : ampm === 'AM'
      ? parseInt(hr)
      : parseInt(hr) + 12;

  return h * 60 + parseInt(min);
}

function parseWorkTime(str) {
  const [h, m] = str.split('h');

  return parseInt(h) * 60 + parseInt(m);
}

function parseTotal(mins) {
  return `${Math.floor(mins / 60)}:${mins % 60}`;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === 'clicked_browser_action') {
    // chrome.runtime.sendMessage({
    //   message: 'open_new_tab',
    //   url: 'http://google.com'
    // });

    console.log('hello');

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

    let totalMins = 0;

    list.forEach((e) => {
      if (getInnerText(e, idQuery) === 'OFF') return;

      const startTime = getInnerText(e, startTimeQuery); // e.querySelector(startTimeQuery).innerText;
      const endTime = getInnerText(e, endTimeQuery); //e.querySelector(endTimeQuery).innerText;
      const workTime = parseWorkTime(getInnerText(e, workQuery)); //e.querySelector(workQuery).innerText;

      // format time, convert to minutes
      const start = formatTime(startTime);
      const end = formatTime(endTime);

      let diff = end - start;

      if (!Math.sign(diff)) {
        diff = end + start;
      }

      const splitTime = diff - workTime;

      totalMins += workTime;

      console.log({start, end, diff, splitTime});
    });

    console.log(parseTotal(totalMins));
  }
});
