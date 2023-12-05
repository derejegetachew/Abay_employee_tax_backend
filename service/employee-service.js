const db = require("../model/db");
const AppError = require("../utils/appError");
const people = db.people;
const user = db.users;
const employee = db.employees;
const employeeDetail = db.employee_details;
const emp_allowances = db.emp_allowances;
const gas_price = db.gas_prices;
const salary_scale = db.scales;

const Op = db.Sequelize.Op;

class EmployeeService {
  async findEmployeeByBranch(branch) {
    try {
      let data = await employeeDetail.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          end_date: '0000-00-00',
          branch_id: branch
        },
        include: [
          {
            model: employee,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [
              {
                model: user,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [
                  {
                    model: people,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                  }
                ]
              }
            ]
          }
        ]
      });

      const employeeDetailsWithAllowance = await Promise.all(
        data.map(async (employeeDetail) => {
          const allowance = await this.findAllowance(
            employeeDetail.grade_id,
            employeeDetail.step_id,
          );
          return { ...employeeDetail.toJSON(), allowance };
        })
      );
  
      return employeeDetailsWithAllowance;
    } catch (error) {
      throw new AppError('Error finding employees by branch', 500);
    }
  }

  async findAllowance(grade,step) {
    try {
      const data = await emp_allowances.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          grade_id:grade,
        }
      });
      let gasPrice=await this.gasPrice();
      data.dataValues.transportAllowance=data.dataValues.transport*gasPrice;
      data.dataValues.price=gasPrice;
      let salary_scale=await this.getSalary(grade,step);
      data.dataValues.salary=salary_scale;
     return data.dataValues;
    } catch (error) {
     
     
     let data={
        transport: 0,
        house: 0,
        status: false,
        grade_id: 0,
        transportAllowance:0,
        price:0,
        salary:0
      }
      return data;
    }
  }

  async gasPrice() {
    try {
      const data = await gas_price.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          status: true,
        },
        order: [['createdAt', 'DESC']],
      });
     return data.dataValues.price;
    } catch (error) {
      return 0;
    }
  }
  
  async getSalary(grade,step) {
    try {
      const data = await salary_scale.findOne({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          grade_id: grade,
          step_id:step
        },
      });
     return data.dataValues.salary;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = EmployeeService;