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
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "../client/css/stylesheet.css";

import { setTabs,     DEFAULT_JTR_MS_TABS  } from "../client/js/motorsport.js";
import { setRoute,    DEFAULT_JTR_ROUTES   } from "../client/js/router.js";
import { setPartials, DEFAULT_JTR_PARTIALS } from "../client/js/partial.js";

let tabs     = DEFAULT_JTR_MS_TABS,
    routes   = DEFAULT_JTR_ROUTES,
    partials = DEFAULT_JTR_PARTIALS;

for(let t in tabs)
    tabs[t].cache = require("../client/" + tabs[t].templateUrl);

for(let r in routes)
    routes[r].cache = require("../client/" + routes[r].templateUrl);

for(let p in partials)
    partials[p].cache = require("../client/" + partials[p].templateUrl);
