'use strict';
import State from './state';

const {
  employeeId,
  settings: {menuTitle: collection},
} = State;

export default {
  async findBid(id) {
    // const {
    //   settings: {menuTitle: collection},
    // } = State;
    const bids = await this.getBids();
    // const collection = State.settings.menuTitle;
    return bids[collection].find((b) => b && b.bidId === id);
  },

  getBids() {
    /* 
      bids[employeeId][collection]
    */

    return new Promise((resolve, rej) => {
      // const {
      //   employeeId,
      //   settings: {menuTitle: collection},
      // } = State;

      chrome.storage.sync.get('bids', function ({bids}) {
        // no employeeid, set employeeid and set collection
        if (!bids[employeeId]) {
          bids[employeeId] = {};
        }

        if (!bids[employeeId][collection]) {
          bids[employeeId][collection] = [];

          // : {...bids, [collection]: []}
          chrome.storage.sync.set({bids}, function () {
            // {...bids, [collection]: []}
            resolve(bids);
          });
        }

        // if (!bids[collection]) {
        //   chrome.storage.sync.set(
        //     {bids: {...bids, [collection]: []}},
        //     function () {
        //       resolve({...bids, [collection]: []});
        //     }
        //   );
        // }

        resolve(bids);
      });
    });
  },

  async addBid(bid) {
    if (!bid) {
      alert('Please select an assignment');
      return;
    }

    // const collection = State.settings.menuTitle;
    // const {
    //   employeeId,
    //   settings: {menuTitle: collection},
    // } = State;

    const allBids = await this.getBids();
    const bids = allBids[employeeId][collection];

    const match = bids.find((b) => b.bidId === bid.bidId);

    if (match) {
      alert('Assignment already added to favorites');
      return;
    }

    return new Promise((resolve, rej) => {
      bids.push(bid);
      // bids: {...allBids, [collection]: [...bids, bid]}
      chrome.storage.sync.set({bids: allBids}, function () {
        resolve(1);
      });
    });
  },

  async deleteAll() {
    const bids = await this.getBids();
    bids[employeeId][collection] = [];
    chrome.storage.sync.set({bids});
  },

  async deleteById(bidId) {
    const bids = await this.getBids();
    const others = bids[employeeId][collection].filter(
      (b) => b.bidId !== bidId
    );

    if (others.length === bids.length) {
      console.log('bid not found, none deleted');
      return null;
    }

    return new Promise((resolve, rej) => {
      bids[employeeId][collection] = others;
      chrome.storage.sync.set({bids}, function () {
        resolve(bids);
      });
    });
  },
};
