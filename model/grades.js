module.exports = (sequelize, Sequelize) => {
    const grades = sequelize.define("grades", {
    name: {
         type: Sequelize.STRING,
         },
    });
    return grades;
  };