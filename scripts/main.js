// typingAnimation.js
document.addEventListener("DOMContentLoaded", () => {
  let emails = document.querySelectorAll(".flex-container > div");
  let myHeading = document.querySelector(".space_name");
  let originalText = myHeading.textContent; // Store original text
  const persistentSpace = " "; // Persistent space for typing effect

  // Typing effect functions
  function startTypingEffect(firstText) {
    let i = persistentSpace.length;
    let offset = persistentSpace.length;
    let forwards = true;
    let speed = 70;
    let skip_count = 0;
    let skip_delay = 15;
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

  // Get the user's name from localStorage and start the typing effect
  const storedName = localStorage.getItem("userName");
  if (storedName) {
    startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
  } else {
    startTypingOriginalText(persistentSpace + originalText);
  }

  // Email interaction functions: Expand or minimize email
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

  // Toggle visibility of effects
  document.querySelector(".plus_icon").addEventListener("click", () => {
    const effects = document.querySelector(".effects");
    if (effects.classList.contains("hide")) {
      effects.classList.remove("hide");
    } else {
      effects.classList.add("hide");
    }
  });

  // Hide effects when clicking anywhere on the page except '.plus_icon'
  document.querySelector("html").addEventListener("click", function (event) {
    const effects = document.querySelector(".effects");

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

