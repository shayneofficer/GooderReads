var GREY = "#444444";
var WHITE = "#FFFFFF";
var BLACK = "#000000";

//dark mode enabled by default
$("#lightMode").hide();
$("#nav").addClass("navbar-dark bg-dark-slow");
$("#searchBtn").addClass("btn-outline-light");
$("#loginFormSubmit").addClass("btn-primary");
$("#loginFormRegister").addClass("btn-outline-primary");
$("#registerFormSubmit").addClass("btn-primary");
$("#registerFormLogin").addClass("btn-outline-primary");
$("#content-heading").addClass("text-dark");

$("#darkMode").on("click", function (event) {
  $("#darkMode").fadeOut(50);
  setTimeout(function () {
    $("#lightMode").fadeIn("50");
  }, 200);

  // Change background to Dark Color
  if ($(".main-container").hasClass("bg-light-slow")) {
    $(".main-container").removeClass("bg-light-slow");
  }
  $(".main-container").addClass("bg-dark-slow");

  if ($("#nav").hasClass("navbar-dark bg-dark-slow")) {
    $("#nav").removeClass("navbar-dark bg-dark-slow");
  }
  $("#nav").addClass("navbar-light bg-grey-slow");

  if ($("#searchBtn").hasClass("btn-outline-light")) {
    $("#searchBtn").removeClass("btn-outline-light");
  }
  $("#searchBtn").addClass("btn-outline-dark");

  if ($("#content-heading").hasClass("text-dark")) {
    $("#content-heading").removeClass("text-dark");
  }
});

$("#lightMode").on("click", function (event) {
  $("#lightMode").fadeOut(50);
  setTimeout(function () {
    $("#darkMode").fadeIn("50");
  }, 200);

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
});


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