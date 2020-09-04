const router = require('express').Router();

router.get("/",(req,res)=>{
    res.render("dashboard",{buyer:true});
});

module.exports = router;