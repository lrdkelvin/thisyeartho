// This is our basic javascript file that will include the logic for buttons
// and probably calls to outside APIs
// I renamed the file factcheck because there was already an index.js in the models folder

// button for article-parser
$("#extractInfo").on("click", function() {
  urlToBeValidated = $("#itemURL").val();

  console.log(urlToBeValidated);
});
