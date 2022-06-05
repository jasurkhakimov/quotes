import { RESET_ALERT } from "./types";

export default {
    [RESET_ALERT](context) {
        context.commit('reset_alert');
    }
}