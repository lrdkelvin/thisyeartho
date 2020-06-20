//This is our api routes file. It will send requests to our database and return the info.
//This is basically the sequelize ORM making it so we don't have to write sql statements.
//This is still the basic example file, so none of this code currently does anything.
require("dotenv").config();
var axios = require('axios');
var db = require("../models");
var keys = require("../keys.js");
var news = keys.NewsSearch.key;

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
          category: req.params.category
        }
      })
      .then(function(factCheck) {
        res.json(factCheck);
      });
  });



  app.get("/api/articles/rating/:rating", function(req, res) {
    db.articleVal
    .findAll({
      where: {
        rating: req.params.rating
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
        title: req.body.title,
        url: req.body.url,
        rating: req.body.rating,
        category: req.body.category,
      })
      .then(function(factCheck) {
        res.json(factCheck);
      });
  });


  // PUT route for updating posts
  app.put("/api/articles/:id", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    db.articleVal
      .update(
        {
          rating: req.body.rating,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )
      .then(function(factCheck) {
        res.json(factCheck);
      });
  });

  app.get("/api/searchNews", function(req, res) {
    console.log("searchTerm is: " + req.query.searchTerm)
    console.log('searchNews');
    const baseURL = "https://newsapi.org/v2/everything?";
    const searchTerm = req.query.searchTerm
    const querystring = "q=" + searchTerm + "&sortBy=relevancy&apiKey=" + news;
    const totalURL = baseURL + querystring;
    axios({
      method: "get",
      url: totalURL
    })
      .then(function (response) {
        res.json(response.data);
      }).catch(error => console.log(error))
  });
};
