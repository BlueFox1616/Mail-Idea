function onGapiLoaded() {
  google.accounts.id.initialize({
    client_id:
      "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: true,
  });

  google.accounts.id.renderButton(
    document.querySelector(".g-signin2"),
    { theme: "outline", size: "large" }, // Customize button appearance
  ); // Removed the trailing comma here
}

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential); // Decode the JWT token to get user info
  console.log(data); // Log the user data to the console

  localStorage.setItem("userName", data.name);
  localStorage.setItem("googleToken", response.credential); // Store the user name in localStorage

  // Display user data on the page
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
  $(".search_result").css("display", "none");
  startTypingEffect(firstText);
}

function triggerGoogleSignIn() {
  document.querySelector(".g-signin2").click(); // Simulate the click on the Google Sign-In button
}

// Sign out the user
document.querySelector(".search_result").addEventListener("click", function () {
  triggerGoogleSignIn(); // Call the function when the element is clicked
});
