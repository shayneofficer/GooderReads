window.onload(function () {
  if (window.location == '/profile') {
    if (sessionStorage.getItem('userID') < 0) {
      $('#modalLoginForm').modal('show')

      $('#loginFormSubmit').on('click', function (event) {
        event.preventDefault()
        validateLogin(function () {
          console.log(sessionStorage.getItem('userID'))
        })
      })
    } else {
      
     
    }
  }
})
