const CLIENT_ID = "283737755255-fc5ck2k8ign789aheeu51ncggfrsqg6s.apps.googleusercontent.com";  
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

document.addEventListener("DOMContentLoaded", () => {
    let signInButton = document.querySelector("#signInButton");
    let changeUserButton = document.querySelector("#changeUser");
    let spaceName = document.querySelector(".space_name");
    let emails = document.querySelectorAll(".flex-container > div");
    let effects = document.querySelector(".effects");
    const persistentSpace = " ";
    
    let tokenClient;

    function loadGoogleAPI(callback) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = callback;
        document.head.appendChild(script);
    }

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

    function fetchEmails(accessToken) {
        fetch("https://www.googleapis.com/gmail/v1/users/me/messages", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then(response => response.json())
        .then(data => console.log("📩 Emails:", data))
        .catch(error => console.error("⚠️ Error fetching emails:", error));
    }

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

    function handleCredentialResponse(response) {
        if (response.credential) {
            console.log("✅ User successfully signed in!");
            console.log("🔑 Token:", response.credential);
            fetchUserInfo(response.credential);
        } else {
            console.log("❌ Sign-in failed.");
        }
    }

    function fetchUserInfo(accessToken) {
        fetch("https://people.googleapis.com/v1/people/me?personFields=names", {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log("👤 User Name:", data.name);
            })
            .catch(error => console.error("⚠️ Error fetching user info:", error));
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
        
    function changeUserName() {
        const myName = prompt("Please enter your name.");
        if (myName) {
            localStorage.setItem("name", myName);
            startTypingEffect(persistentSpace + `Welcome, ${myName}`);
        }
    }

    function expandMail(element) {
        element.classList.add("ExpandedMail");
        const fullscreenIcon = element.querySelector(".fullscreenicon");
        if (fullscreenIcon) fullscreenIcon.classList.remove("hide");
    }

    function minimizeMail(element) {
        element.classList.remove("ExpandedMail");
        const fullscreenIcon = element.querySelector(".fullscreenicon");
        if (fullscreenIcon) fullscreenIcon.classList.add("hide");
    }

    document.querySelector(".plus_icon").addEventListener("click", () => {
        effects.classList.toggle("hide");
    });

    document.querySelector("html").addEventListener("click", (event) => {
        if (!event.target.classList.contains("plus_icon") &&
            !event.target.classList.contains("dropdown-style")) {
            effects.classList.add("hide");
        }
    });

    emails.forEach((email) => {
        email.addEventListener("click", function () {
            if (email.classList.contains("ExpandedMail")) {
                minimizeMail(this);
            } else {
                expandMail(this);
            }
        });
    });

    signInButton.addEventListener("click", () => {
        if (!tokenClient) initGoogleAuth();
        tokenClient.requestAccessToken();
    });

    changeUserButton.addEventListener("click", changeUserName);

    const storedName = localStorage.getItem("name");
    if (storedName) {
        startTypingEffect(persistentSpace + `Welcome, ${storedName}`);
    } else {
        startTypingOriginalText(persistentSpace + "News");
    }

    // ✅ Load Google API first, then check authentication
    loadGoogleAPI(() => {
        console.log("✅ Google API Loaded.");
        checkAuth();
    });
});
