module.exports = (sequelize, Sequelize) => {
    const gas_price = sequelize.define("gas_prices", {
    price: {
        type: Sequelize.DOUBLE,
            },
    status: {
        type: Sequelize.BOOLEAN, 
      },
    });
    return gas_price;
  };