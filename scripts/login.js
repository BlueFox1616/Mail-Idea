// googleAuth.js
document.addEventListener("DOMContentLoaded", () => {
  let googleAuthInitialized = false;

  function startGoogleSignIn() {
    if (!googleAuthInitialized) {
      gapi.load("auth2", function () {
        gapi.auth2
          .init({
            client_id:
              "283737755255-fc5ck2k8ign789aheeu51ncggfrsqg6s.apps.googleusercontent.com",
            cookiepolicy: "single_host_origin",
            scope: "profile email",
          })
          .then(
            function (auth2) {
              googleAuthInitialized = true;
              console.log("Google Auth initialized successfully");
            },
            function (error) {
              console.error("Error initializing Google Auth:", error);
            }
          );
      });
    } else {
      console.log("Google Auth already initialized");
    }
  }

  startGoogleSignIn();

  // Handle Google Sign-In response
  function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential); // Decode JWT token to get user info
    console.log(data); // Log user data

    // Store the user's name in localStorage for later use in typing animation
    localStorage.setItem("userName", data.name);

    // Display user data on the page
    $("#name").text(data.name);
    $("#email").text(data.email);
    $("#image").attr("src", data.picture);

    // Hide the sign-in button and show user data
    $(".data").css("display", "block");
    $(".g-signin2").css("display", "none");
  }

  // Initialize Google Sign-In button
  google.accounts.id.initialize({
    client_id: "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
    callback: handleCredentialResponse,



  });
});

