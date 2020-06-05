class Bids {
  static findBid(bids = [], id) {
    return bids.find(b => b.bidId === id);
  }

  static getBids() {
    return chrome.storage.sync.get('bids', function({bids}) {
      return bids;
    });
  }

  static addBid(bid) {
    const bids = Bids.getBids();

    if (!Bids.findBid(bids, bid.bidId)) {
      alert('Assignment already saved');
      return;
    }

    chrome.storage.sync.set({bids: [...bids, bid]});
  }
}
