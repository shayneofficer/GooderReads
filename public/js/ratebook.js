$(".rate-book").on("click", function (event) {
  event.preventDefault();
  rating = { isbn: $(this).data("isbn"), rating: parseInt($(this).text()), userID: sessionStorage.getItem("userID") }

  console.log(rating);
  $.post("/api/rate-book/", rating, function (data) {
    if (data.error) {
      alert(data.error);
    }
  });
});

if (sessionStorage.getItem("userName") == "" || sessionStorage.getItem("userID") < 0) {
  console.log("hide dropdown");
  $(".ratings-dropdown").hide();
} else {
  $(".ratings-dropdown").show();
}

$(".ratings-dropdown").each(function () {
  if (!sessionStorage.getItem("userName") == "" && sessionStorage.getItem("userID") >= 0) {
    $.get("/api/book-rating/" + $(this).data("isbn") + "/" + sessionStorage.getItem("userID"), function (data) {
      if (data) {
        $(".ratings-dropdown").each(function () {
          if ($(this).data("isbn") == Object.values(data[0])[1]) {
            $(this).html("Book Rating: " + Object.values(data[0])[2]);
          }
        });
      }
    });
  }
});