// Function to initialize the Google Identity Services client
function onGapiLoaded() {
  google.accounts.id.initialize({
    client_id:
      "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: true,
  });

  // Render the Google Sign-In button
  google.accounts.id.renderButton(document.querySelector(".g-signin2"), {
    theme: "outline",
    size: "large",
  });
}

// Callback function to handle the sign-in response
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential); // Decode the JWT token to get user info
  console.log(data); // Log the user data to the console

  localStorage.setItem("userName", data.name); // Store the user's name in localStorage
  localStorage.setItem("googleToken", response.credential); // Store the ID token in localStorage

  // Display user data on the page
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
  $(".search_result").css("display", "none");

  // Start the typing effect with the user's name or other text
  startTypingEffect(firstText);
}

// Trigger Google Sign-In manually
function triggerGoogleSignIn() {
  document.querySelector(".g-signin2").click(); // Simulate the click on the Google Sign-In button
}

// Sign out the user
document.querySelector(".search_result").addEventListener("click", function () {
  triggerGoogleSignIn(); // Call the function when the element is clicked
});

// Make sure to load the script and initialize the sign-in flow after the DOM is ready
window.onload = function () {
  onGapiLoaded(); // Initialize the Google Sign-In after the window is loaded
};
