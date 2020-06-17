$(document).ready(function() {
  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var itemId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In localhost:8080/cms?post_id=1, postId is 1
  if (url.indexOf("?url_id=") !== -1) {
    itemId = url.split("=")[1];
    getItemData(itemId);
  }

  // Getting jQuery references to the post body, title, form, and category select
  var bodyInput = $("#rating");
  var urlInput = $("#urlToBe");
  var addForm = $("#addNew");
  var categorySelect = $("#category");
  // Giving the postCategorySelect a default value
  categorySelect.val("Article");
  // Adding an event listener for when the form is submitted
  $(addForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
    if (!urlInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newItem = {
      url: urlInput.val().trim(),
      rating: ratingInput.val().trim(),
      category: categorySelect.val()
    };

    console.log(newItem);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newItem.id = itemId;
      updateItem(newItem);
    }
    else {
      submitItem(newItem);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitItem(item) {
    $.post("/api/articles/", item, function() {
      window.location.href = "/admin";
    });
  }

  // Gets post data for a post if we're editing
  function getItemData(id) {
    $.get("/api/articles/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        urlInput.val(data.title);
        ratingInput.val(data.rating);
        categorySelect.val(data.category);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }

  // Update a given post, bring user to the blog page when done
  function updateItem(item) {
    $.ajax({
      method: "PUT",
      url: "/api/articles",
      data: item
    })
      .then(function() {
        window.location.href = "/admin";
      });
  }
});
