// New callback function using Google Identity Services
function onSignIn(response) {
  const user = response.credential;
  const profile = jwt_decode(user);

  // Display profile data
  $("#name").text(profile.name);
  $("#email").text(profile.email);
  $("#image").attr("src", profile.picture);

  $(".data").css("display", "block");
  $(".g-signin2").css("display", "none");
}

// Decode the JWT response to get profile information
function jwt_decode(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

function signOut() {
  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke('YOUR_CLIENT_ID', function() {
    alert("You have been signed out successfully");
    $(".g-signin2").css("display", "block");
    $(".data").css("display", "none");
  });
}
