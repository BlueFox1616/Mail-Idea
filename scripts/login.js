window.onload = function() {
  localStorage.removeItem("userName");  // Clear userName from localStorage on reload
};

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

// Handle the credential response received from Google Sign-In
function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);  // Decode the JWT token to get user info
  console.log(data);  // Log the user data to the console
  
  // Store user name temporarily (to be used in the animation)
  localStorage.setItem("userName", data.name);

  // Trigger the animation after login
  startTypingEffect(`Welcome, ${data.name}`);

  // Show the user data and hide the sign-in button
  $("#name").text(data.name);
  $("#email").text(data.email);
  $("#image").attr("src", data.picture);
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
}

// Sign out the user (Do NOT remove from localStorage on sign out)
function signOut() {
  google.accounts.id.disableAutoSelect();  // Disable auto-select sign-in
  $(".g-signin2").css("display", "block");  // Show the sign-in button again
  $(".data").css("display", "none");  // Hide the user data
}


