class Utils {
  static saveBtnClk() {
    const {data} = State;
    // chrome.storage.sync.get('bids', function({bids}) {
    //   const newBids = [...bids, data];

    //   chrome.storage.sync.set({bids: newBids}, function() {
    //     Utils.renderBids();
    //   });
    // });

    Bids.addBid(data);
    Utils.renderBids();
  }

  static toggleMenu() {
    const menu = document.getElementById('SSA-container');
    const menuBtn = document.getElementById('toggle-menu');

    menuBtn.classList.toggle('hidden');
    menu.classList.toggle('hidden');
  }

  static renderBids() {
    chrome.storage.sync.get('bids', function({bids}) {
      const elems = bids.map(b => `<li class="bid-item">${b.bidId}</li>`);
      const container = document.getElementById('bids-container');

      container.innerHTML = elems.join('');
    });
  }

  static addEventListeners() {
    document.getElementById('save-run').onclick = Utils.saveBtnClk;
    document.getElementById('toggle-menu').onclick = Utils.toggleMenu;
    document.getElementById('close-menu').onclick = Utils.toggleMenu;
  }
}
