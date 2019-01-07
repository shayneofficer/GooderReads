//creates the register information and verifys information
var invalidChar = [];
$("#registerFormUsername").on("keyup", function (event) {

  var ek = event.key.charCodeAt(0);
  //Checks to make sure keys are actual letters
  if ((ek > 32 && ek < 48) || (ek > 57 && ek < 65) || (ek > 90 && ek < 97) || ek > 123) {
    //Invalid charactar in name
    invalidChar.push(event.key);
    $("#name-message").html("'" + invalidChar.toString() + "' are invalid characters!").css("color", "red");
  } else {
    var name = $("#registerFormUsername").val().trim().toLowerCase();
    for (var i = invalidChar.length - 1; i >= 0; i--) {
      if (name.indexOf(invalidChar[i]) < 0) {
        invalidChar.splice(i, 1);
      }
    }
    if (invalidChar.length) {
      //gives error message if there are invalid characters
      $("#name-message").html("'" + invalidChar.toString() + "' are invalid characters!").css("color", "red");
    } else {
      $("#name-message").empty();
    }
  }

});

//confirms the password 
$('#registerFormPass, #registerFormPassConfirm').on('keyup', function () {
  if ($('#registerFormPass').val() == $('#registerFormPassConfirm').val() && $('#registerFormPass').val().length > 7) {
    $('#lengthMessage').html('Matching').css('color', 'green');

  } else $('#lengthMessage').html('Not Matching').css('color', 'red');
});


$("#registerFormSubmit").on("click", function (event) {
  event.preventDefault();

  var userName = $("#registerFormUsername").val().trim().toLowerCase();
  var password = $("#registerFormPass").val().trim();
  var confirmPassword = $("#registerFormPassConfirm").val().trim();

  var invalidChar = [];
  for (var i = 0; i < userName.length; i++) {
    var ascii = userName.charCodeAt(i);
    if ((ascii > 32 && ascii < 48) || (ascii > 57 && ascii < 65) || (ascii > 90 && ascii < 97) || ascii > 123) {
      invalidChar.push(userName[i]);
    }
  }
  //sets error messages
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
      userName: $("#registerFormUsername").val().trim(),
      userPassword: $("#registerFormPass").val().trim(),
      userEmail: $("#registerFormEmail").val().trim()
    };
    
    //uses the post api route to create a newuser using the values supplied
    $.post("/api/registerUser", newUser,
      function (data) {
        if (data.error) {
          $('#error-message').html(data.error).css('color', 'red');
        } else {

          // Clear Register Form
          $("#registerFormUsername").val("");
          $("#registerFormPass").val("");
          $("#registerFormPassConfirm").val("");
          $("#registerFormEmail").val("");
          
          // Set Login from returned data
          sessionStorage.setItem("userName", data.userName);
          sessionStorage.setItem("userID", data.userID);

          signedIn();
          // redirect to Account page 
        }
      }
    );
  }
});