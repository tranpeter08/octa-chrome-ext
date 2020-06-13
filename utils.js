class Utils {
  static renderHeaderCells(header, totalWork, totalSplit) {
    header.insertAdjacentHTML(
      'beforeend',
      Components.HeaderCells(totalWork, totalSplit)
    );
  }

  static renderFieldCells(e, splitTime) {
    e.querySelector(detailViewQuery).insertAdjacentHTML(
      'beforeend',
      Components.FieldCells(splitTime)
    );
  }

  static renderMenu() {
    document.body.insertAdjacentHTML('beforeend', Components.Menu());
    Utils.renderBids();
  }

  static async renderBids() {
    const bids = await Bids.getBids();
    const container = document.getElementById('bids-container');

    if (!bids || !bids.length) {
      container.innerHTML = Components.NoBids();
      return;
    }

    const elems = bids.map((b, i) => Components.BidItem(b, i));
    container.innerHTML = elems.join('');
  }

  static async saveBtnClk() {
    const title = document.querySelector(openAssignmentTitleQuery);

    if (!title) {
      alert('Please select an assignment.');
      return;
    }

    const bidId = getText(document, assignmentQuery);
    await Utils.scrapePage(bidId);

    if (await Bids.findBid(bidId)) {
      alert('Bid already saved to favorites');
    } else {
      await Bids.addBid(State.data);
    }
  }

  static toggleMenu() {
    const menu = document.getElementById('SSA-menu');
    const menuBtn = document.getElementById('toggle-menu');

    menuBtn.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  }

  static clearBids() {
    Bids.deleteAll();
    Utils.renderBids();
  }

  static async scrapePage(bidId) {
    const moon = document.querySelector('#moonshine');
    const header = document.querySelector(headerQuery);

    if (!header) {
      return;
    }

    const list = document.querySelectorAll(listDetailQuery);

    if (!list.length) {
      alert('Error :(');
      return;
    }

    let totalSplit = 0;
    let totalWork = 0;
    let daysOff = [];

    list.forEach(e => {
      const runId = getText(e, idQuery);

      if (!runId) return;

      if (runId === 'OFF') {
        const day = getText(e, workdayQuery);
        if (day) daysOff.push(day);
        return;
      }

      const startTime = getMinutes(e, startTimeQuery);

      if (!startTime) return;

      const endTime = getMinutes(e, endTimeQuery);
      const workTime = parseWorkTime(getText(e, workQuery));
      const splitTime = endTime - startTime - workTime;

      if (!moon) {
        Utils.renderFieldCells(e, splitTime);
      }

      totalSplit += splitTime;
      totalWork += workTime;
    });

    totalSplit = parseTotal(totalSplit);
    totalWork = parseTotal(totalWork);

    State.data = {
      bidId,
      totalWork,
      totalSplit,
      daysOff
    };

    if (!moon) {
      Utils.renderHeaderCells(header, totalWork, totalSplit);
    }
  }

  static addEventListeners() {
    document.getElementById('save-run').onclick = Utils.saveBtnClk;
    document.getElementById('toggle-menu').onclick = Utils.toggleMenu;
    document.getElementById('menu-close').onclick = Utils.toggleMenu;
    document.getElementById('menu-clear').onclick = Utils.clearBids;
  }
}

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

function renderFavorites() {
  document.body.insertAdjacentHTML('beforeend', Components.Favorites());

  const app = new Vue({
    el: '#ssa-app',
    data: {
      data: null,
      showMenu: false,
      list: []
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    }
  });
}
