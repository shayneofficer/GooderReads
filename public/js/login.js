bcrypt = require("bcryptjs"); // Require doesnt not work with client/browser js

$("#loginFormSubmit").on("click", function (event) {
  event.preventDefault();
  var loginInfo = {
    userEmail: $("#loginFormEmail").val().trim(),
    userPassword: $("#loginFormPass").val().trim()
  }
  
  bcrypt.hash(loginInfo.userPassword, 10, function(err, hash) {
    console.log("hash-value \n")
    console.log(hash) 
  });

  $.post("/api/userLogin", loginInfo,
    function (data) {
      if(data.error) {
        $("#error-login").html(data.error).css('color', 'red');
      }
    }
  );
});