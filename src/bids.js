'use strict';
import State from './state';

export default {
  async findBid(id) {
    const bids = await this.getBids();
    return bids[collection].find((b) => b && b.bidId === id);
  },

  async getBids() {
    const {employeeId} = State;
    const bids = await this.getAllBids();

    return bids[employeeId];
  },

  getAllBids() {
    const {
      employeeId,
      settings: {menuTitle: collection},
    } = State;

    return new Promise((resolve, rej) => {
      chrome.storage.sync.get('bids', function ({bids}) {
        if (!bids[employeeId]) {
          bids[employeeId] = {};
        }

        if (!bids[employeeId][collection]) {
          bids[employeeId][collection] = [];
          chrome.storage.sync.set({bids}, function () {
            resolve(bids);
          });
        }

        resolve(bids);
      });
    });
  },

  async addBid(bid) {
    const {
      employeeId,
      settings: {menuTitle: collection},
    } = State;

    if (!bid) {
      alert('Please select an assignment');
      return;
    }

    const allBids = await this.getAllBids();
    const bids = allBids[employeeId][collection];
    const match = bids.find((b) => b.bidId === bid.bidId);

    if (match) {
      alert('Assignment already added to favorites');
      return;
    }

    return new Promise((resolve, rej) => {
      bids.push(bid);
      chrome.storage.sync.set({bids: allBids}, function () {
        resolve(1);
      });
    });
  },

  async deleteAll() {
    const {
      employeeId,
      settings: {menuTitle: collection},
    } = State;

    const allBids = await this.getAllBids();
    allBids[employeeId][collection] = [];

    chrome.storage.sync.set({bids: allBids});
  },

  async deleteById(bidId) {
    const {
      employeeId,
      settings: {menuTitle: collection},
    } = State;
    const allBids = await this.getAllBids();
    const currentBids = allBids[employeeId][collection];
    const others = currentBids.filter((b) => b.bidId !== bidId);

    if (others.length === currentBids.length) {
      console.log('bid not found, none deleted');
      return null;
    }

    return new Promise((resolve, rej) => {
      allBids[employeeId][collection] = others;
      chrome.storage.sync.set({bids: allBids}, function () {
        resolve(allBids[employeeId]);
      });
    });
  },
};
