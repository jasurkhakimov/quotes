import { SET_CATEGORIES_DATA } from "./types";

export default {
    [SET_CATEGORIES_DATA] (state, categories) {
        state.categories = categories;
    }
}