document.addEventListener("DOMContentLoaded", () => {
  // Typing effect code
  let emails = document.querySelectorAll(".flex-container > div"); // Select all div elements inside .flex-container
  let myButton = document.querySelector("button");
  let myHeading = document.querySelector(".space_name");
  let originalText = myHeading.textContent; // Store original text
  let effects = document.querySelector(".effects");
  const persistentSpace = " "; // Add a persistent space

  // Typing effect functions
  const storedName = localStorage.getItem("userName");

  // If userName is found in localStorage, use it for the typing animation
  if (storedName) {
    startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
  } else {
    // If no userName is found, fallback to the original text
    startTypingOriginalText(persistentSpace + originalText);
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

  // Add event listener for setting user name
  myButton.addEventListener("click", setUserName);

  // Expand and minimize email functions
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
      effects.classList.remove("hide");
      document.querySelector(".search_box").focus(); // Show the effects if they are hidden
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
