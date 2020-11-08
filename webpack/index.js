/**
 * @file index.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Webpack Entrypoint
 */
import "bootswatch/dist/slate/bootstrap.min.css";
//import "font-awesome/css/font-awesome.min.css";
import "../client/css/stylesheet.css";

import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";

import { loadRoute } from "../client/js/router.js";

import { setTabs,     DEFAULT_JTR_MS_TABS  } from "../client/js/motorsport.js";
import { setRoute,    DEFAULT_JTR_ROUTES   } from "../client/js/router.js";
import { setPartials, DEFAULT_JTR_PARTIALS } from "../client/js/partial.js";

import { setJumboImages } from "../client/js/jumboImages.js";

import homeJumbo       from "../client/images/homeJumbo.jpg";
import aboutJumbo      from "../client/images/aboutJumbo.jpg";
import contactJumbo    from "../client/images/homeJumbo.jpg";
import motorsportJumbo from "../client/images/motorsportJumbo.jpg";

const JTR_JUMBO_IMAGES = {
    "home":       homeJumbo,
    "about":      aboutJumbo,
    "contact":    contactJumbo,
    "motorsport": motorsportJumbo
};
setJumboImages(JTR_JUMBO_IMAGES);

let tabs     = DEFAULT_JTR_MS_TABS,
    routes   = DEFAULT_JTR_ROUTES,
    partials = DEFAULT_JTR_PARTIALS;

for(let t in tabs)
    tabs[t].cache = require("../client/" + tabs[t].templateUrl);

for(let r in routes)
    routes[r].cache = require("../client/" + routes[r].templateUrl);

for(let p in partials)
    partials[p].cache = require("../client/" + partials[p].templateUrl);

loadRoute();
