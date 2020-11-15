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

import { getJumboImage } from "./jumboImages.js";

/* Controllers */
import { init as msInit } from "./motorsport.js";

import { init as conInit } from "./contact.js";

const JTR_APP_NAME = "jtrApp";

const DEFAULT_JTR_ROUTES = { 
    "home":       { "templateUrl": "partial/views/home.html",       "cache": null, "init": null    },
    "about":      { "templateUrl": "partial/views/about.html",      "cache": null, "init": null    },
    "contact":    { "templateUrl": "partial/views/contact.html",    "cache": null, "init": conInit },
    "motorsport": { "templateUrl": "partial/views/motorsport.html", "cache": null, "init": msInit  }
};

var JTR_ROUTES = DEFAULT_JTR_ROUTES;

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
    
    if("" === route)
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

    if(null !== app) {
        app.innerHTML = html;
        renderPartials().then(() => {
            let route = location.hash.slice(2);

            navbarUpdate();

            if(null !== JTR_ROUTES[route].init)
                JTR_ROUTES[route].init();

            let elem = document.getElementById(route + "Jumbotron");

            if(null !== elem)
                elem.style.setProperty("background-image", "url(" + getJumboImage(route) + ")");
        });
    }
}

/**
 * @brief Sets the available routes
 *
 * @param routes - The available routes
 */
function setRoutes(routes) {
    JTR_ROUTES = routes;
}

export {
    loadRoute,
    setRoutes,
    renderHtml,
    DEFAULT_JTR_ROUTES
};
