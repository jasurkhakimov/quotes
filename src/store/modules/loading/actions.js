import { SET_LOADING } from "./types";

export default {
    [SET_LOADING](context, bool) {
        context.commit('set_loading', bool);
    }
}