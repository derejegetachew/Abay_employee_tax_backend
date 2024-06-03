module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
    username: {
        type: Sequelize.STRING,
      },
    tin_number: {
        type: Sequelize.STRING,
      },
    email: {
        type: Sequelize.STRING, 
      },
    is_active: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false 
    });
    return  User;
  };