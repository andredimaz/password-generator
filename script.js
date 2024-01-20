// Selecting HTML elements
let sliderElement = document.querySelector("#slider");
let valueElement = document.querySelector("#rangeNumber");
let buttonElement = document.querySelector("#button");

let sizePassword = document.querySelector("#value");
let password = document.querySelector("#password");

let containerPassword = document.querySelector("#container-password");

// Character set for generating passwords
let charset =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:";

// Object defining character types based on the charset
let charTypes = {
  lowercase: charset.match(/[a-z]/g),
  uppercase: charset.match(/[A-Z]/g),
  numbers: charset.match(/[0-9]/g),
  symbols: charset.match(/[^a-zA-Z0-9]/g),
};

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

  for (let i = 0, n = charset.length; i < sizePassword.innerHTML; ++i) {
    pass += charset.charAt(Math.floor(Math.random() * n));
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
