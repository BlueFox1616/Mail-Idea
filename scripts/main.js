document.addEventListener("DOMContentLoaded", () => {
  // Typing effect code
  let emails = document.querySelectorAll(".flex-container > div");
  let myButton = document.querySelector(".g-signin2");
  let myHeading = document.querySelector(".space_name");
  let originalText = myHeading ? myHeading.textContent : ""; // Ensure heading exists
  let effects = document.querySelector(".effects");
  const persistentSpace = " "; // Add a persistent space

  // Debugging: Check if elements exist
  console.log("myButton:", myButton);
  console.log("myHeading:", myHeading);

  // Typing effect functions
  function setUserName() {
    const myName = localStorage.getItem("userName");
    if (myName) {
      localStorage.setItem("userName", myName);
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
          if (skip_count === skip_delay) {
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

      if (skip_count === 0) {
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

  const storedName = localStorage.getItem("userName");
  if (storedName) {
    startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
  } else {
    startTypingOriginalText(persistentSpace + originalText);
  }

  if (myButton) {
    myButton.addEventListener("click", setUserName);
  }

  // Mail expand/collapse logic
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

  // Toggle the visibility of the '.effects' element
  document.querySelector(".plus_icon").addEventListener("click", () => {
    const effects = document.querySelector(".effects");
    if (effects.classList.contains("hide")) {
      effects.classList.remove("hide");
      document.getElementsByClassName("search_box")[0].focus(); // Show the effects if they are hidden
    } else {
      effects.classList.add("hide"); // Hide the effects if they are visible
    }
  });

  // Hide the '.effects' element when clicking anywhere on the page
  document.querySelector("html").addEventListener("click", function (event) {
    const effects = document.querySelector(".effects");

    if (
      !event.target.classList.contains("plus_icon") &&
      !event.target.closest(".dropdown-style") && // Fix: Use closest()
      !event.target.classList.contains("g-signin2")
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
