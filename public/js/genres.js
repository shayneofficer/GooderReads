// On Load get Prefered Genres

if (sessionStorage.getItem("userID") >= 0) {
  getLikedGenres();
} else {
  // Go to Home page
}

$('#submit-genres').on('click', function (event) {
  event.preventDefault();
  var genres = { likes: [], userID: sessionStorage.getItem("userID") };

  $('.selected').each(function () {
    genres.likes.push(this.id)
  });
  console.log(genres);
  $.post("/api/likedGenres", genres, function (data) {
    console.log(data);
  });
});

$('.genre-btn').on('click', function (event) {
  event.preventDefault()

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected')
  } else {
    $(this).addClass('selected')
  }
})

$('#reset').on('click', function (event) {
  event.preventDefault();
  getLikedGenres();
})

$(window).on('load', function () {
  $('#welcomeModal').modal('show');
  console.log('loaded');
})

function getLikedGenres() {
  $.get("/api/likedGenres/" + sessionStorage.getItem("userID"), function (data) {
    $('.genre-btn').each(function () {
      $(this).removeClass('selected');
      for (var i = 0; i < data.genres.length; i++) {
        if (this.id == data.genres[i]) {
          $(this).addClass('selected');
          break;
        }
      }
    });
  });
}