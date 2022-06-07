export default {
    set_quotes (state, quotes) {
        state.quotes = quotes;
    },
    set_random_quote(state, quote) {
        state.random_quote = quote;
    },
    reset_shown_quotes(state) {
        state.shown_quotes = []
    },
    add_quote_to_shown(state, id) {
        state.shown_quotes?.push(id);
    }
}