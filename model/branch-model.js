module.exports = (sequelize, Sequelize) => {
  const Branches = sequelize.define("Branches", {
 
    name : {
      type: Sequelize.STRING,
      
    },
    list_order: {
      type: Sequelize.STRING,
      
    },
 
    fc_code: {
      type: Sequelize.STRING,
      
    }, telephone: {
      type: Sequelize.STRING,
      
    },bank_id: {
      type: Sequelize.STRING,
      
    }, branch_category_id: {
      type: Sequelize.STRING,
      
    }, tag_code: {
      type: Sequelize.STRING,
      
    }, region: {
      type: Sequelize.STRING,
    }, 
    createdAt: {
      type: Sequelize.STRING,
    },  modified: {
      type: Sequelize.STRING,
    }, sp_region_id: {
      type: Sequelize.STRING,
    },  district_name: {
      type: Sequelize.STRING,
    },  city: {
      type: Sequelize.STRING,
    },  zone_sub_city: {
      type: Sequelize.STRING,
    },  location_building_name: {
      type: Sequelize.STRING,
    },  date_opened: {
      type: Sequelize.STRING,
    },  type_of_branch: {
      type: Sequelize.STRING,
    },  branch_grade: {
      type: Sequelize.STRING,
    },  working_hour: {
      type: Sequelize.STRING,
    },  branch_manager_name: {
      type: Sequelize.STRING,
    },  phone_number: {
      type: Sequelize.STRING,
    },  manager_phone: {
      type: Sequelize.STRING,
    }, working_region: {
      type: Sequelize.STRING,
    },  contact_person: {
      type: Sequelize.STRING,
    }, 
  },
  {
    sequelize,
    modelName: 'branches',
    timestamps: false, // Exclude createdAt and updatedAt columns
  }
  );

  return Branches;
};