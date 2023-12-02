const db = require("../model/db");
const AppError = require("../utils/appError");
const tax = db.tax_monthly;
const get_branch = db.branches;
const Op = db.Sequelize.Op;
class TaxService {
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

}

module.exports = TaxService;