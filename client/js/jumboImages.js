/**
 * @file jumboImages.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Stores the location of the jumbo images so that 
 *        they can be overloaded during webpacking
 */

const DEFAULT_JTR_JUMBO_IMAGES = {
    "home":       "images/homeJumbo.jpg",
    "about":      "images/aboutJumbo.jpg",
    "contact":    "images/homeJumbo.jpg",
    "motorsport": "images/motorsportJumbo.jpg"
};

var JTR_JUMBO_IMAGES = DEFAULT_JTR_JUMBO_IMAGES;

/**
 * @brief Returns a location of the image resource
 *
 * @param  loc  - The location to map the resource
 * @return path - The path of where to find the image
 */
function getJumboImage(loc) {
    let path = (undefined !== JTR_JUMBO_IMAGES[loc]) ? JTR_JUMBO_IMAGES[loc] : JTR_JUMBO_IMAGES["home"];
    return path;
}

/**
 * @brief Allows the default JTR Jumbo images to be overriden
 *
 * @param images - The location of images to override
 */
function setJumboImages(images) {
    JTR_JUMBO_IMAGES = images;
}

export {
    getJumboImage,
    setJumboImages
};
