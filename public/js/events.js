/**
 * Closes login modal and opens register modal
 */
$('#loginFormRegister').on('click', function (event) {
  $('#modalLoginForm').modal('toggle')
})

/**
 * Closes register modal and opens login modal
 */
$('#registerFormLogin').on('click', function (event) {
  $('#registerForm').modal('toggle')
})

$('#loginFormSubmit').on('click', function (event) {
  event.preventDefault()
  validateLogin(function () {})
})

/**
 * Signs the user out and updates the session storage to indicate the user is
 * no longer signed in
 */
$('#sign-out').on('click', function (event) {
  sessionStorage.setItem('userName', '')
  sessionStorage.setItem('userID', -4)
})

/**
 * If the user is logged in, brings them to their account preferences page.
 * If the user is NOT logged in, opens the register modal.
 */
$('#signed-in-icon').on('click', function (event) {
  event.preventDefault()
  if (sessionStorage.getItem('userID') >= 0) {
    window.location.replace('/profile/' + sessionStorage.getItem('userID'))
  } else {
    $('#modalLoginForm').modal('show')
  }
})

/**
 * Searches for books based on the string in the search box
 */
$('#searchBtn').on('click', function (event) {
  event.preventDefault()
  var title = $('#book-search-title')
    .val()
    .trim()
    .split(' ')
    .join('+')

  $.get('/search/' + title).then(function () {
    window.location.href = '/search/' + title
  })
})
