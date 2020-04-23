import Vue from 'vue'
import Util from './util';
/**权限指令**/
const hasPermission = {
  install (Vue, options) { 
    Vue.directive('hasPermission', {
      bind: function(el, binding) {
        if (!Util.abp.auth.hasPermission(binding.value)) {
          el.parentNode.removeChild(el);
        }
      }
    })
  }
};
export default hasPermission;