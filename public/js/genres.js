/**
 * If the user is signed in, gets their saved preferred genres
 */
if (sessionStorage.getItem('userID') >= 0) {
  getLikedGenres()
}

/**
 * Updates (overwrites) the users saved preferred genres with the current
 * values in the form.
 */
$('#submit-genres').on('click', function (event) {
  event.preventDefault()
  var genres = { likes: [], userID: sessionStorage.getItem('userID') }

  $('.selected').each(function () {
    genres.likes.push(this.id)
  })
  $.post('/api/likedGenres', genres, function (data) {
  })
  window.location.replace('/home')
})

/**
 * Toggles the selection state of a genre.
 */
$('.genre-btn').on('click', function (event) {
  event.preventDefault()

  if ($(this).hasClass('selected')) {
    $(this).removeClass('selected')
  } else {
    $(this).addClass('selected')
  }
})

/**
 * Resets genre form to the previous saved state (none selected if new user)
 */
$('#reset').on('click', function (event) {
  event.preventDefault()
  getLikedGenres()
})