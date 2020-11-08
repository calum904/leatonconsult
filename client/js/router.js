/**
 * @file router.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief A simple UI Router for VanillaJS Single Page Applications
 */
import { renderPartials } from "./partial.js";

import { navbarUpdate } from "./navbar.js";

import { loadHtml } from "./loadHtml.js";

const JTR_APP_NAME = "jtrApp";

const JTR_ROUTES = {
    "home":       { "templateUrl": "partial/views/home.html",       "cache": null },
    "about":      { "templateUrl": "partial/views/about.html",      "cache": null },
    "contact":    { "templateUrl": "partial/views/contact.html",    "cache": null },
    "motorsport": { "templateUrl": "partial/views/motorsport.html", "cache": null }
};

window.addEventListener("hashchange", loadRoute);

/**
 * @brief Obtains the HTML associate with the route
 *
 * @param  route   - The route to load
 * @return promise - A promise to return the HTML
 */
function obtainHtml(route) {
    return new Promise((resolve, reject) => {
        loadHtml(JTR_ROUTES[route].templateUrl).then((html) => {
            JTR_ROUTES[route].cache = html;
            resolve(html);
        });
    });
}

/**
 * @brief Loads the next view onto the DOM
 */
function loadRoute() {
    let route = location.hash;
    
    if(undefined === route)
        location.hash = route = "/home";

    route = route.slice(2);
    
    if(undefined !== JTR_ROUTES[route]) {
        let rPromise = (null === JTR_ROUTES[route].cache) ? obtainHtml(route) : new Promise((resolve, reject) => resolve(JTR_ROUTES[route].cache) );

        rPromise.then(renderHtml);
    } else
        throw new Error("No route found");
}

/**
 * @brief Assigns the HTML to the application DOM element
 *
 * @param html - The raw HTML Text to assign to the DOM
 */
function renderHtml(html) {
    let app = document.getElementById(JTR_APP_NAME);
    app.innerHTML = html;
    renderPartials().then(() => navbarUpdate() );
}

export {
    loadRoute
};
