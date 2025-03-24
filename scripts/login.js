function onSignIn(googleUser) {
  updateWelcomeMessage();
}

function onSignOut() {
  google.accounts.id.disableAutoSelect();  // Disable auto-select sign-in
  $(".g-signin2").css("display", "block");  // Show the sign-in button again
  $(".data").css("display", "none");  // Hide the user data
  updateWelcomeMessage();  // Update UI to reflect logout
}

function onGapiLoaded() {
  google.accounts.id.initialize({
    client_id: "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });

  google.accounts.id.renderButton(
    document.querySelector(".g-signin2"),
    { theme: "outline", size: "large" }  // Customize button appearance
  );
}

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);  // Decode the JWT token to get user info
  console.log(data);  // Log the user data to the console

  localStorage.setItem("userName", data.name);  // Store the user name in localStorage

  // Display user data on the page
  $("#name").text(data.name);
  $("#email").text(data.email);
  $("#image").attr("src", data.picture);

  // Show the user data and hide the sign-in button
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");

  updateWelcomeMessage();
}

// Update welcome message based on login status
function updateWelcomeMessage() {
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
  } else {
    localStorage.removeItem("userName");  // Remove stored name when logged out
    startTypingOriginalText(persistentSpace + originalText);
  }
}
