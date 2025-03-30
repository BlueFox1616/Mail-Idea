function onGapiLoaded() {
  google.accounts.id.initialize({
    client_id:
      "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse,
    auto_select: true, // Auto-login enabled
  });

  google.accounts.id.renderButton(document.querySelector(".g-signin2"), {
    theme: "outline",
    size: "large",
  });

  // Check if user is still logged in
  const storedToken = localStorage.getItem("googleToken");

  if (storedToken) {
    console.log("✅ User is still logged in!");

    // Hide the sign-in button by adding the 'hide' class

  } else {
    console.log("❌ No session found, show login button");

    // Show the sign-in button by removing the 'hide' class
    document.querySelector('.g-signin2').classList.remove("hide");
  }


function handleCredentialResponse(response) {
  if (!response.credential) {
    console.error("❌ No credential received");
    return;
  }

  const data = jwt_decode(response.credential);
  console.log("✅ User logged in:", data);

  // Store token & user info
  localStorage.setItem("googleToken", response.credential);
  localStorage.setItem("userName", data.name);

  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
  $(".search_result").css("display", "none");

  startTypingEffect(firstText);
}

function triggerGoogleSignIn() {
  document.querySelector(".g-signin2").click();
}

// Sign out function
function signOut() {
  google.accounts.id.disableAutoSelect();
  localStorage.removeItem("googleToken"); // Clear stored session
  $(".g-signin2").css("display", "block");
  $(".data").css("display", "none");
}

// Attach event listener safely
document
  .querySelector(".search_result")
  ?.addEventListener("click", function () {
    triggerGoogleSignIn();
  });
