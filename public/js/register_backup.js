$(".submit").on("click", function (event) {
  event.preventDefault();
  var userName = $("#user-name").val().trim().toLowerCase();
  var password = $("#user-password").val().trim();
  var confirmPassword = $("#confirm-password").val().trim();

  var invalidChar = [];
  for (var i = 0; i < userName.length; i++) {
      var ascii = userName.charCodeAt(i);
      if ((ascii > 32 && ascii < 48) || (ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97) || ascii > 123) {
          invalidChar.push(userName[i]);
      }
  }

  if (invalidChar.length) {
      $("#name-message").html("'" + invalidChar.toString() + "' are invalid characters!").css("color", "red");
      $('#error-message').html('User Name contains invalid characters').css('color', 'red');
  } else if (password.length < 8) {
      $('#error-message').html('Password not long enough! Please use a password that is 8 characters long!').css('color', 'red');
  } else if (password != confirmPassword) {
      $('#error-message').html('Password does not match Confirm Password!').css('color', 'red');
  } else {
      // Register new user

      $('#error-message').empty();

      // Grab the form elements
      var newUser = {
          userName: $("#user-name").val().trim(),
          userPassword: $("#user-password").val().trim(),
          userEmail: $("#user-email").val().trim()
      };

      $.post("/api/registerUser", newUser,
          function (data) {
              console.log(data);
              if (data.error) {
                  $('#error-message').html(data.error).css('color', 'red');
              } else {
                  // Clear the form when submitting
                  $("#user-name").val("");
                  $("#user-password").val("");
                  $("#confirm-password").val("");
                  $("#user-email").val("");
              }
          }
      );
  }
});