$("#submit-genres").on("click", function (event) {
  event.preventDefault();
  var genres = {userID: sessionStorage.getItem("userID"), likes: []}

  $(":input").each(function () {
    if (this.checked) {
      // console.log(this);
      genres.likes.push(this.id);
    }
  });

  // Send list of liked genres to server
  $.post("/api/likedGenres", genres,
    function (data) {

    }
  );

  console.log(genres.likes);
});