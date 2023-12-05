const db = require("../model/db");
const AppError = require("../utils/appError");
const EmployeeService=require('./employee-service');
const tax = db.tax_monthly;
const get_branch = db.branches;
const gas_price = db.gas_prices;
const Op = db.Sequelize.Op;
class TaxService {
   employeeService=new EmployeeService();
  
    async findSubmittedBranches(month) {
        try {
          const branchIds = await tax.findAll({
            attributes: ['branch'],
            where: {
              month: month,
              status: 'Submitted'
            },
            group: ['branch']
          });
      
          const branchData = await Promise.all(
            branchIds.map(async (branchId) => {
              const branch = await this.getBranchDataById(branchId.branch);
              return {
                branchId: branchId.branch,
                branchName: branch ? branch.name : null
              };
            })
          );
      
          return branchData;
        } catch (error) {
          throw new AppError('Error occurred while fetching submitted branches.', 500);
        }
      }


  async getBranchDataById(id) {
    try {
      const data = await get_branch.findByPk(id, {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
     return data;
    } catch (error) {
        throw new AppError('Error occurred while fetching  branches.', 500);
    }
  }


  async getTaxInfoPermonth(month) {
    try {
      const taxPay = await tax.findAll({
        where: {
          month: month,
          status: 'Submitted'
        },
      });
        const taxPayWithSum = taxPay.map(taxRecord => {
        const totalSum = taxRecord.transport + taxRecord.house + taxRecord.salary + taxRecord.benefit;
        const totalTax=this.calculateTax(totalSum);
        const netPay=totalSum-totalTax;
        return {
          ...taxRecord.toJSON(),
          totalSum: totalSum,
          totalTax:totalTax,
          netPay:netPay
        };
      });
  
      return taxPayWithSum;
    } catch (error) {
      throw new AppError('Error occurred while fetching submitted branches.', 500);
    }
  }

  async getTaxInfoByBranchPermonth(month,branch) {
    try {
      let gasPrice=await this.gasPrice();
      const taxPay = await tax.findAll({
        where: {
          month: month,
          branch:branch,
          status: 'Submitted'
        },
      });
        const taxPayWithSum = taxPay.map(taxRecord => {
        const totalSum = (taxRecord.transport*gasPrice) + taxRecord.house + taxRecord.salary + taxRecord.benefit;
        const totalTax=this.calculateTax(totalSum);
        const netPay=totalSum-totalTax;
        return {
          ...taxRecord.toJSON(),
          totalSum: totalSum,
          totalTax:totalTax,
          netPay:netPay
        };
      });
      return taxPayWithSum;
    } catch (error) {
      throw new AppError('Error occurred while fetching submitted branches.', 500);
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

  calculateTax=(income)=> {
    let taxRate;
    let taxAmount;
    switch (true) {
      case income <= 600:
        taxRate = 0;
        break;
      case income <= 1650:
        taxRate = 0.1;
        break;
      case income <= 3200:
        taxRate = 0.15;
        break;
      case income <= 5250:
        taxRate = 0.20;
        break;
      case income <= 7800:
        taxRate = 0.25;
        break;
      case income <= 10900:
        taxRate = 0.30;
        break;
      default:
        taxRate = 0.35;
    }
    
    taxAmount = income * taxRate;
    return taxAmount;
  }

}

module.exports = TaxService;