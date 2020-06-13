var parser = require('horseman-article-parser');
const { response } = require('express');

var options = {
  url: "https://www.civilbeat.org/tag/candidates-2020/",
  enabled: ['lighthouse', 'screenshot', 'links']
}

parser.parseArticle(options)
  .then(function (article) {

    var response = {
      title: article.title.text,
      excerpt: article.excerpt,
      metadescription: article.meta.description.text,
      url: article.url,
      text: {
        formatted: article.processed.text.formatted,
      },
      author: article.meta.author,
      links: article.links,
    }

    console.log(response);
  })
  .catch(function (error) {
    console.log(error.message)
    console.log(error.stack);
  });

  module.exports = response;
