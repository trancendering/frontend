import router, { navigateTo } from "./views/utils/router.js";
import store from "./store/index.js";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (event) => {
		const targetElement = event.target.closest("[data-link]");

        if (targetElement) {
			event.preventDefault();
            navigateTo(targetElement.href);
        }
    });

    if (store.state.gameStatus !== "playing"
        && window.location.pathname === "/game") {
		navigateTo("/");
	} else {
    router();
	}
});
