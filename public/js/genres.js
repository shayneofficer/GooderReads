// On Load get Prefered Genres
$(window).on('load', function () {
  if (sessionStorage.getItem('userID') >= 0) {
    getLikedGenres()
  }
})

// on click the genres selected will be pushed to an array which will be attached to the user ID
// and the user back to their profile page
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
  window.location.replace('/profile')
})

//gives the genre buttons a class which can be used to identify which genres a user has liked
$('.genre-btn').on('click', function (event) {
  event.preventDefault()

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected')
  } else {
    $(this).addClass('selected')
  }
})

//resets all the genre buttons to unselected
$('#reset').on('click', function (event) {
  event.preventDefault()
  getLikedGenres()
})

//retrieves user information and sets the genre page to show selected genres
function getLikedGenres () {
  $.get('/api/likedGenres/' + sessionStorage.getItem('userID'), function (data) {
    //shows welcome modal only if it's their first time selecting genres
    if (data.genres.length <= 0) {

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

