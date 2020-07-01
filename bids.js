class Bids {
  static async findBid(id) {
    const bids = await this.getBids();
    return bids[State.settings.menuTitle].find((b) => b && b.bidId === id);
  }

  static getBids() {
    return new Promise((resolve, rej) => {
      const collection = State.settings.menuTitle;

      chrome.storage.sync.get('bids', function ({bids}) {
        if (!bids[collection]) {
          chrome.storage.sync.set(
            {bids: {...bids, [collection]: []}},
            function () {
              resolve({...bids, [collection]: []});
            }
          );
        }

        resolve(bids);
      });
    });
  }

  static async addBid(bid) {
    if (!bid) {
      alert('Please select an assignment');
      return;
    }

    const collection = State.settings.menuTitle;
    const allBids = await this.getBids();
    const bids = allBids[collection];

    const match = bids.find((b) => b.bidId === bid.bidId);

    if (match) {
      alert('Assignment already added to favorites');
      return;
    }

    return new Promise((resolve, rej) => {
      chrome.storage.sync.set(
        {bids: {...allBids, [collection]: [...bids, bid]}},
        function () {
          resolve(1);
        }
      );
    });
  }

  static async deleteAll() {
    const bids = await this.getBids();
    chrome.storage.sync.set({bids: {...bids, [State.settings.menuTitle]: []}});
  }

  static async deleteById(bidId) {
    const bids = await this.getBids();
    const others = bids[State.settings.menuTitle].filter(
      (b) => b.bidId !== bidId
    );

    if (others.length === bids.length) {
      console.log('bid not found, none deleted');
      return null;
    }

    return new Promise((resolve, rej) => {
      chrome.storage.sync.set(
        {
          bids: {
            ...bids,
            [State.settings.menuTitle]: others,
          },
        },
        function () {
          resolve({...bids, [State.settings.menuTitle]: others});
        }
      );
    });
  }
}
