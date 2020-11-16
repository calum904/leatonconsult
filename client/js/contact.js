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

    for(let idx in JTR_CONTACT_FIELDS) {
        valid = (0 !== JTR_CONTACT_FIELDS[idx].data.length) ? true : false;

        if(false === valid)
            break;
    }
    
    if(true === valid) {
        constructTemplateEmail();
    } else {
        createAlert();
    }
}

/**
 * @brief Constructs an email from the given contact fields
 */
function constructTemplateEmail() {
    let aElem = document.createElement("a"),
        emailMsg = "",
        emailUrl = new URL("mailto:josh.taylor@leatonconsult.co.uk");

    emailMsg += "Name: "     + JTR_CONTACT_FIELDS["inputFullName"].data + "\n";
    emailMsg += "Contact: "  + JTR_CONTACT_FIELDS["inputEmail"].data    + " " + JTR_CONTACT_FIELDS["inputPhone"].data + "\n";
    emailMsg += "Message:\n" + JTR_CONTACT_FIELDS["inputMessage"].data  + "\n";

    emailUrl.searchParams.append("subject", "Enquiry into " + JTR_CONTACT_FIELDS["inputService"].data);
    emailUrl.searchParams.append("body", emailMsg);

    aElem.href = emailUrl.href;
    aElem.click();
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
