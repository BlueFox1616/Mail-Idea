document.addEventListener("DOMContentLoaded", () => {
  // Typing effect code
  let emails = document.querySelectorAll(".flex-container > div"); // Select all div elements inside .flex-container
  let myButton = document.querySelector("button");
  let myHeading = document.querySelector(".space_name");
  let originalText = myHeading.textContent; // Store original text
  let effects = document.querySelector(".effects");
  const persistentSpace = " "; // Add a persistent space

  // Typing effect functions
  function setUserName() {
    const myName = prompt("Please enter your name.");
    if (myName) {
      localStorage.setItem("name", myName);
      startTypingEffect(persistentSpace + `Welcome, ${myName}`);
    }
  }

  function startTypingEffect(firstText) {
    let i = persistentSpace.length,
      offset = persistentSpace.length,
      forwards = true,
      speed = 70;
    let skip_count = 0,
      skip_delay = 15;

    let interval;

    function type() {
      if (forwards) {
        if (offset >= firstText.length) {
          skip_count++;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset > persistentSpace.length) {
        } else {
          forwards = true;
          clearInterval(interval);
          startTypingOriginalText(persistentSpace + originalText);
          return;
        }
      }

      if (forwards) {
        myHeading.textContent = firstText.substring(0, offset);
      } else {
        myHeading.textContent = firstText.substring(0, offset);
      }

      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
    }

    interval = setInterval(type, speed);
  }

  function startTypingOriginalText(text) {
    let i = persistentSpace.length;
    let interval = setInterval(() => {
      myHeading.textContent = text.substring(0, i);
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 70);
  }

  const storedName = localStorage.getItem("name");
  if (storedName) {
    startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
  } else {
    startTypingOriginalText(persistentSpace + originalText);
  }

  myButton.addEventListener("click", setUserName);

  // Google Sign-In integration
  function startGoogleSignIn() {
    gapi.load("auth2", function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      gapi.auth2
        .init({
          client_id:
            "283737755255-fc5ck2k8ign789aheeu51ncggfrsqg6s.apps.googleusercontent.com",
          cookiepolicy: "single_host_origin",
          scope: "profile email",
        })
        .then(
          function (auth2) {
            // Sign-in is properly initialized
            console.log("Google Auth initialized successfully");
          },
          function (error) {
            console.error("Error initializing Google Auth:", error);
          }
        );
    });
  }

  startGoogleSignIn(); // Initialize Google Sign-In

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
  }

  function expandMail(element) {
    element.classList.add("ExpandedMail");
    const fullscreenIcon = element.querySelector(".fullscreenicon");
    if (fullscreenIcon) {
      fullscreenIcon.classList.remove("hide");
    }
  }

  function minimizeMail(element) {
    element.classList.remove("ExpandedMail");
    const fullscreenIcon = element.querySelector(".fullscreenicon");
    if (fullscreenIcon) {
      fullscreenIcon.classList.add("hide");
    }
  }
  // Toggle the visibility of the '.effects' element when the '.plus_icon' is clicked
  document.querySelector(".plus_icon").addEventListener("click", () => {
    const effects = document.querySelector(".effects");
    if (effects.classList.contains("hide")) {
      effects.classList.remove("hide"); // Show the effects if they are hidden
    } else {
      effects.classList.add("hide"); // Hide the effects if they are visible
    }
  });

  // Hide the '.effects' element when clicking anywhere on the page, except for the '.plus_icon'
  document.querySelector("html").addEventListener("click", function (event) {
    const effects = document.querySelector(".effects");

    // If the target doesn't have the 'plus_icon' class, remove 'hide' from effects
    if (
      !event.target.classList.contains("plus_icon") &&
      !event.target.classList.contains("dropdown-style")
    ) {
      effects.classList.add("hide");
    }
  });

  // Add event listeners to each div inside the flex-container
  emails.forEach((email) => {
    email.addEventListener("click", function () {
      if (email.classList.contains("ExpandedMail")) {
        minimizeMail(this);
      } else {
        expandMail(this);
      }
    });
  });
});
