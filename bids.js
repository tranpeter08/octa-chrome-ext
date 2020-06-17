class Bids {
  static async findBid(id) {
    const bids = await Bids.getBids();

    return bids.find((b) => b && b.bidId === id);
  }

  static getBids() {
    return new Promise((resolve, rej) => {
      const collection = State.settings.menuTitle;
      chrome.storage.sync.get('bids', function ({bids}) {
        if (bids && bids[collection]) {
          resolve(bids[collection]);
        } else {
          chrome.storage.sync.set(
            {bids: {...bids, [collection]: []}},
            function () {
              console.log('b');
              resolve(null);
            }
          );
        }
      });
    });
  }
  // update to find correct collection

  static async addBid(bid) {
    if (!bid) {
      alert('Please select an assignment');
      console.log('Missing bid');
      return;
    }
    const bids = await Bids.getBids();
    const match = bids.find((b) => b.bidId === bid.bidId);

    if (match) {
      alert('Assignment already saved');
      return;
    }

    const collection = State.settings.menuTitle;

    return new Promise((resolve, rej) => {
      chrome.storage.sync.set(
        {bids: {...bids, [collection]: [...bids, bid]}},
        function () {
          resolve(1);
        }
      );
    });
  }

  static deleteAll() {
    chrome.storage.sync.set({bids: {[State.settings.menuTitle]: []}});
  }
}
