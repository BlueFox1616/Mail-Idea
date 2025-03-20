document.addEventListener("DOMContentLoaded", () => {
  // Typing effect code
  let emails = document.querySelectorAll(".flex-container > div"); // Select all div elements inside .flex-container
  let myButton = document.querySelector("button");
  let myHeading = document.querySelector(".space_name");
  let originalText = myHeading.textContent; // Store original text
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
