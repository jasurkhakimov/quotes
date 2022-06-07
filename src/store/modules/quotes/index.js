import mutations from './mutations';
import actions from './actions';
import getters from './getters';


const state = {
    quotes: [],
    shown_quotes: [],
    random_quote: {},
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters 
};