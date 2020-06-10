module.exports = function(sequelize, DataTypes) {
  var Graded = sequelize.define("Graded", {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    author: DataTypes.STRING,
    url: DataTypes.STRING,
    grade: DataTypes.STRING
  })
  return Graded
};
