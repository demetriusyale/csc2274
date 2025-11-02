    
    // Header and footer
    async function loadHTML(id, file) {
      const el = document.getElementById(id);
      const resp = await fetch(file);
      el.innerHTML = await resp.text();
    }
    loadHTML("commonHeader", "header.html");
    loadHTML("commonFooter", "footer.html");

    // ===== Validation =====
const form = document.getElementById('contact-form');
const emaildata = document.getElementById('email');
const pass = document.getElementById('password');
const username = document.getElementById('username');
const emailErr = document.getElementById('email-error');
const phoneErr = document.getElementById('phone-error');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const passRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const passErr = document.getElementById('pass-error');
const usernameErr = document.getElementById('username-error');

function validateEmail() {
  const value = emaildata.value.trim();
  const isValid = emailRegex.test(value);
  emaildata.setCustomValidity(isValid ? '' : 'Please enter a valid email xxx(e.g., name@example.com).');
  emailErr.textContent = emaildata.validationMessage;
  displayError(emaildata.validationMessage);
  return isValid;
}

function validatePassword() {
  const value = pass.value.trim();
  const isValid = passRegex.test(value);
  pass.setCustomValidity(isValid ? '' : 'Please enter a valid password. 8 Characters and one number and one symbol');
  passErr.textContent = pass.validationMessage;
  displayError(pass.validationMessage);
  return isValid;
}

function validateUser() {
  const value = username.value.trim();

  username.setCustomValidity(value.length >= 4 ? '' : 'Please enter a valid username (at least 4 characters)');
  usernameErr.textContent = username.validationMessage;
  displayError(username.validationMessage);
  return isValid;
}
function displayError(errorMessage){
  const textBox = document.getElementById('overlayDiv');
  textBox.textContent = errorMessage;
  if(errorMessage===""){

textBox.style.display = "none"; 

  }else{
  textBox.style.display = "flex"; 
  }


}

function validatePhone() {
  const rawDigits = phonedata.value.replace(/\D/g, ''); // remove non-digits
  // Step 1: Must have exactly 10 digits
  if (rawDigits.length !== 10) {
    phonedata.setCustomValidity('Phone must contain exactly 10 digits.');
    phoneErr.textContent = phonedata.validationMessage;
    return false;
  }
  // Step 2: Must match one of the allowed formats
  const phonePattern = /^(?:\d{10}|\d{3}[-.\s]\d{3}[-.\s]\d{4}|\(\d{3}\)[-.\s]\d{3}[-.\s]\d{4})$/;
  const isValid = phonePattern.test(phonedata.value);
  phonedata.setCustomValidity(isValid ? '' :
    'Phone format must be ###-###-####, ### ### ####, ###.###.####, or (###) ###-####.');
  phoneErr.textContent = phonedata.validationMessage;
  return isValid;
}

// Live validation
emaildata.addEventListener('blur', validateEmail);
username.addEventListener('blur', validateUser);
pass.addEventListener('blur', validatePassword);
phonedata.addEventListener('input', validatePhone);
// On submit validation
form.addEventListener('submit', (e) => {
  const okEmail = validateEmail();
  const okPhone = validatePhone();
  if (!okEmail || !okPhone) {
    e.preventDefault();
    if (!okEmail) emaildata.reportValidity();
    else phonedata.reportValidity();
  }
});


