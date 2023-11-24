module.exports = (sequelize, Sequelize) => {
    const employee_details = sequelize.define("employee_details", {
    grade_id: {
         type: Sequelize.STRING,
         },
    step_id: {
        type: Sequelize.STRING, 
      },
    position_id: {
        type: Sequelize.STRING,
        },
    start_date: {
       type: Sequelize.STRING, 
     },
    end_date: {
        type: Sequelize.STRING,
        },
    salary: {
       type: Sequelize.STRING, 
     },
    created: {
        type: Sequelize.STRING,
        },
    modified: {
        type: Sequelize.STRING,
        },
    branch_id: {
       type: Sequelize.STRING, 
     },
    type: {
        type: Sequelize.STRING,
        },
    status: {
       type: Sequelize.STRING, 
     },
    transfer: {
        type: Sequelize.STRING,
        },
    position_change: {
       type: Sequelize.STRING, 
     },
    position_end: {
        type: Sequelize.STRING, 
      },

    });
    return employee_details;
  };