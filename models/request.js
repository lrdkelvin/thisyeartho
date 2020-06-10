module.exports = function(sequelize, DataTypes) {
  var Requests = sequelize.define("Request", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    author: DataTypes.STRING,
    url: DataTypes.STRING
  });
  return Requests;
};
