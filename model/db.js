const Sequelize = require("sequelize");
const dbConfig = require("../configuration/db.config.js");

// Create a new Sequelize instance
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operationsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

const db = {};

// Assign Sequelize and sequelize objects to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and invoke the tutorial model and pass in the sequelize and Sequelize objects
db.tutorials = require("../model/tutorial.js")(sequelize, Sequelize);
db.branches = require("../model/branch-model.js")(sequelize, Sequelize);
db.people=require("../model/people.js")(sequelize, Sequelize);
db.users=require("../model/users-model.js")(sequelize, Sequelize);
db.employees=require("../model/employees_model.js")(sequelize, Sequelize);
db.employee_details=require("../model/employee_details-model.js")(sequelize, Sequelize);
db.gas_prices=require("../model/gas-price-model.js")(sequelize, Sequelize);
db.grades=require("../model/grades.js")(sequelize, Sequelize);
db.emp_allowances=require("../model/emp_allowances.js")(sequelize, Sequelize);
db.tax_monthly=require("../model/tax-model.js")(sequelize, Sequelize);
db.scales=require("../model/scales.js")(sequelize, Sequelize);
// user to people relation ship
db.users.belongsTo(db.people, { foreignKey: "person_id" });
db.people.hasOne(db.users, { foreignKey: "person_id"});
// user to employee relation ship
db.employees.belongsTo(db.users, { foreignKey: "user_id" });
db.users.hasOne(db.employees, { foreignKey: "user_id"});
// allowance to grade  relation ship
db.emp_allowances.belongsTo(db.grades, { foreignKey: "grade_id" });
db.grades.hasOne(db.emp_allowances, { foreignKey: "grade_id"});

db.employees.hasMany(db.employee_details, {foreignKey: "employee_id"});
db.employee_details.belongsTo(db.employees, {foreignKey:"employee_id"});


// Export the db object
module.exports = db;