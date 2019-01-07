var GREY = "#444444";
var WHITE = "#FFFFFF";
var BLACK = "#000000";

// Check If User Is Logged In
console.log("userName: " + sessionStorage.getItem("userName"));
console.log("userID: " + sessionStorage.getItem("userID"));

var mode = localStorage.getItem("mode")
$('#lightMode').hide();
if (mode === "dark") {
  darkMode()
}

if (sessionStorage.getItem("userName") && sessionStorage.getItem("userID") >= 0) {
  console.log("If")
  signedIn();
} else {
  console.log("Else")
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);
  signedOut();
}

$("#darkMode").on("click", function (event) {
  localStorage.setItem("mode", "dark")
  darkMode()

});

function darkMode() {
  $('#darkMode').hide()
  setTimeout(function () {
    $("#lightMode").fadeIn("50");
  }, 50);

  // Change background to Dark Color
  if ($(".main-container").hasClass("bg-light-slow")) {
    $(".main-container").removeClass("bg-light-slow");
  }
  $(".main-container").addClass("bg-dark-slow");

  if ($("#nav").hasClass("navbar-dark")) {
    $("#nav").removeClass("navbar-dark");
  }
  $("#nav").addClass("navbar-light bg-grey-slow");

  if ($("#searchBtn").hasClass("btn-outline-light")) {
    $("#searchBtn").removeClass("btn-outline-light");
  }
  $("#searchBtn").addClass("btn-outline-dark");

  if ($("#content-heading").hasClass("text-dark")) {
    $("#content-heading").removeClass("text-dark");
  }
  
  if ($("#user-icon").hasClass("text-white")) {
    $("#user-icon").removeClass("text-white")
  }
  $("#user-icon").addClass("text-dark");

  if ($("#home-icon").hasClass("text-white")) {
    $("#home-icon").removeClass("text-white")
  }
  $("#home-icon").addClass("text-dark");

  $('#nav')
}

$("#lightMode").on("click", function (event) {
  localStorage.setItem("mode", "light")
  lightMode(event)

});

function lightMode() {
  $("#lightMode").fadeOut(50);
  setTimeout(function () {
    $("#darkMode").fadeIn("50");
  }, 50);

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
// Sign Out Button
$("#sign-out").on("click", function (event) {
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);
});

$('#user-icon').on('click', function (event) {
  event.preventDefault()
  if (sessionStorage.getItem('userID') >= 0) {
    window.location.replace('/preferences')
  } else {
    $('#modalLoginForm').modal('show')
  }
});

function signedIn() {
  console.log("signedIn");
  $("#login").hide();
  $("#register").hide();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $("#user-name").show();
  $("#sign-out").show();
}

function profile() {
  window.location ="/profile"
  
}

function signedOut() {
  console.log("signedOut");
  $("#login").show();
  $("#register").show();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $("#user-name").hide();
  $("#sign-out").hide();
}