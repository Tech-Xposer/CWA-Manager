const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Add this JavaScript code to your existing script or create a new JavaScript file
$(document).ready(function() {
    // Select the password input field and the eye icon
    const passwordInput = $("#id_password");
    const passwordToggle = $("#password-toggle");

    // Handle the click event on the eye icon
    passwordToggle.click(function() {
        const type = passwordInput.attr("type") === "password" ? "text" : "password";
        passwordInput.attr("type", type);
    });
});
