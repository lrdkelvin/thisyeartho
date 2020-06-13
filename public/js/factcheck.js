// This is our basic javascript file that will include the logic for buttons
//and probably calls to outside APIs 
//I renamed the file factcheck because there was already an index.js in the models folder

$(".card").hide();

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
  search(url, callback) {
    $.ajax({
      url: url,
      method: "GET",
      success: function (result) {
        callback(result);
      }
    });
  },
  /**
  * @param {string} searchTerm - article search term provided by user
  * @param {number} platform - The platform that we want to search under that we get from platform dropdown.
  * @param {Object} options - The Options for the search.
  * @param {number} [options.page=1] - The Page we are currently on.
  * @param {number} [options.limit=3] - the limit of results we want searched
  * @param callback
  */

  searchNews(searchTerm, options, callback) {
      const baseUrl = "https://newsapi.org/v2/everything?";
      //will change api key when I incorporate the .env file
      const querystring = "q=" + searchTerm + "&sortby=relevancy&apiKey=8d6bfe70b53d4b40aa6a8d5385f0f0de";

      app.search(baseUrl + querystring, function(response) {
        console.log("Search Board Games: " + response.articles[0].title);
        callback(response);
      });


  }

}
$("#search-button").on("click", function() {

app.searchNews($("#news-search").val(), {}, function(results) {

    $(".card").show();
    console.log(results)
    $("#article-title").html(results.articles[0].title);
    $("#article-author").html(results.articles[0].author);
    $("#article-source").html(results.articles[0].source.name);
    $("#article-url").html(results.articles[0].url);


    

})
})