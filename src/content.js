'use strict';
import Utils from './utils';
import MutnObsvr from './observer';
import State from './state';

window.onload = function () {
  console.log('Self-Service Assistant enabled');
  window.State = State;

  Utils.configureApp();
  MutnObsvr.init();
};

let keys = {};
const codes = [16, 17, 72];

Utils.addHKeyListeners(keys, codes);
Utils.addChromeMsgListener();
