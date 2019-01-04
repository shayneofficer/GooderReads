var GREY = "#444444";
var WHITE = "#FFFFFF";
var BLACK = "#000000";

//dark mode enabled by default
$("#lightMode").hide();
$("#nav").addClass("navbar-dark bg-dark-slow");
$("#searchBtn").addClass("btn-outline-light");
$("#loginFormSubmit").addClass("btn-primary");
$("#loginFormRegister").addClass("btn-primary");
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
  $("#nav").addClass("navbar-light bg-light-slow");

  if ($("#searchBtn").hasClass("btn-outline-light")) {
    $("#searchBtn").removeClass("btn-outline-light");
  }
  $("#searchBtn").addClass("btn-outline-dark");

  if ($("#content-heading").hasClass("text-dark")) {
    $("#content-heading").removeClass("text-dark");
  }
  
  $(".modal-header").addClass("bg-dark-slow");
  $(".modal-footer").addClass("bg-dark-slow");
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

  if ($("#nav").hasClass("navbar-light bg-light-slow")) {
    $("#nav").removeClass("navbar-light bg-light-slow");
  }
  $("#nav").addClass("navbar-dark bg-dark-slow");

  if ($("#searchBtn").hasClass("btn-outline-dark")) {
    $("#searchBtn").removeClass("btn-outline-dark");
  }
  $("#searchBtn").addClass("btn-outline-light");

  $("#content-heading").addClass("text-dark");
});