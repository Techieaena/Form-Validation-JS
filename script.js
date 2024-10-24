// Clear all previous error messages
function clearErrors() {
    let errors = document.getElementsByClassName('formerror');
    for (let item of errors) {
        item.innerHTML = "";  // Use 'innerHTML' instead of 'HTML'
    }
}

// Set an error message for a specific element
function setError(id, error) {
    let element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function validateForm() {
    // Clear previous errors before starting validation
    clearErrors();
    let returnval = true;

    // Validate Name
    let name = document.forms['myForm']["fname"].value;
    if (name.length < 5) {
        setError("name", "Name must be at least 5 characters long");
        returnval = false;
    } else if (name.length === 0) {
        setError("name", "Name cannot be empty");
        returnval = false;
    }

    // Validate Email
    let email = document.forms['myForm']["femail"].value;
    if (email.length < 5) {
        setError("email", "Email must be at least 5 characters long");
        returnval = false;
    }

    // Validate Phone Number
    let phone = document.forms['myForm']["fphone"].value;
    if (phone.length !== 10 || isNaN(phone)) {
        setError("phone", "Phone number must be 10 digits long");
        returnval = false;
    }

    // Validate Password
    let password = document.forms['myForm']["fpassword"].value.trim(); // Trim whitespace
    let passwordRegex = /^.{8}$/;

    if (!password.test(password)) {
        setError("password", "Password must be at least 8 characters, include one uppercase, one lowercase, one digit, and one special character.");
        returnval = false;
    } else {
        setError("password", ""); // Clear error if valid
    }



    // Validate Confirm Password
    let cpassword = document.forms['myForm']["fcpassword"].value;
    if (cpassword !== password) {
        setError("cpassword", "Passwords do not match");
        returnval = false;
    }

    // Return final result (if returnval is false, form won't be submitted)
    return returnval;
}
