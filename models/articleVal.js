module.exports = function(sequelize, DataTypes) {
  var articleVal = sequelize.define("articleVal", {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Article",
      allowNull: false
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return articleVal;
};
