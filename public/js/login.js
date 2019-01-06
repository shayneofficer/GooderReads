bcrypt = require("bcryptjs");

$("#loginFormSubmit").on("click", function (event) {
  event.preventDefault();
  var loginInfo = {
    userEmail: $("#loginFormEmail").val().trim(),
    userPassword: $("#loginFormPass").val().trim()
  }

  $.post("/api/userLogin", loginInfo,
    function (data) {
      if(data.error) {
        $("#error-login").html(data.error).css('color', 'red');
      }
    }
  );
});