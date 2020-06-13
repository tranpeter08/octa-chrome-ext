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
    `
});

Vue.component('fav-menu', {
  props: ['onclose', 'show_menu'],
  template: `<div id="SSA-menu" :class="{hidden: !show_menu}">
      <div>
        <button
          id="menu-close"
          class="ssa-button" 
          v-on:click="onclose"
        >
          CLOSE
        </button>
      </div>

      <h2 class="menu-title">Favorite Bids</h2>
      <ol id="bids-container"></ol>

      <div id="menu-button-container">
        <button class="ssa-button" id="menu-clear">CLEAR</button>
        <button class="ssa-button" id="save-run">ADD</button>
      </div>
    </div>`
});
