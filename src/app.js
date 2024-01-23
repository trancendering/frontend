import router, {navigateTo} from "./views/utils/router.js";

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        const targetElement = e.target.closest("[data-link]");

        if (targetElement) {
            e.preventDefault();
            navigateTo(targetElement.href);
        }
    });

    router();
});
