const db = require("../model/db");
const AppError = require("../utils/appError");
const EmployeeService = require('./employee-service');
const { calculateTax, calculateTotalIncome } = require("../utils/calculat-Tax");

const tax = db.tax_monthly;
const get_branch = db.branches;
const gas_price = db.gas_prices;

class TaxService {
  constructor() {
    this.employeeService = new EmployeeService();
  }

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
      throw new AppError('Error occurred while fetching branches.', 500);
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
        const totalSum = calculateTotalIncome(
          taxRecord.salary,
          taxRecord.house,
          taxRecord.transport,
          taxRecord.benefit
        );
        const totalTax = calculateTax(totalSum);
        const netPay = totalSum - totalTax;

        return {
          ...taxRecord.toJSON(),
          totalSum: totalSum,
          totalTax: totalTax,
          netPay: netPay
        };
      });

      return taxPayWithSum;
    } catch (error) {
      throw new AppError('Error occurred while fetching tax information.', 500);
    }
  }

  async getTaxInfoByBranchPermonth(month, branch = null) {
    try {
      const whereCondition = {
        month: month,
        status: 'Submitted'
      };

      if (branch) {
        whereCondition.branch = branch;
      }

      const taxPay = await tax.findAll({
        where: whereCondition
      });

      const taxPayWithSum = taxPay.map(taxRecord => {
        const totalSum = calculateTotalIncome(
          taxRecord.salary,
          taxRecord.house,
          taxRecord.transport,
          taxRecord.benefit
        );
        const totalTax = calculateTax(totalSum);
        const netPay = totalSum - totalTax;

        return {
          ...taxRecord.toJSON(),
          totalSum: totalSum,
          totalTax: totalTax,
          netPay: netPay
        };
      });

      return taxPayWithSum;
    } catch (error) {
      throw new AppError('Error occurred while fetching tax information.', 500);
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

      return data ? data.price : 0;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = TaxService;
