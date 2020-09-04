const router = require('express').Router();
const Product = require('../models/Product');
const {ensureGuest,ensureAuthenticated,ensureSeller,ensureBuyer} = require('../libs/auth');
router.get("/", ensureSeller,ensureAuthenticated,(req, res) => {
    Product.find({seller:req.user._id},(err,products)=>{
        //console.log(products);
        var user=req.user;
        products.reverse();
        res.render("dashboard", {
            buyer: false,
            user:user,
            products:products
        });
    });
    
});

router.get('/add',ensureSeller,ensureAuthenticated, (req, res) => {
    res.render("proAdd");
});

router.post("/add", async(req, res) => {
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
    //console.log(id);
    Product.findOne({
        id: id
    }, (err, product) => {
        if (err) throw err;
        res.render("editPro", {
            product: product
        });
    });

});
router.post("/edit/:id",ensureSeller,(req,res)=>{
    //console.log(req.params);
    let id = req.params.id;
    //console.log(id);
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
    // console.log(req.body);
    // res.send("done");
});
module.exports = router;