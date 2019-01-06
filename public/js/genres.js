
$("#submit-genres").on("click", function (event) {
  event.preventDefault();
  var likes = [];

  $(":input").each(function () {
    if (this.checked) {
      console.log(this);
      likes.push(this.id);
    }
  });

  console.log(likes);
});