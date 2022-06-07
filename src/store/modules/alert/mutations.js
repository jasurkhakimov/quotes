

export default {
    set_alert (state, alert) {
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