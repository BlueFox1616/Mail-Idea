function onGapiLoaded() {
  // Load the API client and initialize it
  gapi.load("client:auth2", initClient);
}

function initClient() {
  gapi.client
    .init({
      apiKey: "AIzaSyCTPsrf_vVKjFBpuvP389eJkJym2QQjqck",
      clientId:
        "609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com",
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest",
      ],
      scope: "https://www.googleapis.com/auth/gmail.readonly",
    })
    .then(() => {
      // Sign in the user if not already signed in
      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log("User signed in successfully.");
          listMessages(); // Call the function to list messages
        })
        .catch((error) => {
          console.error("Error during sign-in", error);
        });
    })
    .catch((error) => {
      console.error("Error during client initialization", error);
    });
}

function listMessages() {
  gapi.client.gmail.users.messages
    .list({
      userId: "me",
      maxResults: 10,
    })
    .then((response) => {
      const messages = response.result.messages;
      if (messages) {
        messages.forEach((msg) => console.log("Message ID:", msg.id));
      } else {
        console.log("No messages found.");
      }
    })
    .catch((error) => console.error("Error fetching messages:", error));
}
