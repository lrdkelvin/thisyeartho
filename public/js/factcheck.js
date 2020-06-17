// This is our basic javascript file that will include the logic for buttons
//and probably calls to outside APIs 
//I renamed the file factcheck because there was already an index.js in the models folder

$(".card").hide();

$(document).ajaxError(function(){
  alert("An error occurred!");
});

function runSearch() {

}

const app = {

    results: [],

    /**
   * This is the main search method. Searches any api and returns the results in json.
   * @param {string} url - The Url you want to use in the fetch.
   * @param callback
   * @return {json}
   */
  
  /**
  * @param {string} searchTerm - article search term provided by user
  * @param {number} platform - The platform that we want to search under that we get from platform dropdown.
  * @param {Object} options - The Options for the search.
  * @param {number} [options.page=1] - The Page we are currently on.
  * @param {number} [options.limit=3] - the limit of results we want searched
  * @param callback
  */

  searchNews(searchTerm, callback) {
      //const baseUrl = "https://newsapi.org/v2/everything?";
      //will change api key when I incorporate the .env file
     // const querystring = "q=" + searchTerm + "&apiKey=8d6bfe70b53d4b40aa6a8d5385f0f0de";

      //app.search(baseUrl + querystring, function(response) {
        //callback(response);new
      //});
      $.ajax({
        url: "api/searchNews",
        method: "GET",
        data: {
          searchTerm: JSON.stringify(searchTerm)
        } 
        }).then(function (response) {
          console.log(response)
        })
    }

}
$("#search-button").on("click", function() {
  console.log("button clicked");

app.searchNews($("#news-search").val(), function(results) {

    var res = results.articles;
    var userInput = $("#user-input").val();

    $(".card").show();
    $("#user-input").html(userInput);
    $("#article-title").html(res[0].title);
    $("#article-author").html(res[0].author);
    $("#article-source").html(res[0].source.name);
    $("#article-desc").html(res[0].description)
    $("#article-url").html(res[0].url);
    $("#article-url").attr("href", res[0].url);
    $("#article-title2").html(res[1].title);
    $("#article-author2").html(res[1].author);
    $("#article-source2").html(res[1].source.name);
    $("#article-desc2").html(res[1].description)
    $("#article-url2").html(res[1].url);
    $("#article-title3").html(res[2].title);
    $("#article-author3").html(res[2].author);
    $("#article-source3").html(res[2].source.name);
    $("#article-desc3").html(res[2].description)
    $("#article-url3").html(res[2].url);


    

})
})
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
  
  // ebb9e38c850cfd2613e45b09488d8be8352cca8f
  