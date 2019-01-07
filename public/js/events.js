$("#loginFormRegister").on("click", function (event) {
  $("#modalLoginForm").modal("toggle");
});

$("#registerFormLogin").on("click", function (event) {
  $("#registerForm").modal("toggle");
});


// User Login Status
// Sign Out Button
$("#sign-out").on("click", function (event) {
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userID", -4);
});

$('#user-icon').on('click', function (event) {
  event.preventDefault()
  if (sessionStorage.getItem('userID') >= 0) {
    window.location.replace('/preferences')
  } else {
    $('#modalLoginForm').modal('show')
  }
});


$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  var title = $("#book-search-title").val().trim().split(" ").join("+");

  $.get("/search/" + title).then(function () {
    window.location.href = "/search/" + title;
  });
});
