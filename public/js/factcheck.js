// This is our basic javascript file that will include the logic for buttons
// and probably calls to outside APIs
// I renamed the file factcheck because there was already an index.js in the models folder
$(function() {
  // button for article-parser
  $("#extractInfo").on("click", function() {
    event.preventDefault();

    var newURL = {
      url: $("#itemURL").val(),
    };
    console.log(newURL);
    // Send the POST request.
    $.ajax("/api/articleVal", {
      type: "POST",
      data: newURL,
    }).then(function() {
      location.reload();
    });
  });
});
