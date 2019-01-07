
var GREY = "#444444";
var WHITE = "#FFFFFF";
var BLACK = "#000000";
//uses session storage to check if user has set light or dark mode
/**
 * Sets the default styling, and loads in dark mode if the user was using dark mode
 * in their previous session. Light mode is default.
 */

$('signed-in-icon').hide()
$('#lightMode').hide();
if (localStorage.getItem('mode') === "dark") {
  darkMode()
}

//uses session storage to check if user is signed in
if (sessionStorage.getItem("userName") && sessionStorage.getItem("userID") >= 0) {
  console.log("If")
  signedIn();
} else {
  console.log("Else")
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);
  signedOut();
}

 // Calls darkMode() to switch styling to dark theme, and saves that as the user's prefered
 //view mode in their local storage.

$("#darkMode").on("click", function (event) {
  localStorage.setItem("mode", "dark")
  darkMode()
});

/**
 * Calls lightMode() to switch styling to light theme, and saves that as the user's preferred
 * view mode in their local storage.
 */
$("#lightMode").on("click", function (event) {
  localStorage.setItem("mode", "light")
  lightMode(event)
});

function lightMode() {
  $("#lightMode").fadeOut(50);
  setTimeout(function () {
    $("#darkMode").fadeIn("50");
  }, 50);

  $('#body').css('background-image', 'url("/../assets/hypnotize.png")')

  // Change background to Light Color
  if ($(".main-container").hasClass("bg-dark-slow")) {
    $(".main-container").removeClass("bg-dark-slow");
  }
  $(".main-container").addClass("bg-light-slow");

  if ($("#nav").hasClass("navbar-light bg-grey-slow")) {
    $("#nav").removeClass("navbar-light bg-grey-slow");
  }
  $("#nav").addClass("navbar-dark bg-dark-slow");

  if ($("#searchBtn").hasClass("btn-outline-dark")) {
    $("#searchBtn").removeClass("btn-outline-dark");
  }
  $("#searchBtn").addClass("btn-outline-light");
  $("#content-heading").addClass("text-dark");

  if ($("#user-icon").hasClass("text-dark")) {
    $("#user-icon").removeClass("text-dark")
  }
  $("#user-icon").addClass("text-white");

  if ($("#home-icon").hasClass("text-dark")) {
    $("#home-icon").removeClass("text-dark")
  }
  $("#home-icon").addClass("text-white");
}

$("#loginFormRegister").on("click", function (event) {
  $("#modalLoginForm").modal("toggle");
});

$("#registerFormLogin").on("click", function (event) {
  $("#registerForm").modal("toggle");
});

$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var title = $("#book-search-title").val().trim().split(" ").join("+");

  $.get("/search/" + title).then(function () {
    window.location.href = "/search/" + title;
  });
});

window.onload = function () {

}

// User Login Status
// Sign Out Button empties user information
$("#sign-out").on("click", function (event) {

/**
 * If the user has previously signed in during this session, gets the username and
 * user ID from ession storage. They are validated on the back-end to ensure they
 * match, meaning someone can't just save any username or ID in their session storage
 * to access someone else's account. If the user is NOT signed in, the user ID is less
 * than 0.
 */
if (sessionStorage.getItem("userName") && sessionStorage.getItem("userID") >= 0) {
  signedIn();
} else {
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);

$('#user-icon').on('click', function (event) {
  event.preventDefault()
  if (sessionStorage.getItem('userID') >= 0) {
    window.location.replace('/preferences')
  } else {
    $('#modalLoginForm').modal('show')
  }
});

//changes the nav bar to show the user is signed in
function signedIn() {
  $("#login").hide();
  $("#register").hide();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $('#signed-in-icon').show();
  $("#user-name").show();
  $("#sign-out").show();
}

function profile() {
  window.location ="/profile"
  
}

//changes the nav bar to reflect the user is signed out
function signedOut() {
  $("#login").show();
  $("#register").show();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $('#signed-in-icon').hide();
  $("#user-name").hide();
  $("#sign-out").hide();
}

  signedOut();
}

