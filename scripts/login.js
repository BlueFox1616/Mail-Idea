function onGapiLoaded() {
  google.accounts.id.initialize({
    client_id:
      "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: true,
  });

  const signInButton = document.querySelector(".g-signin2");
  if (signInButton) {
    google.accounts.id.renderButton(signInButton, {
      theme: "outline",
      size: "large",
    });
  } else {
    console.error("Sign-In button not found!");
  }
}

function handleCredentialResponse(response) {
  try {
    const data = jwt_decode(response.credential);
    console.log(data); // Log the user data to the console

    // Ensure the localStorage actions happen only when data is valid
    if (data && data.name) {
      localStorage.setItem("userName", data.name);
      localStorage.setItem("googleToken", response.credential); // Store the Google token

      // Display user data on the page
      $(".data").css("display", "block");
      $(".g-signin2").css("display", "none");
      $(".search_result").css("display", "none");
      startTypingEffect(firstText);
    } else {
      console.error("Failed to decode user data:", data);
    }
  } catch (error) {
    console.error("Error decoding the JWT token:", error);
  }
}

function triggerGoogleSignIn() {
  const signInButton = document.querySelector(".g-signin2");
  if (signInButton) {
    signInButton.click();
  } else {
    console.error("Google Sign-In button not found!");
  }
}

// Sign out the user
document.querySelector(".search_result").addEventListener("click", function () {
  triggerGoogleSignIn(); // Call the function when the element is clicked
});
