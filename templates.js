Vue.component('menu-button', {
  props: ['onclick'],
  template: '<button v-on:click="onclick">Favorites</button>'
});
