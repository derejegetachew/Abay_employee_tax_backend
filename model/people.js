module.exports = (sequelize, Sequelize) => {
    const People = sequelize.define("People", {
      first_name: {
        type: Sequelize.STRING,
      },
      middle_name: {
        type: Sequelize.STRING, 
      },
      last_name: {
        type: Sequelize.STRING,
      },
      sex: {
        type: Sequelize.STRING,
      },
    });
    return People;
  };