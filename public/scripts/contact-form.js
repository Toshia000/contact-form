document.getElementById("contact-form").onsubmit = () => {

  clearErrors();

  let isValid = true;

  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("error");

  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}
