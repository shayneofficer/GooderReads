if (sessionStorage.getItem('userID') === -4) {
  window.location.replace('/home')
} else {
  var user = sessionStorage.getItem('userID')
  $.get('/profile/' + user).then(function () {})
}