import { RESET_ALERT, SET_ALERT } from "./types";

export default {
    [RESET_ALERT](context) {
        context.commit('reset_alert');
    },
    [SET_ALERT](context, alert) {
        context.commit('set_alert', alert);
    }
}