import Vue from './vue.min.js';
import State from './state';
import Bids from './bids';

Vue.component('fav-open', {
  props: ['onclick', 'show_menu'],
  template: `
      <button 
        :class="['ssa-button', {hidden: show_menu}]" 
        id="toggle-menu" 
        v-on:click="onclick"
      >
        Favorites
      </button>
    `,
});

Vue.component('fav-bids-list', {
  props: ['bids'],
  template: `<ol id="bids-container">
    <div 
      v-if="!bids || !bids.length" class="no-bids"
    >
      - No bids saved -
    </div>
   
    <li 
      v-else 
      v-for="(bid, i) in bids"
      :key="bid.bidId"
    >
      <fav-bids-list-item
        :bid="bid"
        :i="i"
      >
      </fav-bids-list-item>
    </li>
  </ol>`,
});

Vue.component('fav-bids-list-item', {
  props: ['bid', 'i'],
  methods: {
    async removeBid() {
      State.menu.bids = await Bids.deleteById(this.bid.bidId);
    },
  },
  template: `<li class="bid-item" >
    <div class="bid-item-index">{{i + 1}})</div>
    <div class="bid-item-detail-container">
      <fav-bids-list-item-detail
        :label="'Bid ID'"
        :value="bid.bidId"
        :grid="'bid-item-grid-1'"
      >
      </fav-bids-list-item-detail>
      <fav-bids-list-item-detail
        :label="'Work'"
        :value="bid.totalWork"
        :grid="'bid-item-grid-2'"
      >
      </fav-bids-list-item-detail>
      <fav-bids-list-item-detail
        :label="'Splits'"
        :value="bid.totalSplit"
        :grid="'bid-item-grid-3'"
      >
      </fav-bids-list-item-detail>
      <fav-bids-list-item-detail
        :label="'Days Off'"
        :value="bid.daysOff.join(', ')"
        :grid="'bid-item-grid-4'"
      >
      </fav-bids-list-item-detail>

      <div><button v-on:click="removeBid">Remove</button></div>
    </div>
  </li>`,
});

Vue.component('fav-bids-list-item-detail', {
  props: ['label', 'value', 'grid'],
  template: `<span :class="['bid-item-label', grid]">
    {{label}}:{{' '}}
    <span class="bid-item-value">{{value}}</span>
  </span>`,
});

Vue.component('fav-menu', {
  props: ['onclose', 'show_menu', 'bids', 'onsave', 'onclear', 'title'],
  template: `<div id="SSA-menu" :class="{hidden: !show_menu}">
    <div class="menu-close-container">
      <button
        id="menu-close"
        class="ssa-button" 
        v-on:click="onclose"
      >
        CLOSE
      </button>
    </div>

    <h2 class="menu-title">{{title}} Favorites</h2>

    <fav-bids-list :bids="bids[State.settings.menuTitle]">
    </fav-bids-list>

    <div id="menu-button-container">
      <button 
        v-on:click="onclear"
        class="ssa-button" 
        id="menu-clear"
      >
        CLEAR
      </button>
      <button
        v-on:click="onsave" 
        class="ssa-button" 
        id="save-run"
      >
        ADD
      </button>
    </div>
  </div>`,
});
