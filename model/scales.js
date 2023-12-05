module.exports = (sequelize, Sequelize) => {
    const scales = sequelize.define("scales", {
    grade_id: {
         type: Sequelize.INTEGER,
         },
    step_id: {
             type: Sequelize.INTEGER,
            },
            
    salary: {
                type: Sequelize.DOUBLE,
                },
    });
    return scales;
  };
