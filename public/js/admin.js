$(document).ready(function() {
  /* global moment */
  // blogContainer holds all of our posts
  var itemContainer = $(".itemContainer");
  var categorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleItemDelete);
  $(document).on("click", "button.edit", handleItemEdit);
  categorySelect.on("change", handleCategoryChange);
  var items = [];

  // This function grabs posts from the database and updates the view
  function getItems(category) {
    console.log("here is the list of categories: " + category);
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/articles" + categoryString, function(data) {
      console.log("Items", data);
      for (var i=0; i<data.length; i++) {
        if (data[i].rating === "N/A") {
          items.push(data[i]);
        }
      }
      if (!items || !items.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }


  // This function does an API call to delete posts
  function deleteItem(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + id
    })
      .then(function() {
        getItems(categorySelect.val());
      });
  }

  // Getting the initial list of posts
  getItems();
  // InitializeRows handles appending all of our constructed post HTML inside
  // blogContainer
  function initializeRows() {
    itemContainer.empty();
    var itemsToAdd = [];
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]));
    }
    itemContainer.append(itemsToAdd);
  }

  // This function constructs a post's HTML
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
      "margin-top":
      "-15px"
    });
    var newItemCardBody = $("<div>");
    newItemCardBody.addClass("card-body");
    var newItemBody = $("<p>");
    newItemTitle.text(item.title + " ");
    newItemBody.text(item.url + " ");
    newItemBody.append("<br />" + item.rating);
    newItemCardHeading.append(deleteBtn);
    newItemCardHeading.append(editBtn);
    newItemCardHeading.append(newItemTitle);
    newItemCardHeading.append(newItemCategory);
    newItemCardBody.append(newItemBody);
    newItemCard.append(newItemCardHeading);
    newItemCard.append(newItemCardBody);
    newItemCard.data("item", item);
    return newItemCard;
  }

  // This function figures out which post we want to delete and then calls
  // deletePost
  function handleItemDelete() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    deleteItem(currentItem.id);
  }

  // This function figures out which post we want to edit and takes it to the
  // Appropriate url
  function handleItemEdit() {
    var currentItem = $(this)
      .parent()
      .parent()
      .data("item");
    window.location.href = "/dashboard?url_id=" + currentItem.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty() {
    itemContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No items yet for this category, navigate <a href='/dashboard'>here</a> in order to submit an item for validation.");
    itemContainer.append(messageH2);
  }

  // This function handles reloading new posts when the category changes
  function handleCategoryChange() {
    var newItemCategory = $(this).val();
    getItems(newItemCategory);
  }

});
