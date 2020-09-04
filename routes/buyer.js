const router = require('express').Router();
const {ensureGuest,ensureAuthenticated,ensureSeller,ensureBuyer} = require('../libs/auth');

router.get("/",(req,res)=>{
    res.render("dashboard",{buyer:true});
});

module.exports = router;