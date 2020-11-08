/**
 * @file loadHtml.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Loads HTML as text from resource
 */

/**
 * @brief Attempts to load HTML as text from resource
 *
 * @param  templateUrl - The URL to load the resource from
 * @return promise    - A promise to resolve the URL as text
 */
function loadHtml(templateUrl) {
    return new Promise((resolve, reject) => {
        fetch(templateUrl).then((data) => {
            return data.text();
        }, (err) => reject(err)).then((html) => {
            resolve(html);
        });
    });
}

 export {
    loadHtml
 }
