/**
 * @file motorsport.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Business Logic for the motorsport page
 */
import { loadHtml } from "./loadHtml.js";

const JTR_TAB_BODY_ID = "motorsportTabBody";

const JTR_MS_TABS = {
    "other":             { "templateUrl": "partial/views/motorsport-other.html",  "cache": null },
    "resultService":     { "templateUrl": "partial/views/motorsport-result.html", "cache": null },
    "vboxCameraService": { "templateUrl": "partial/views/motorsport-vbox.html",   "cache": null }
};

/**
 * @brief Binds the tab navigation to the view
 */
function bindTabNavigation() {
    for(let tab in JTR_MS_TABS) {
        let elem = document.getElementById(tab + "Item");

        if(null !== elem) {
            elem.addEventListener("click", function() { 
                showTabContent(this.getAttribute("display-data"));
            });
        } else
            console.log("[ERROR] Unable to bind tab element");
    }
}

/**
 * @brief Renders the tabs contents to the DOm
 */
function showTabContent(tabName) {
    let tab = JTR_MS_TABS[tabName];

    if(undefined === tab)
        tab = JTR_MS_TABS[vboxCameraService];
    
    let htmlPromise = (null === tab.cache) ? loadHtml(tab.templateUrl) : new Promise((resolve) => resolve(tab.cache));

    htmlPromise.then((html) => {
        let tabBody = document.getElementById(JTR_TAB_BODY_ID);

        if(null === tab.cache)
            tab.cache = html;
        
        if(null !== tabBody)
            tabBody.innerHTML = html;
    });
}

function init() {
    showTabContent("vboxCameraService");
    bindTabNavigation();
}

export {
    init,
    showTabContent
};
