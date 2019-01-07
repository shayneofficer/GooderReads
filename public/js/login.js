//on click prevents the page from refresing and creats the login info based on the username and pass
$("#loginFormSubmit").on("click", function (event) {
  event.preventDefault();
  var loginInfo = {
    userEmail: $("#loginFormEmail").val().trim(),
    userPassword: $("#loginFormPass").val().trim()
  }
//sends the info to the API route to authticate the username and password
  $.post("/api/userLogin", loginInfo,
    function (data) {
      if(data.error) {
        $("#error-login").html(data.error).css('color', 'red');
      } else {
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("userID", data.userID);

        // Clear Login values
        $("#loginFormEmail").val("");
        $("#loginFormPass").val("");
        // Hide Login modal
        $("#modalLoginForm").modal("hide");
        signedIn();
        window.location.replace('/profile');
      }
    }
  );
});

