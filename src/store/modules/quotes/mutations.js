import { SET_USER_DATA } from "./types";

export default {
    [SET_USER_DATA] (state, user) {
        state.user = user;
    }
}