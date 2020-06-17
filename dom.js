class DOM {
  static renderHeaderCells(headerElem, totalWork, totalSplit) {
    headerElem.insertAdjacentHTML(
      'beforeend',
      Components.HeaderCells(totalWork, totalSplit)
    );
  }

  static renderFieldCells(e, splitTime) {
    const query = Utils.parseClxsStr(State.settings.fieldClasses.detail);
    e.querySelector(query).insertAdjacentHTML(
      'beforeend',
      Components.FieldCells(splitTime)
    );
  }

  static renderMenu() {
    document.body.insertAdjacentHTML('beforeend', Components.Menu());
  }

  static async scrape(bidId) {
    const {headerClasses, fieldClasses} = State.settings;
    const {
      parseClxsStr,
      parseTotal,
      getMinutes,
      getText,
      parseWorkTime
    } = Utils;

    const moon = document.querySelector('#moonshine');
    const header = document.querySelector(parseClxsStr(headerClasses.parent));

    if (!header) {
      return;
    }

    const list = document.querySelectorAll(parseClxsStr(fieldClasses.parent));

    if (!list.length) {
      alert('Error :(');
      return;
    }

    let totalSplit = 0;
    let totalWork = 0;
    let totalTime = 0;
    let daysOff = [];

    list.forEach(e => {
      const runId = getText(e, parseClxsStr(fieldClasses.runId));

      if (!runId) return;

      if (runId === 'OFF') {
        const day = getText(e, parseClxsStr(fieldClasses.day));
        if (day) daysOff.push(day);
        return;
      }

      const startTime = getMinutes(e, parseClxsStr(fieldClasses.start));

      if (!startTime) return;

      const endTime = getMinutes(e, parseClxsStr(fieldClasses.end));
      const workTime = parseWorkTime(
        getText(e, parseClxsStr(fieldClasses.work))
      );

      const actualTime = endTime - startTime;
      const splitTime = actualTime - workTime;

      if (!moon) {
        this.renderFieldCells(e, splitTime);
      }

      totalTime += actualTime;
      totalSplit += splitTime;
      totalWork += workTime;
    });

    totalSplit = parseTotal(totalSplit);
    totalWork = parseTotal(totalWork);
    totalTime = parseTotal(totalTime);

    State.data = {
      bidId,
      totalWork,
      totalSplit,
      totalTime,
      daysOff
    };

    if (!moon) {
      this.renderHeaderCells(header, totalWork, totalSplit);
    }
  }

  static renderFavorites() {
    document.body.insertAdjacentHTML('beforeend', Components.Favorites());

    State.menu = new Vue({
      el: '#ssa-app',
      data: {
        data: null,
        showMenu: false,
        bids: [],
        title: State.settings.menuTitle
      },
      async created() {
        this.bids = await Bids.getBids(State.settings.menuTitle);
      },

      methods: {
        toggleMenu() {
          this.showMenu = !this.showMenu;
        },

        async saveBid() {
          const bidId = document.querySelector(
            Utils.parseClxsStr(State.settings.bidIdClasses)
          );

          if (!bidId) {
            alert('Please select an assignment');
            return;
          }

          await DOM.scrape(bidId.innerHTML);

          if (await Bids.addBid(State.data)) {
            this.bids = [...this.bids, State.data];
          }
        },

        async clearBids() {
          await Bids.deleteAll();
          this.bids = [];
        },

        async fetchBids() {
          this.bids = Bids.getBids();
        }
      }
    });
  }
}
