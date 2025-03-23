// Ensure that the Google API is loaded before using it
gapi.load('auth2', function() {
  gapi.auth2.init({
    client_id: '609769740177-14dcsedrjlasnnni0m2lbu73bqt2bct8.apps.googleusercontent.com'
  }).then(function() {
    console.log('Google API loaded and initialized');
  });
});

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile(); // Fixed missing `=`

  $("#name").text(profile.getName());
  $("#email").text(profile.getEmail());
  $("#image").attr("src", profile.getImageUrl());

  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance(); // Fixed missing `=`

  auth2.signOut().then(function () {
    alert("You have been signed out successfully");
    $(".g-signin2").css("display", "block");
    $(".data").css("display", "none");
  });
}
