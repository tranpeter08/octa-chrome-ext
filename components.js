class Components {
  static Menu() {
    return `<div id="SSA-container">
      <button class="ssa-button" id="toggle-menu">Favorites</button>

      <div id="SSA-menu" class="hidden">
        <div>
          <button class="ssa-button" id="menu-close">CLOSE</button>
        </div>

        <h2 class="menu-title">Favorite Bids</h2>
        <ol id="bids-container"></ol>

        <div id="menu-button-container">
          <button class="ssa-button" id="menu-clear">CLEAR</button>
          <button class="ssa-button" id="save-run">ADD</button>
        </div>
      </div>
    </div>`;
  }

  static HeaderCells(totalWork, totalSplit) {
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
  }

  static FieldCells(splitTime) {
    const {cell, label, value} = State.settings.fieldClasses;

    return `<span class="${cell} ssa-field-cell">
      <span class="${label}">Splits: </span>  
      <span class="${value}">${Utils.parseTotal(splitTime)}</span>
    </span>`;
  }

  static Favorites() {
    return `<div id="ssa-app">
        <fav-open 
          :show_menu="showMenu" 
          :onclick="toggleMenu">
        </fav-open>

        <fav-menu
          :onclear="clearBids" 
          :onsave="saveBid"
          :onclose="toggleMenu"
          :show_menu="showMenu"
          :bids="bids"
        >
        </fav-menu>
      </div>`;
  }
}
