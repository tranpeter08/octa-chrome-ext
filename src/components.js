import State from './state';
import Utils from './utils';

export default {
  HeaderCells(totalWork, totalSplit) {
    const {cell, label, value} = State.settings.headerClasses;

    return `<div id="moonshine"></div>
      <div class="${cell} ssa-field-cell">
        <div class="${label}">Total Work Time: </div>
        <div class="${value}">${totalWork}</div>
      </div>
      <div class="${cell} ssa-field-cell">
        <div class="${label}">Total Split Time: </div>
        <div class="${value}">${totalSplit}</div>
      </div>
    `;
  },

  FieldCells(splitTime) {
    const {cell, label, value} = State.settings.fieldClasses;

    return `<span class="${cell} ssa-field-cell">
      <span class="${label}">Splits: </span>  
      <span class="${value}">${Utils.parseTotal(splitTime)}</span>
    </span>`;
  },

  Favorites() {
    return `<div id="ssa-app">
        <fav-open 
          :show_menu="showMenu" 
          :onclick="toggleMenu">
        </fav-open>

        <fav-menu
          :title="title"
          :onclear="clearBids" 
          :onsave="saveBid"
          :onclose="toggleMenu"
          :show_menu="showMenu"
          :bids="bids"
        >
        </fav-menu>
      </div>`;
  },
};
