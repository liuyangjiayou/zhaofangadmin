import Vue  from 'vue';
import Vuex from 'vuex';

import stateObj from './state/state';
import actions from './actions/actions';
import mutations from './mutations/mutations';
import getters from './getters/getters';
Vue.use(Vuex);
let store = new Vuex.Store({
    state : stateObj,
    actions,
    mutations,
    getters,
});
export default store