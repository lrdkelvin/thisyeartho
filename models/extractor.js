const { extract } = require("article-parser");

const url = "https://goo.gl/MV8Tkh";

extract(url)
  .then((article) => {
    console.log(article);
  })
  .catch((err) => {
    console.log(err);
  });
