// On Load get Prefered Genres

$(window).on('load', function () {
  if (sessionStorage.getItem('userID') >= 0) {
    getLikedGenres()
  }
})

$('#submit-genres').on('click', function (event) {
  event.preventDefault()
  var genres = { likes: [], userID: sessionStorage.getItem('userID') }

  $('.selected').each(function () {
    genres.likes.push(this.id)
  })
  console.log(genres)
  $.post('/api/likedGenres', genres, function (data) {
    console.log(data)
  })
  window.location.replace('/home')
})

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
  getLikedGenres()
})
