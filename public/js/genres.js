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
  window.location.repalce('/home')
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
