//This is our api routes file. It will send requests to our database and return the info.
//This is basically the sequelize ORM making it so we don't have to write sql statements.
//This is still the basic example file, so none of this code currently does anything.

var db = require("../models");

module.exports = function(app) {


  ///////////// ARTICLE PARSER  ////////////

  //finds all articles parsed
  app.get("/api/articles", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.articleVal.findAll({}).then(function(factCheck) {
      res.json(factCheck);
    });
  });

  // Get route for returning posts of a specific category
  app.get("/api/articles/category/:category", function(req, res) {
    // Add sequelize code to find all posts where the category is equal to req.params.category,
    // return the result to the user with res.json
    db.articleVal
      .findAll({
        where: {
          category: req.params.category,
        },
      })
      .then(function(factCheck) {
        res.json(factCheck);
      });
  });

  // POST route for saving a new post
  app.post("/api/articles", function(req, res) {
    // Add sequelize code for creating a post using req.body,
    // then return the result using res.json
    db.articleVal
      .create({
        url: req.body.url,
        category: req.body.category
      })
      .then(function(factCheck) {
        res.json(factCheck);
      });
  });

  // DELETE route for deleting posts
  app.delete("/api/articles/:id", function(req, res) {
    // Add sequelize code to delete a post where the id is equal to req.params.id,
    // then return the result to the user using res.json
    db.articleVal.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function(factCheck) {
      res.json(factCheck);
    });
  });

  // PUT route for updating posts
  app.put("/api/articles", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.articleVal.update(
      {
        url: req.body.url,
        rating: req.body.rating,
        category: req.body.category,
      },
      {
        where: {
          id: req.body.id,
        },
      }
    ).then(function(factCheck) {
      res.json(factCheck);
    });
  });

  app.get("/api/searchNews", function(req, res) {
    console.log('request is: ' + req.body);
    console.log('searchNews');
    const baseURL = "https://newsapi.org/v2/everything?";
    const searchTerm = 'bitcoin';
    const querystring = "q=" + searchTerm + "&apiKey=8d6bfe70b53d4b40aa6a8d5385f0f0de"
    const totalURL = baseURL + querystring;
    axios({
      method: "get",
      url: totalURL
    })
      .then(function (response) {
        console.log(response.data);
        res.json(response.data);
      }).catch(error => console.log(error))
  });
};
