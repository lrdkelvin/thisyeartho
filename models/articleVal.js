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
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: 0, max: 10 }
    },
  });
  return articleVal;
};
