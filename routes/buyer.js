const router = require('express').Router();
const Products=require("../models/Product");
const Order=require("../models/Order");
const {ensureGuest,ensureAuthenticated,ensureSeller,ensureBuyer} = require('../libs/auth');
const User = require('../models/User');

router.get("/",ensureAuthenticated,ensureBuyer,(req,res)=>{
    Products.find({},(err,products)=>{
        Order.findOne({buyer:req.user._id},(err,orders)=>{
            if(err) throw err;
        res.render("dashboard",{buyer:true,products:products,orders:orders,user:req.user});
        });
    });
   
});

router.get("/orders",ensureAuthenticated,ensureBuyer,(req,res)=>{
    let user=req.user;
    Order.findOne({buyer:user._id},(err,o)=>{
        if(err) throw err;
        //console.log(o.order[0].length);
        res.render("trackOrders",{orders:o});
    });
}); 

module.exports = router;