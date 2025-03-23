const CLIENT_ID = "283737755255-fc5ck2k8ign789aheeu51ncggfrsqg6s.apps.googleusercontent.com";  
const SCOPES = "https://www.googleapis.com/auth/gmail.readonly";

// Global variable to hold the token client
let tokenClient;

// Function to load the Google API
function loadGoogleAPI(callback) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.onload = callback;
    document.head.appendChild(script);
}

// Initialize Google authentication
function initGoogleAuth() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
            if (response.access_token) {
                console.log("✅ Access Token:", response.access_token);
                fetchUserInfo(response.access_token);
            } else {
                console.error("❌ Authentication failed");
            }
        },
    });
}

// Function to fetch user information after successful authentication
function fetchUserInfo(accessToken) {
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("User Info:", data);
            document.getElementById("userName").textContent = "Name: " + data.name;
            document.getElementById("userEmail").textContent = "Email: " + data.email;
        })
        .catch((error) => {
            console.error("⚠️ Error fetching user info:", error);
        });
}

// Event listener for the Sign-In button
document.getElementById("signInButton").addEventListener("click", () => {
    if (!tokenClient) initGoogleAuth();
    tokenClient.requestAccessToken();
});

// Function to initialize authentication and handle sign-in
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

// Handle the sign-in response from Google
function handleCredentialResponse(response) {
    if (response.credential) {
        console.log("✅ User successfully signed in!");
        console.log("🔑 Token:", response.credential);
        fetchUserInfo(response.credential);
    } else {
        console.log("❌ Sign-in failed.");
    }
}

// Function to start typing effect for the user's name
function startTypingEffect(firstText) {
    let i = 0, offset = 0, forwards = true, speed = 70;
    let skip_count = 0, skip_delay = 15;
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
            if (offset > 0) {
                offset--;
            } else {
                forwards = true;
                clearInterval(interval);
            }
        }

        document.querySelector(".space_name").textContent = firstText.substring(0, offset);

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

// Event listener for the Change User button
document.getElementById("changeUser").addEventListener("click", changeUserName);

function changeUserName() {
    const myName = prompt("Please enter your name.");
    if (myName) {
        localStorage.setItem("name", myName);
        startTypingEffect(`Welcome, ${myName}`);
    }
}

// Expand and minimize mail functionality
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

// Handle effects toggling
document.querySelector(".plus_icon").addEventListener("click", () => {
    document.querySelector(".effects").classList.toggle("hide");
});

// Close effects dropdown when clicking outside
document.querySelector("html").addEventListener("click", (event) => {
    if (!event.target.classList.contains("plus_icon") && 
        !event.target.classList.contains("dropdown-style")) {
        document.querySelector(".effects").classList.add("hide");
    }
});

// Initialize and check user authentication on load
document.addEventListener("DOMContentLoaded", () => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
        startTypingEffect(`Welcome, ${storedName}`);
    } else {
        startTypingEffect("News");
    }

    // ✅ Load Google API first, then check authentication
    loadGoogleAPI(() => {
        console.log("✅ Google API Loaded.");
        checkAuth();
    });
});


});
