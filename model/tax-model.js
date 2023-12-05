module.exports = (sequelize, Sequelize) => {
    const tax_month_records = sequelize.define("tax_month_records", {
    fullName:{
        type: Sequelize.STRING,
        },
    tin: {
        type: Sequelize.STRING,
         },
    grade_id:{
       type: Sequelize.STRING,
     },
    step_id:{
        type: Sequelize.STRING,
         },
    transport: {
         type: Sequelize.DOUBLE,
         },
    house: {
        type: Sequelize.DOUBLE,
            },
    gas_price: {
            type: Sequelize.DOUBLE,
            },
    salary: {
                type: Sequelize.DOUBLE,
                 },
    benefit: {
        type: Sequelize.DOUBLE,
         },
    branch: {
        type: Sequelize.STRING,
             },
    draftby: {
        type: Sequelize.STRING,
           },
    status: {
        type: Sequelize.STRING,
              },
    month: {
        type: Sequelize.STRING,
         }

    });
    return tax_month_records;
  };