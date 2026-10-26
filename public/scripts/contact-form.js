document.getElementById("contact-form").onsubmit = () => {

  clearErrors();

  let isValid = true;

  let firstName = document.getElementById("first-name").value.trim();
  if (firstName == "") {
    isValid = false;
    document.getElementById("first-name-empty-error").style.display = "block";
  }

  let lastName = document.getElementById("last-name").value.trim();
  if (lastName == "") {
    isValid = false;
    document.getElementById("last-name-empty-error").style.display = "block";
  }

  let linkedinRegex = /^https:\/\/(www\.|)linkedin\.com\/in\/.*/;
  let linkedin = document.getElementById("linkedin").value.trim();
  if (linkedin != "" && !linkedinRegex.test(linkedin)) {
    isValid = false;
    document.getElementById("linkedin-format-error").style.display = "block";
  }

  let emailRegex = /.+@.+\..+/;
  let mailingList = document.getElementById("mailing-list").checked;
  let email = document.getElementById("email").value.trim();
  if (email != "" && !emailRegex.test(email)) {
    isValid = false;
    document.getElementById("email-format-error").style.display = "block";
  } else if (email == "" && mailingList) {
    isValid = false;
    document.getElementById("email-empty-error").style.display = "block";
  }

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("error");

  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}
