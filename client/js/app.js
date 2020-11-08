/**
 * @file app.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Entry point to the application
 */
import { loadRoute } from "./router.js";

import { loadPartials } from "./partial.js";

import { init as msInit } from "./motorsport.js";

document.addEventListener("DOMContentLoaded", () => {
    loadPartials();
    loadRoute();
});
