/**
 * Constants for colors for page styling
 */
var GREY = "#444444";
var WHITE = "#FFFFFF";
var BLACK = "#000000";

/**
 * Changes styling of page elements to a darker them.
 */
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

  $('#body').css('background-image', 'none');
}

/**
 * Changes styling of the page to light theme.
 */
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

function signedOut() {
  $("#login").show();
  $("#register").show();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $('#signed-in-icon').hide();
  $("#user-name").hide();
  $("#sign-out").hide();
}

function signedIn() {
  $("#login").hide();
  $("#register").hide();
  $("#user-name").html(sessionStorage.getItem("userName"));
  $('#signed-in-icon').show();
  $("#user-name").show();
  $("#sign-out").show();
}

function getLikedGenres () {
  $.get('/api/likedGenres/' + sessionStorage.getItem('userID'), function (data) {
    //shows welcome modal only if it's their first time selecting genres
    if (data.genres.length <= 0) {
      console.log('Genres length: ' + data.genres.length)
      $('#welcomeModal').modal('show');
    }
    $('.genre-btn').each(function () {
      $(this).removeClass('selected')
      for (var i = 0; i < data.genres.length; i++) {
        if (this.id == data.genres[i]) {
          $(this).addClass('selected')
          break
        }
      }
    })
  })
}
