import Main from "./views/components/main.js";
import Login from "./views/components/login.js";
// import Login from "./views/components/game.js";

const viewCache = {};

const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = [
    {path: "/", view: Main},
    {path: "/login", view: Login},
    // {path: "/game", view: Game},
];

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const potentialMatches = routes.map((route) => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        };
    });

    let match = potentialMatches.find(
        (potentialMatch) => potentialMatch.result !== null
    );

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname],
        };
    }

    if (!viewCache[match.route.view]) {
        viewCache[match.route.view] = new match.route.view();
    } 
    viewCache[match.route.view].renderAll();
};

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
