
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const state = {
    loading: false
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};