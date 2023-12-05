module.exports = (sequelize, Sequelize) => {
    const emp_allowances = sequelize.define("emp_allowances", {
    transport: {
         type: Sequelize.DOUBLE,
         },
     house: {
        type: Sequelize.DOUBLE,
            },
    from: {
         type: Sequelize.DATE,
         },
    end: {
        type: Sequelize.DATE,
             },
    status: {
        type: Sequelize.BOOLEAN,
         }

    });
    return emp_allowances;
  };