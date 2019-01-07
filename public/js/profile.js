window.onload = function () {
    if (sessionStorage.getItem("userID") === -4) {
        // Do nothing
    } else {
        var user = sessionStorage.getItem("userID");
        window.location.href = "/profile/" + user;
        $.get("/profile/" + user).then(function () {

        });
    }

}