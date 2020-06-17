class Utils {
  static async saveBtnClk() {
    // const title = document.querySelector(this.parseClxsStr(State.settings.fieldClasses.parent));
    const bidId = getText(document, State.settings.bidIdQ);

    if (!bidId) {
      alert('Please select an assignment.');
      return;
    }

    // const bidId = getText(document, State.settings.bidIdQ);
    await DOM.scrape(bidId);

    if (await Bids.findBid(bidId)) {
      alert('Bid already saved to favorites');
    } else {
      await Bids.addBid(State.data);
    }
  }

  static async configureApp() {
    const {queries} = Config;

    for (let i = 0; i < queries.length; i++) {
      const q = queries[i];
      const bidId = document.querySelector(q.bidIdQ);
      const favorites = document.getElementById('ssa-app');

      if (bidId) {
        State.settings = q;
        await DOM.scrape(bidId.innerText);
      }

      const title = document.querySelector(menuTitleQ).innerHTML;

      if ((title === queries[i].menuTitle || bidId) && !favorites) {
        DOM.renderFavorites();
      }
    }
  }

  static parseClxsStr(str) {
    return `.${str.split(' ').join('.')}`;
  }

  static getText(elem, query) {
    const e = elem.querySelector(query);

    if (!e) {
      console.log(`query error`, {query, e});
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
}
