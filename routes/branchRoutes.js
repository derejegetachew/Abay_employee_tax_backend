
    const branch = require("../controller/branchController.js");
    const validateToken=require('../utils/validateTokenHandeler.js');
    var router = require("express").Router();
     // Creating a new Tutorial
     router.get("/",branch.findAll);
     router.get("/addis/region",branch.findByRegion);
     router.get("/fc-code",branch.getFcCodeByBranchId);
     router.get("/:id",branch.findOne);

    module.exports=router;