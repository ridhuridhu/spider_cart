const router = require('express').Router();
const Product = require('../models/Product');
const User=require("../models/User");
const Shipping=require("../models/Shipping");
const {ensureGuest,ensureAuthenticated,ensureSeller,ensureBuyer} = require('../libs/auth');
router.get("/", ensureSeller,ensureAuthenticated,(req, res) => {
    Product.find({seller:req.user._id},(err,products)=>{
        if(err) throw err;
        Shipping.findOne({seller:req.user._id},(err,s)=>{
            if(err) throw err;
            var user=req.user;
            products.reverse();
            s.shipping.reverse();
            res.render("dashboard", {
                buyer: false,
                user:user,
                products:products,
                s:s
            });
        });
    });
    
});

router.get("/shipping",ensureAuthenticated,ensureSeller,(req,res)=>{
    let user=req.user;
    Shipping.findOne({seller:user._id},(err,s)=>{
        if(err) throw err;
        var i=s.shipping[s.shipping.length-1];
        console.log((i.date));
        res.render("trackOrders",{s:s});
    });
});

router.post("/userData",(req,res)=>{
    let id=(req.body.id);
    User.findById(id,(err,user)=>{
        if(err) throw err;
        res.send(user);
    });


});

router.get('/add',ensureSeller,ensureAuthenticated, (req, res) => {
    res.render("proAdd");
});

router.post("/add",ensureAuthenticated, async(req, res) => {
    let newPro = new Product();
    newPro.title = req.body.title;
    newPro.caption = req.body.cap;
    let arrayLinks = req.body.imagesLink;
    arrayLinks.map(link => {
        newPro.images.push(link);
    });
    newPro.seller = req.user._id;
    newPro.price=req.body.price;
    newPro.quantity=req.body.quantity;
    await newPro.save(err => {
        if (err) throw err;
        let data={
            done:true,
            url:"/"
        };
        res.send(data);
    });
});

router.get("/edit/:id", ensureSeller,(req, res) => {
    let id = req.params.id;
    ////console.log(id);
    Product.findOne({
        id: id
    }, (err, product) => {
        if (err) throw err;
        res.render("editPro", {
            product: product
        });
    });

});
router.get("/insights",ensureSeller,async(req,res)=>{
    let user=req.user;
    let date=[0,0,0,0,0,0,0];
   await Shipping.findOne({seller:user._id},(err,s)=>{
        if(err) throw err;
        for(var a=0;a<s.shipping.length;a++){
            var i=s.shipping[a];
            var currentDate=new Date();
            var k=new Date(currentDate); 
            var j=new Date(i.date);
            var d=(k.getDate()-j.getDate());
            if(d>0 && d<=7){
                
                    date[d]+=s.shipping[a].quantity;
                
            }
        
        }
        //console.log(d);
        // console.log(j.getDate(),k.getDate());
        // //console.log(new Date(i.date).getDay());
        // console.log(date)
        res.render("insights",{date:date});
    });

});
router.post("/edit/:id",ensureSeller,(req,res)=>{
    ////console.log(req.params);
    let id = req.params.id;
    ////console.log(id);
    Product.findOne({id: id},async (err, product) => {
        if (err) throw err;
        product.title = req.body.title;
        product.caption = req.body.cap;
        let arrayLinks = req.body.imagesEditLink;
        product.images=[];
        arrayLinks.map(link => {
            product.images.push(link);
        });
        product.seller = req.user._id;
        product.price=req.body.price;
        product.quantity=req.body.quantity;
        await product.save(err => {
            if (err) throw err;
            let data={
                done:true,
                url:"/"
            };
            res.send(data);
        });
       
    });
    // //console.log(req.body);
    // res.send("done");
});
module.exports = router;