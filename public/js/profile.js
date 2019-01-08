window.onload = new function (event) {
  if (window.location.pathname == '/profile' || window.location.pathname == '/genres') {
    if (sessionStorage.getItem('userID') < 0) {
      // User is NOT logged in
      var userID
      $('#modalLoginForm').modal('show')
      $('#loginFormSubmit').on('click', function (event) {
        validateLogin(function () {
          userID = sessionStorage.getItem('userID')
        })
      })
      $('#registerFormSubmit').on('click', function (event) {
        validateRegister(function () {
          userID = sessionStorage.getItem('userID')
        })
      })
      $('#loginFormClose').on('click', function (event) {
        event.preventDefault()
        userID = sessionStorage.getItem('userID')
        if (userID < 0) {
          window.location.replace('/home')
        }
      })
      $('#registerFormClose').on('click', function (event) {
        event.preventDefault()
        userID = sessionStorage.getItem('userID')
        if (userID < 0) {
          window.location.replace('/home')
        }
      })
    } else {
      // User is already logged in
      if (window.location = '/profile') {
        var userID = sessionStorage.getItem('userID')
        window.location.replace('/profile/' + userID)
      }
    }
  }
}

