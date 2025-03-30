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
  );
}

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential); // Decode the JWT token to get user info
  console.log(data); // Log the user data to the console

  localStorage.setItem("userName", data.name);
  localStorage.setItem("googleToken", response.credential); // Store the user name in localStorage

  // Display user data on the page

  // Show the user data and hide the sign-in button
  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
  $(".search_result").css("display", "none");
  startTypingEffect(firstText);
}
function triggerGoogleSignIn() {
  document.querySelector(".g-signin2").click(); // Simulate the click on the Google Sign-In button
}
window.onload = function () {
  const storedToken = localStorage.getItem("googleToken");

  if (storedToken) {
    console.log("✅ User is still logged in!");
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
    $(".search_result").css("display", "none");
  } else {
    console.log("❌ No session found, show login button");
    $(".g-signin2").css("display", "block");
    $(".data").css("display", "none");
  }
};
// Sign out the user
function signOut() {
  google.accounts.id.disableAutoSelect(); // Disable auto-select sign-in
  $(".g-signin2").css("display", "block"); // Show the sign-in button again
  $(".data").css("display", "none"); // Hide the user data
}

document.querySelector(".search_result").addEventListener("click", function () {
  triggerGoogleSignIn(); // Call the function when the element is clicked
});
