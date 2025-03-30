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

    // Check if the user is logged in based on the saved token
    if (localStorage.getItem("googleToken")) {
      signInButton.classList.add("hide"); // Hide the sign-in button if credentials are saved
    } else {
      signInButton.classList.remove("hide"); // Show the sign-in button if no credentials are saved
    }
  } else {
    console.error("Sign-In button not found!");
  }
}

function handleCredentialResponse(response) {
  try {
    // Decode the JWT token to get user info
    const data = jwt_decode(response.credential);
    console.log(data); // Log the user data to the console

    // Save only the token to localStorage
    if (response.credential) {
      localStorage.setItem("googleToken", response.credential); // Store the Google token
    }

    // Display user data on the page
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
    $(".search_result").css("display", "none");
    startTypingEffect(firstText);

    // Hide the sign-in button after login
    document.querySelector(".g-signin2").classList.add("hide");
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

// Sign out the user (optional: reset token in localStorage and show sign-in button)
document.querySelector(".search_result").addEventListener("click", function () {
  localStorage.removeItem("googleToken"); // Remove the Google token
  document.querySelector(".g-signin2").classList.remove("hide"); // Show the sign-in button again after sign-out
  triggerGoogleSignIn(); // Call the function when the element is clicked
});
