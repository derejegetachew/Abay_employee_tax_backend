
const people = require("../controller/peopleController.js");
const validateToken=require('../utils/validateTokenHandeler.js');
var router = require("express").Router();
 // Creating a new Tutorial
 router.get("/",people.findAll);
 router.get("/employeedetails",people.employeedetails);
 router.get("/one", people.specificEmployee);
 router.get("/employee",people.findEmployeeBybranch);
 router.get("/tax",people.taxRecordList);
 router.get("/branch/tax",people.getempTaxBybranch);
 router.get("/month/tax",people.getempTaxByMonth);
 router.get("/check/record",people.getNumberOfBranchTaxRecord);
 router.get("/month",people.getUniqueMonth);
 router.get("/taxrecord/status",people.getEmpTaxStatusByMonth);
 router.get("/taxrecord/branch/status",people.getEmpTaxStatusByBranchMonth);
 router.get("/gettax/branch/submited",people.getBranchSubmitedTaxRecord);
 router.get("/taxreport/month",people.gettaxRecordPermonth);
 router.get("/taxreport/branch",people.gettaxRecordByBranchPermonth);
 router.post("/tax",people.TaxRecord);
 router.post("/bulktax",people.BulkTaxRecord);
 router.put("/updatetax",people.updateTaxData);
 router.put("/bulktaxupdate",people.updateBulkTaxData);
 router.put("/tin",people.updateUserTin);
module.exports=router;