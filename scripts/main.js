const CLIENT_ID = "283737755255-fc5ck2k8ign789aheeu51ncggfrsqg6s.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/profile";  // Corrected scope

document.addEventListener("DOMContentLoaded", () => {
    let signInButton = document.querySelector("#signInButton");
    let changeUserButton = document.querySelector("#changeUser");
    let spaceName = document.querySelector(".space_name");
    let emails = document.querySelectorAll(".flex-container > div");
    let effects = document.querySelector(".effects");
    const persistentSpace = " ";
    
    let tokenClient;

    // Load Google API script dynamically
    function loadGoogleAPI(callback) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = callback;
        document.head.appendChild(script);
    }

    // Initialize Google authentication client
    function initGoogleAuth() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: (response) => {
                if (response.access_token) {
                    console.log("✅ Access Token:", response.access_token);
                    fetchEmails(response.access_token);
                } else {
                    console.error("❌ Authentication failed");
                }
            },
        });
    }

    // Fetch emails using Gmail API
    function fetchEmails(accessToken) {
        fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(data => console.log("📩 Emails:", data))
        .catch(error => console.error("⚠️ Error fetching emails:", error));
    }

    // Check authentication and initialize Google login prompt
    function checkAuth() {
        console.log("🔄 Checking authentication...");

        if (typeof google === "undefined") {
            console.error("⚠️ Google API not loaded yet.");
            return;
        }

        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse
        });

        google.accounts.id.prompt((notification) => {
            if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                console.log("❌ User is NOT signed in.");
            } else {
                console.log("🟢 Sign-in prompt displayed.");
            }
        });
    }

    // Handle the credential response after sign-in
    function handleCredentialResponse(response) {
        if (response.credential) {
            console.log("✅ User successfully signed in!");
            console.log("🔑 Token:", response.credential);
            fetchUserInfo(response.credential);  // Fetch user info after login
        } else {
            console.log("❌ Sign-in failed.");
        }
    }

    // Fetch user profile info
    function fetchUserInfo(accessToken) {
        fetch("https://people.googleapis.com/v1/people/me?personFields=names", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(data => {
            console.log("👤 Full User Info:", data);  // Log the full response
            if (data.error) {
                console.error("❌ Error fetching user info:", data.error);
                return;
            }
            if (data.names && data.names.length > 0) {
                const userName = data.names[0].displayName;
                console.log("👤 User Name:", userName);
                startTypingEffect(persistentSpace + `Welcome, ${userName}`);
            } else {
                console.error("❌ No names found in the response.");
            }
        })
        .catch(error => console.error("⚠️ Error fetching user info:", error));
    }

    // Typing effect for user name
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
                    startTypingOriginalText(persistentSpace + "News");
                    return;
                }
            }

            spaceName.textContent = firstText.substring(0, offset);

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

    // Start typing original text
    function startTypingOriginalText(text) {
        let i = persistentSpace.length;
        let interval = setInterval(() => {
            spaceName.textContent = text.substring(0, i);
            i++;
            if (i > text.length) {
                clearInterval(interval);
            }
        }, 70);
    }

    // Change username by prompt
    function changeUserName() {
        const myName = prompt("Please enter your name.");
        if (myName) {
            localStorage.setItem("name", myName);
            startTypingEffect(persistentSpace + `Welcome, ${myName}`);
        }
    }

    // Expand email functionality
    function expandMail(element) {
        element.classList.add("ExpandedMail");
        const fullscreenIcon = element.querySelector(".fullscreenicon");
        if (fullscreenIcon) fullscreenIcon.classList.remove("hide");
    }

    // Minimize email functionality
    function minimizeMail(element) {
        element.classList.remove("ExpandedMail");
        const fullscreenIcon = element.querySelector(".fullscreenicon");
        if (fullscreenIcon) fullscreenIcon.classList.add("hide");
    }

    // Show/hide effects
    document.querySelector(".plus_icon").addEventListener("click", () => {
        effects.classList.toggle("hide");
    });

    document.querySelector("html").addEventListener("click", (event) => {
        if (!event.target.classList.contains("plus_icon") &&
            !event.target.classList.contains("dropdown-style")) {
            effects.classList.add("hide");
        }
    });

    // Toggle mail expand/collapse
    emails.forEach((email) => {
        email.addEventListener("click", function () {
            if (email.classList.contains("ExpandedMail")) {
                minimizeMail(this);
            } else {
                expandMail(this);
            }
        });
    });

    // Sign in button click handler
    signInButton.addEventListener("click", () => {
        if (!tokenClient) initGoogleAuth();
        tokenClient.requestAccessToken();
    });

    // Change user name
    changeUserButton.addEventListener("click", changeUserName);

    // Handle stored user name on page load
    const storedName = localStorage.getItem("name");
    if (storedName) {
        startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
    } else {
        startTypingOriginalText(persistentSpace + "News");
    }

    // ✅ Load Google API first, then check authentication
    loadGoogleAPI(() => {
        console.log("✅ Google API Loaded.");
    });
});
