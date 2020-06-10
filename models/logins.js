module.exports = function(sequelize, DataTypes) {
    var Logins = sequelize.define("Login", {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    });
    return Logins;
  };
  