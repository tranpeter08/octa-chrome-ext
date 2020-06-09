class Bids {
  static async findBid(id) {
    const bids = await Bids.getBids();

    return bids.find(b => b.bidId === id);
  }

  static getBids() {
    return new Promise((resolve, rej) => {
      chrome.storage.sync.get('bids', function({bids}) {
        resolve(bids);
      });
    });
  }

  static async addBid(bid) {
    const bids = await Bids.getBids();
    const match = bids.find(b => b.bidId === bid.bidId);

    if (match) {
      alert('Assignment already saved');
      return;
    }

    chrome.storage.sync.set({bids: [...bids, bid]});
    Utils.renderBids();
  }

  static deleteAll() {
    chrome.storage.sync.set({bids: []});
  }
}
