class Utils {
  static renderHeaderCells(header, totalWork, totalSplit) {
    header.insertAdjacentHTML(
      'beforeend',
      Components.HeaderCells(totalWork, totalSplit)
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

  static addEventListeners() {
    document.getElementById('save-run').onclick = Utils.saveBtnClk;
    document.getElementById('toggle-menu').onclick = Utils.toggleMenu;
    document.getElementById('menu-close').onclick = Utils.toggleMenu;
    document.getElementById('menu-clear').onclick = Utils.clearBids;
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

  static renderFieldCells(e, splitTime) {
    e.querySelector(detailViewQuery).insertAdjacentHTML(
      'beforeend',
      Components.FieldCells(splitTime)
    );
  }
}
