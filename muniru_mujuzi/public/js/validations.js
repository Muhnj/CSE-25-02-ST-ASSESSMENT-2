document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("reset", () => {
    const inputs = form.querySelectorAll(".form-control, .form-select");
    const errorSpans = form.querySelectorAll("span.text-danger");

    inputs.forEach((input) => {
      input.classList.remove("border-success", "border-danger");
    });

    errorSpans.forEach((span) => {
      span.textContent = "";
      span.classList.remove("text-success", "text-danger");
    });
  });

  form.addEventListener("submit", (e) => {
    if (!validateStudentForm()) {
      e.preventDefault();
    }
  });
});

function validateStudentForm() {
  let isValid = true;

  function validateField(id, validatorFn, errorMsg) {
    const field = document.getElementById(id);
    const errorSpan = document.getElementById(`${id}-error`);
    const value = field.value.trim();

    errorSpan.textContent = "";
    field.classList.remove("border-success", "border-danger");

    if (!validatorFn(value)) {
      errorSpan.textContent = errorMsg;
      errorSpan.classList.add("text-danger");
      field.classList.add("border-danger");
      isValid = false;
    } else {
      field.classList.add("border-success");
    }
  }

  validateField("surname", val => val.length >= 2, "Surname must be at least 2 characters.");
  validateField("givenname", val => val.length >= 2, "Given name must be at least 2 characters.");
  validateField("dob", val => val !== "", "Date of birth is required.");
  validateField("country", val => val !== "--------- Select Country ---------", "Please select a country.");
  validateField("residence", val => val.length > 2, "Place of residence is required.");
  validateField("phone", val => /^(\+256|07)\d{8}$/.test(val), "Enter a valid phone number.");
  validateField("email", val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Enter a valid email address.");
  validateField("skills", val => val.length > 0, "Please list at least one skill.");
  validateField("projects", val => val.length > 0, "Please list at least one project.");

  // Gender (radio)
  const genderRadios = document.querySelectorAll('input[name="gender"]');
  const genderError = document.getElementById("gender-error");
  let genderSelected = false;
  genderError.textContent = "";

  genderRadios.forEach((radio) => {
    if (radio.checked) genderSelected = true;
  });

  if (!genderSelected) {
    genderError.textContent = "Please select a gender.";
    genderError.classList.add("text-danger");
    isValid = false;
  }

  return isValid;
}

  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Uganda","Rwanda", "Burundi", "Zimbabwe"];
  const select = document.getElementById("country");

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    select.appendChild(option);
  });

