
import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const state = {
    alert: {
        status: false,
        text: '',
        color: ''
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};