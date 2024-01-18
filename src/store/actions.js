export default {
    addItem(context, payload) {
        context.commit('addItem', payload);
    },
    clearItem(context, payload) {
        context.commit('clearItem', payload);
    },
    logIn(context) {
        context.commit('logIn');
    },
    logOut(context) {
        context.commit('logOut');
    },
    setLanguage(context, payload) {
        context.commit('setLanguage', payload);
    },
    setGameMode(context, payload) {
        context.commit('setGameMode', payload);
    },
    }
};
