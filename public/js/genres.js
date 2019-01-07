$('#submit-genres').on('click', function (event) {
  event.preventDefault()
  var genres = { likes: [], userID: sessionStorage.getItem("userID") };

  $('.selected').each(function () {
    genres.likes.push(this.id)
  })
  console.log(genres);
  $.post("/api/likedGenres", genres, function (data) {
    
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
  event.preventDefault()

  $('.selected').removeClass('selected')
})

$(window).on('load', function () {
  $('#welcomeModal').modal('show')
  console.log('loaded')
})
