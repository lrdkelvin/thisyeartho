//creating the table for items to be validated

module.exports = function(sequelize, DataTypes) {
  var articleVal = sequelize.define("articleVal", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
      defaultValue: "N/A"
    }
  });
  return articleVal;
};
