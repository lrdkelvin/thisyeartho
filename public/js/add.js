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
<<<<<<< HEAD
  var ratingInput = $("#title");
=======

  var titleInput = $("#title");
>>>>>>> 00201fc0e220cb833eac8fa3b3e56ffda94e943e
  var urlInput = $("#urlToBe");
  var addForm = $("#addNew");
  var categorySelect = $("#category");
  // Giving the postCategorySelect a default value
  categorySelect.val("Article");
  // Adding an event listener for when the form is submitted
  $(addForm).on("submit", function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body or a title
<<<<<<< HEAD
    if (!urlInput.val().trim() || !ratingInput.val().trim()) {
=======
    if (!urlInput.val().trim() || !titleInput.val().trim()) {
>>>>>>> 00201fc0e220cb833eac8fa3b3e56ffda94e943e
      return;
    }
    // Constructing a newPost object to hand to the database
    var newItem = {
<<<<<<< HEAD
      title: ratingInput.val().trim(),
=======
      title: titleInput.val().trim(),
>>>>>>> 00201fc0e220cb833eac8fa3b3e56ffda94e943e
      url: urlInput.val().trim(),
      category: categorySelect.val(),
    };

    console.log(newItem);

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newItem.id = itemId;
      updateItem(newItem);
    } else {
      submitItem(newItem);
    }
  });

  // Submits a new post and brings user to blog page upon completion
  function submitItem(item) {
    $.post("/api/articles/", item, function() {
      window.location.href = "/admin.html";
    });
  }

  // Gets post data for a post if we're editing
  function getItemData(id) {
    $.get("/api/articles/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data
        urlInput.val(data.url);
        titleInput.val(data.title);
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
      data: item,
    }).then(function() {
      window.location.href = "/admin";
    });
  }

  // added in the following code to display the graded items
  //on the dashboard based on category
  var itemContainer = $(".itemContainer");
  var categoryDisplay = $("#categoryDisplay");
  categoryDisplay.on("change", handleCategoryChange);
  var items;

  function getItems(rating) {
    var ratingString = rating || "";
    if (ratingString) {
      ratingString = "/rating/" + ratingString;
    }
    $.get("/api/articles" + ratingString, function(data) {
      console.log("Items", data);
      items = data;
      if (!items || !items.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  function initializeRows(req, res) {
    itemContainer.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]));
    }
    itemContainer.append(itemsToAdd);
  }

  function createNewRow(item) {
    var newItemCard = $("<div>");
    newItemCard.addClass("card");
    var newItemCardHeading = $("<div>");
    newItemCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newItemTitle = $("<h2>");
    var newItemCategory = $("<h5>");
    newItemCategory.text(item.category);
    newItemCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top": "-15px",
    });
    var newItemCardBody = $("<div>");
    newItemCardBody.addClass("card-body");
    var newItemBody = $("<p>");
    newItemTitle.text(item.title + " ");
    newItemBody.text("Grade: " + item.rating);
    newItemBody.append("<br />");
    newItemBody.append("<a href='" + item.url + "'>" + item.url + "</a>");
    newItemCardHeading.append(newItemTitle);
    newItemCardHeading.append(newItemCategory);
    newItemCardBody.append(newItemBody);
    newItemCard.append(newItemCardHeading);
    newItemCard.append(newItemCardBody);
    newItemCard.data("item", item);
    return newItemCard;
  }

  function displayEmpty() {
    itemContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No items yet for this category, navigate <a href='/dashboard'>here</a> in order to submit an item for validation."
    );
    itemContainer.append(messageH2);
  }

  function handleCategoryChange() {
    var newItemCategory = $(this).val();
    getItems(newItemCategory);
  }
  var articleUrl = "";
  var articleTitle = "";
  var articleCategory = "Article";
  var items = [];
  var missing = true;
  //get posts on articles
  function getArticles(category) {
    console.log("here is the list of categories: " + category);
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/articles" + categoryString, function(data) {
      console.log("Items", data);
      for (var i = 0; i < data.length; i++) {
        items.push(data[i]);
      }
    });
  }
  getArticles();

  $("#article-btn").on("click", function() {
    articleUrl = $("#article-url").html();
    console.log("the url should be: " + articleUrl);
    articleTitle = $("#article-title").html();
    console.log("Aricle title is " + articleTitle);
    setTimeout(function(){addArticles()}, 100);
   
  });
  $("#article-btn2").on("click", function() {
    articleUrl = $("#article-url2").html();
    articleTitle = $("#article-title2").html();
    console.log("the url should be: " + articleUrl);
    setTimeout(function(){addArticles()}, 100);
  });
  $("#article-btn3").on("click", function() {
    articleUrl = $("#article-url3").html();
    articleTitle = $("#article-title3").html();
    console.log("the url should be: " + articleUrl);
    setTimeout(function(){addArticles()}, 100);
  });
  function addArticles() {
    console.log("article url is now: " + articleUrl);
    for (var i = 0; i < items.length; i++) {
      if (items[i].url !== articleUrl) {
        console.log("It's not here!");
      } else {
        missing = false;
        console.log("it's here");
        if (items[i].rating === "N/A") {
          alert(
            "This has been requested and has not yet recieved a grade.  We will work as fast as we can to get it done!"
          );
        } else {
          alert(
            "This has been requested and received a grade of " +
              items[i].rating +
              " for factual accuracy"
          );
        }
      }
    }

    setTimeout(function() {
      if (missing === true) {
        console.log("guess we need to add this to database");
        var newItem = {
          title: articleTitle.trim(),
          url: articleUrl.trim(),
          category: articleCategory
        };
        console.log(newItem);
        submitItem(newItem);

      } else {
        console.log("this is already in database and shouldn't be added");
        console.log("missing is: " + missing)
        missing = true;
      }
    }, 200);
  }
});
