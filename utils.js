class Utils {
  static async configureApp() {
    const {queries} = Config;

    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      const bidId = document.querySelector(Utils.parseClxsStr(q.bidIdClasses));
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
  }

  static parseClxsStr(str) {
    return `.${str.split(' ').join('.')}`;
  }

  static getText(elem, query) {
    const e = elem.querySelector(query);

    if (!e) {
      return null;
    }

    return e.innerText;
  }

  static formatTime(str) {
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

  static getMinutes(elem, query) {
    const str = Utils.getText(elem, query);
    if (!str) return null;

    return Utils.formatTime(str);
  }

  static parseWorkTime(str) {
    const [h, m] = str.split('h');

    return parseInt(h) * 60 + parseInt(m);
  }

  static parseTotal(mins) {
    const hh = Math.floor(mins / 60);
    const mm = mins % 60;

    return `${hh}h${mm}`;
  }

  static addHKeyListeners(keys, codes) {
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
  }

  static addChromeMsgListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.message === 'clicked_browser_action') {
        this.configureApp();
      }
    });
  }
}
