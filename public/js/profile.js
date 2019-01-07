window.onload = function () {
    if (sessionStorage.getItem("userID") === -4) {
        // Do nothing
    } else {
        var user = sessionStorage.getItem("userID");
        $.get("/profile/" + user).then(function () {

        });
    }

}