module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("Employee", {
    status: {
         type: Sequelize.STRING,
         },
    trial: {
        type: Sequelize.STRING, 
      },
    });
    return Employee;
  };