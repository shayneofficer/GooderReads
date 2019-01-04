$(".submit").on("click", function (event) {
  event.preventDefault();
  var likes = [];

  $(":input").each(function () {
    if (this.checked) {
      likes.push(this.id);
    }
  });

  console.log(likes);
});