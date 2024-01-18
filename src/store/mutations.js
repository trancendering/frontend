export default {
    addItem(state, payload) {
        const newItems = [...state.items, payload];
        state.items = newItems;

        return state;
    },
    clearItem(state, payload) {
        const copiedItems = state.items.slice();
        copiedItems.splice(payload.index, 1);
        state.items = Object.assign([], copiedItems);

        return state;
    },
    logIn(state) {
        state.isLoggedIn = true;

        return state;
    },
    logOut(state) {
        state.isLoggedIn = false;

        return state;
    },
    setLanguage(state, payload) {
        state.languageId = payload.languageId;

        return state;
    }
};
