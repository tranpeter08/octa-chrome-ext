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

  static BidItem(bid, i) {
    return `<li class="bid-item" >
    <div class="bid-item-index">${i + 1}) </div>
    <div class="bid-item-detail-container">
      ${Components.BidItemDetail('Bid ID', bid.bidId, 'bid-item-grid-1')}
      ${Components.BidItemDetail('Work', bid.totalWork, 'bid-item-grid-2')}
      ${Components.BidItemDetail('Splits', bid.totalSplit, 'bid-item-grid-3')}
      ${Components.BidItemDetail(
        'Days Off',
        bid.daysOff.join(', '),
        'bid-item-grid-4'
      )}
    </div>
  </li>`;
  }

  static BidItemDetail(label, value, grid) {
    return `<span class="bid-item-label ${grid}">
      ${label}:${' '}
      <span class="bid-item-value">${value}</span>
    </span>`;
  }

  static NoBids() {
    return `<div class="no-bids"> - No bids saved - </div>`;
  }

  static HeaderCells(
    totalWork,
    totalSplit,
    headerClass,
    labelClasses,
    valueClasses
  ) {
    return `<div id="moonshine"></div>
      <div class="${headerClasses} ssa-field-cell">
        <div class="${headerLabelClasses}">Total Work Time: </div>
        <div class="${headerValueClasses}">${totalWork}</div>
      </div>
      <div class="${headerClasses} ssa-field-cell">
        <div class="${headerLabelClasses}">Total Split Time: </div>
        <div class="${headerValueClasses}">${totalSplit}</div>
      </div>
    `;
  }

  static FieldCells(splitTime, cellClasses, labelClasses, valueClasses) {
    return `<span class="${fieldCellClasses} ssa-field-cell">
      <span class="${fieldCellLabelClasses}">Splits: </span>  
      <span class="${fieldCellValueClasses}">${parseTotal(splitTime)}</span>
    </span>`;
  }

  static Favorites() {
    return `<div id="ssa-app">
          <fav-open 
            :show_menu="showMenu" 
            :onclick="toggleMenu">
          </fav-open>

          <fav-menu 
            :onclose="toggleMenu"
            :show_menu="showMenu">
          </fav-menu>
        </div>`;
  }
}
