import Config from './config';
import State from './state';
import DOM from './dom';

const Utils = {
  async configureApp() {
    const {queries, menuTitleQ, employeeIdQ} = Config;
    State.employeeId = document.querySelector(employeeIdQ).innerHTML;

    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      const bidId = document.querySelector(this.parseClxsStr(q.bidIdClasses));
      const title = document.querySelector(menuTitleQ);
      const favorites = document.getElementById('ssa-app');

      // !bidId &&
      if (!title || title.innerHTML !== q.menuTitle) {
        continue;
      }

      State.settings = q;

      if (bidId) {
        await DOM.scrape(bidId.innerText);
      }

      if (!favorites) {
        DOM.renderFavorites();
      }

      break;
    }
  },

  parseClxsStr(str) {
    return `.${str.split(' ').join('.')}`;
  },

  getText(elem, query) {
    const e = elem.querySelector(query);

    if (!e) {
      return null;
    }

    return e.innerText;
  },

  formatTime(str) {
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
  },

  getMinutes(elem, query) {
    const str = Utils.getText(elem, query);
    if (!str) return null;

    return Utils.formatTime(str);
  },

  parseWorkTime(str) {
    const [h, m] = str.split('h');

    return parseInt(h) * 60 + parseInt(m);
  },

  parseTotal(mins) {
    const hh = Math.floor(mins / 60);
    const mm = mins % 60;

    function formatTime(time) {
      return time < 10 ? '0' + time.toString() : time;
    }

    return `${formatTime(hh)}h${formatTime(mm)}`;
  },

  addHKeyListeners(keys, codes) {
    document.addEventListener('keydown', (e) => {
      const {keyCode: kc} = e;

      if (!codes.includes(kc)) return;

      if (!keys[kc]) {
        keys[kc] = true;
      }

      for (const code of codes) {
        if (!keys[code]) return;
      }

      this.configureApp();
    });

    document.addEventListener('keyup', () => {
      const list = Object.keys(keys);

      if (list.length) {
        keys = {};
      }
    });
  },

  addChromeMsgListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'clicked_browser_action') {
        this.configureApp();
      }
    });
  },
};

export default Utils;
