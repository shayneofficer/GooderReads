/**
 * Constants for colors for page styling
 */
var GREY = '#444444'
var WHITE = '#FFFFFF'
var BLACK = '#000000'

/**
 * Changes styling of page elements to a darker them.
 */
function darkMode () {
  $('#darkMode').hide()
  setTimeout(function () {
    $('#lightMode').fadeIn('50')
  }, 50)
  // Change background to Dark Color
  if ($('.main-container').hasClass('bg-light-slow')) {
    $('.main-container').removeClass('bg-light-slow')
  }
  $('.main-container').addClass('bg-dark-slow')

  if ($('#nav').hasClass('navbar-dark')) {
    $('#nav').removeClass('navbar-dark')
  }
  $('#nav').addClass('navbar-light bg-grey-slow')

  if ($('#searchBtn').hasClass('btn-outline-light')) {
    $('#searchBtn').removeClass('btn-outline-light')
  }
  $('#searchBtn').addClass('btn-outline-dark')

  if ($('#content-heading').hasClass('text-dark')) {
    $('#content-heading').removeClass('text-dark')
  }

  if ($('#user-icon').hasClass('text-white')) {
    $('#user-icon').removeClass('text-white')
  }
  $('#user-icon').addClass('text-dark')

  if ($('#home-icon').hasClass('text-white')) {
    $('#home-icon').removeClass('text-white')
  }
  $('#home-icon').addClass('text-dark')

  $('#body').css('background-image', 'none')
}

/**
 * Changes styling of the page to light theme.
 */
function lightMode () {
  $('#lightMode').fadeOut(50)
  setTimeout(function () {
    $('#darkMode').fadeIn('50')
  }, 50)

  // Background photo for light mode
  $('#body').css('background-image', 'url("/../assets/hypnotize.png")')

  if ($('.main-container').hasClass('bg-dark-slow')) {
    $('.main-container').removeClass('bg-dark-slow')
  }
  $('.main-container').addClass('bg-light-slow')

  if ($('#nav').hasClass('navbar-light bg-grey-slow')) {
    $('#nav').removeClass('navbar-light bg-grey-slow')
  }
  $('#nav').addClass('navbar-dark bg-dark-slow')

  if ($('#searchBtn').hasClass('btn-outline-dark')) {
    $('#searchBtn').removeClass('btn-outline-dark')
  }
  $('#searchBtn').addClass('btn-outline-light')
  $('#content-heading').addClass('text-dark')

  if ($('#user-icon').hasClass('text-dark')) {
    $('#user-icon').removeClass('text-dark')
  }
  $('#user-icon').addClass('text-white')

  if ($('#home-icon').hasClass('text-dark')) {
    $('#home-icon').removeClass('text-dark')
  }
  $('#home-icon').addClass('text-white')
}

/**
 * Changes page content to 'signed out' default
 */
function signedOut () {
  $('#login').show()
  $('#register').show()
  $('#user-name').html('')
  $('#signed-in-icon').hide()
  $('#user-name').hide()
  $('#sign-out').hide()
}

/**
 * Changes page content to reflect the 'signed in' user's information
 */
function signedIn () {
  $('#login').hide()
  $('#register').hide()
  $('#user-name').html(sessionStorage.getItem('userName'))
  $('#signed-in-icon').show()
  $('#user-name').show()
  $('#sign-out').show()
}

/**
 * Gets an array of the genre's the user has previously 'liked' in their profile.
 * It then shows them as selected when the genre page loads. The user can then
 * update them and save changes. If the user hasn't saved any genre preferences,
 * it shows a welcome message.
 */
function getLikedGenres () {
  $.get('/api/likedGenres/' + sessionStorage.getItem('userID'), function (data) {
    if (data.genres.length <= 0) {
      console.log('Genres length: ' + data.genres.length)
      $('#welcomeModal').modal('show')
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

/**
 * Validates user login information upon submitting the form.
 */
function validateLogin (cb) {
  var loginInfo = {
    userEmail: $('#loginFormEmail')
      .val()
      .trim(),
    userPassword: $('#loginFormPass')
      .val()
      .trim()
  }

  // Sends data to server for validation
  $.post('/api/userLogin', loginInfo, function (data) {
    if (data.error) {
      $('#error-login')
        .html(data.error)
        .css('color', 'red')
    } else {
      sessionStorage.setItem('userName', data.userName)
      sessionStorage.setItem('userID', data.userID)

      console.log('SS.userName: ' + sessionStorage.getItem('userName'))
      console.log('SS.userID: ' + sessionStorage.getItem('userID'))
      // Clear Login values
      $('#loginFormEmail').val('')
      $('#loginFormPass').val('')
      // Hide Login modal
      $('#modalLoginForm').modal('hide')
      signedIn()
      window.location.replace('/profile')
    }
    cb()
  })
}