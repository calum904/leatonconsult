/**
 * @file contact.js
 *
 * @version 1.0
 *
 * @author Calum Judd Anderson
 *
 * @brief Business logic for the contact page
 */

const JTR_CONTACT_FIELDS = {
    "inputFullName": { "data": "" },
    "inputEmail":    { "data": "" },
    "inputPhone":    { "data": "" },
    "inputService":  { "data": "IT Services" },
    "inputMessage":  { "data": "" }
};

/**
 * @brief Initialises the contact DOM
 */
function init() {
    for(let id in JTR_CONTACT_FIELDS) {
        let elem = document.getElementById(id);

        if(null !== elem)
            elem.addEventListener("input", bindData);
    }

    let submitBtn = document.getElementById("contactSubmit");

    if(null !== submitBtn)
        submitBtn.addEventListener("click", validateSubmission);
}

/**
 * @brief Binds the view to the model
 */
function bindData() {
    JTR_CONTACT_FIELDS[this.id].data = this.value;
}

/**
 * @brief Validates the data to be submitted
 */
function validateSubmission() {
    let valid = false;
    let alert = $('#alert');
    console.log("Alert: ", alert);

    for(let idx in JTR_CONTACT_FIELDS) {
        valid = (0 !== JTR_CONTACT_FIELDS[idx].data.length) ? true : false;

        if(false === valid)
            break;
    }
    
    console.log("Valid: ", valid);
    if(true === valid) {
    } else {
        console.log("Create Alert");
        createAlert();
    }
    console.log("Data:", JTR_CONTACT_FIELDS);
}

/**
 * @brief Creates an alert to display a message
 */
function createAlert() {
    let divElem    = document.createElement("div"),
        spanElem   = document.createElement("span"),
        buttonElem = document.createElement("button");

    spanElem.innerHTML = "&times;";
    
    buttonElem.className = "close";
    buttonElem.setAttribute("type", "button");
    buttonElem.setAttribute("data-dismiss", "alert");
    
    divElem.innerText = "Please ensure all fields have been correctly entered";
    divElem.className = "alert alert-danger alert-dismissible show fade jtr-alert";
    divElem.setAttribute("role", "alert");

    buttonElem.appendChild(spanElem);
    divElem.appendChild(buttonElem);

    divElem.id = "jtrContactAlert";

    /* Is it already here? */
    let already = document.getElementById("jtrContactAlert");
    if(null === already)
        document.body.appendChild(divElem);
}

export {
    init
};
