/**
 * @file navbar.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Contains navbar business logic
 */
const NAV_LIST_ELEM_ID = "jtrNavBarList";

const NAV_BAR_LOCATION = {
    "home":       true,
    "about":      true,
    "contact":    true,
    "motorsport": true
};

/**
 * @brief Updates the navbar with the correct active tab
 */
function navbarUpdate() {
    let hash = location.hash.slice(2);

    if(true === NAV_BAR_LOCATION[hash]) {
        let navList = document.getElementById(NAV_LIST_ELEM_ID);

        if(null !== navList) {
            let navElems = navList.querySelectorAll("li"),
                idToFind = hash + "Item";

            for(let elem of navElems) {
                if(idToFind === elem.id)
                    elem.classList.add("active");
                else
                    elem.classList.remove("active");
            }

        } else
            throw new Error("Unable to locate navigation bar list");
    }
}

export {
    navbarUpdate
};
