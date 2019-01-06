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
      } else {
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("userID", data.userID);
        $("#modalLoginForm").modal("hide");
      }
    }
  );
});