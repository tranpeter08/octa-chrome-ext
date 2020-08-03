import Bids from './bids';
import Components from './components';
import Utils from './utils';
import State from './state';
import Vue from './vue.min.js';
import './templates';

const DOM = {
  renderHeaderCells(headerElem, totalWork, totalSplit) {
    headerElem.insertAdjacentHTML(
      'beforeend',
      Components.HeaderCells(totalWork, totalSplit)
    );
  },

  renderFieldCells(e, splitTime) {
    const query = Utils.parseClxsStr(State.settings.fieldClasses.detail);
    e.querySelector(query).insertAdjacentHTML(
      'beforeend',
      Components.FieldCells(splitTime)
    );
  },

  async scrape(bidId) {
    const {headerClasses, fieldClasses} = State.settings;
    const {
      parseClxsStr,
      parseTotal,
      getMinutes,
      getText,
      parseWorkTime,
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

    list.forEach((e) => {
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
      daysOff,
    };

    if (!moon) {
      this.renderHeaderCells(header, totalWork, totalSplit);
    }
  },

  renderFavorites() {
    document.body.insertAdjacentHTML('beforeend', Components.Favorites());
    State.menu = new Vue({
      el: '#ssa-app',
      data: {
        data: null,
        showMenu: false,
        bids: {},
        title: State.settings.menuTitle,
      },
      async created() {
        this.bids = await Bids.getBids();
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
          const added = await Bids.addBid(State.data);

          if (added) {
            this.bids = await Bids.getBids();
            this.$nextTick(function () {
              const ctnr = this.$el.querySelector('#bids-container');
              ctnr.scrollTo({
                top: ctnr.scrollHeight,
                behavior: 'smooth',
              });
            });
          }
        },

        async clearBids() {
          await Bids.deleteAll(this.bids);
          this.bids = {...this.bids, [this.title]: []};
        },

        async fetchBids() {
          this.bids = Bids.getBids();
        },
      },
    });
  },
};

export default DOM;
