/**
 * @file partial.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Renderer for partials
 */
const JTR_PARTIALS = {
    "jtr-navbar": { "templateUrl": "partial/components/navbar.html", "javascript": "", "cache": null },
    "jtr-footer": { "templateUrl": "partial/components/footer.html", "javascript": "", "cache": null }
};

/**
 * @brief Loads the partials into memory ready to be used
 */
function loadPartials() {
    for(let index in JTR_PARTIALS)
        obtainHtml(index);
}

/**
 * @brief Obtains the HTML from the server and caches it locally
 *
 * @param  tagName - The name of the tag to fetch the content for
 * @return promise - A promise to resolve the HTML loaded from the server
 */
function obtainHtml(tagName) {
    return new Promise((resolve, reject) => {
        fetch(JTR_PARTIALS[tagName].templateUrl).then((data) => {
            return data.text();
        }).then((html) => {
            JTR_PARTIALS[tagName].cache = html;
            resolve({ "tag": tagName, "html": html });
        });
    });
}

/**
 * @brief Iterates through the available lists of partials &
 *        attempts to apply them to the DOM
 */
function renderPartials() {
    for(let index in JTR_PARTIALS) {
        let htmlPromise = (null === JTR_PARTIALS[index].cache) ? obtainHtml(index) : new Promise((resolve) => resolve({ "tag": index, "html": JTR_PARTIALS[index].cache }) );
    
        htmlPromise.then((html) => {
            let tags = document.querySelectorAll(html.tag);

            for(let el of tags)
                el.innerHTML = html.html;
        });
    }
}

export {
    loadPartials,
    renderPartials
};
