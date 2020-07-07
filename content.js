'use strict';
window.onload = function () {
  console.log('Self-Service Assistant enabled');

  Utils.configureApp();
  MutnObsvr.init();
};

let keys = {};
const codes = [16, 17, 72];

Utils.addHKeyListeners(keys, codes);
Utils.addChromeMsgListener();
