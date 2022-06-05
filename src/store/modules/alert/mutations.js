import { SET_ALERT } from "./types";

export default {
    [SET_ALERT] (state, alert) {
        state.alert = {...alert, status: true};
    },
    reset_alert(state) {
        state.alert = {
            status: false,
            text: '',
            color: ''
        }
    }
}