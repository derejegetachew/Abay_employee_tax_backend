module.exports = (sequelize, Sequelize) => {
    const gas_price = sequelize.define("gas_prices", {
    price: {
        type: Sequelize.DOUBLE,
            },
    month: {
        type: Sequelize.INTEGER, 
         },
    year: {
        type: Sequelize.INTEGER,
         },
    yearmonth: {
        type: Sequelize.STRING,
            },
    status: {
        type: Sequelize.BOOLEAN, 
      },
    });
    return gas_price;
  };