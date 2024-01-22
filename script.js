// Selecting HTML elements
let sliderElement = document.querySelector("#slider");
let valueElement = document.querySelector("#rangeNumber");
let buttonElement = document.querySelector("#button");

let sizePassword = document.querySelector("#value");
let password = document.querySelector("#password");

let containerPassword = document.querySelector("#container-password");

let symbolsCheckbox = document.querySelector("#terms-checkbox-symbols");
let lowercaseCheckbox = document.querySelector("#terms-checkbox-lowercase");
let uppercaseCheckbox = document.querySelector("#terms-checkbox-uppercase");
let numbersCheckbox = document.querySelector("#terms-checkbox-numbers");

// Character set for generating passwords
let charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:";

// Object defining character types based on the charset
let char_symbols = charset.match(/[^a-zA-Z0-9]/g);
let char_lowercase = charset.match(/[a-z]/g);
let char_uppercase = charset.match(/[A-Z]/g);
let char_numbers = charset.match(/[0-9]/g);

// Variable to store the generated password
let newPassword = "";

// Initial setup for displaying password length
sizePassword.innerHTML = sliderElement.value;

// Event listener for updating displayed password length
valueElement.oninput = function () {
  sizePassword.innerHTML = valueElement.value;
};

// Event listener for slider input to sync with displayed password length
sliderElement.oninput = function () {
  sizePassword.innerHTML = this.value;
  valueElement.value = sizePassword.innerHTML;
};

// Function to generate a random password
function generatePassword() {
  let pass = "";
  if (
    !symbolsCheckbox.checked &&
    !lowercaseCheckbox.checked &&
    !uppercaseCheckbox.checked &&
    !numbersCheckbox.checked
  ) {
    Swal.fire({
      title: "Error",
      html: "Unable to generate a password. <br> Please select at least one character type.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    for (let i = 0, n = sizePassword.innerHTML; i < n; ++i) {
      let selectedCharset = "";

      if (symbolsCheckbox.checked) {
        selectedCharset += char_symbols.join("");
      }
      if (lowercaseCheckbox.checked) {
        selectedCharset += char_lowercase.join("");
      }
      if (uppercaseCheckbox.checked) {
        selectedCharset += char_uppercase.join("");
      }
      if (numbersCheckbox.checked) {
        selectedCharset += char_numbers.join("");
      }

      if (selectedCharset.length > 0) {
        pass += selectedCharset.charAt(
          Math.floor(Math.random() * selectedCharset.length)
        );
      }
    }
  }

  console.log(pass);

  // Display the generated password
  containerPassword.classList.remove("hide");
  password.innerHTML = pass;
  newPassword = pass;
}

// Function to copy the generated password to the clipboard
function copyPassword() {
  // Create a temporary textarea element
  var textarea = document.createElement("textarea");

  // Set the value to be copied
  textarea.value = newPassword;

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();

  try {
    // Copy the selected text to the clipboard
    document.execCommand("copy");
    console.log("Text successfully copied to clipboard");

    // Use Swal for custom alert
    Swal.fire({
      title: "Password Copied!",
      text: "The password has been copied to the clipboard.",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (err) {
    console.error("Unable to copy password:", err);

    // Use Swal for custom alert
    Swal.fire({
      title: "Error",
      text: "Unable to copy password. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
    });
  } finally {
    // Remove the temporary textarea
    document.body.removeChild(textarea);
  }
}

// Function to redirect to a specific link
function redirectToLink() {
  var targetUrl = "https://github.com/andredimaz";

  window.open(targetUrl);
}
