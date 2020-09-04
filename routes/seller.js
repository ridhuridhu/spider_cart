const router = require('express').Router();
const Product = require('../models/Product');

router.get("/", (req, res) => {
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

router.get('/add', (req, res) => {
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
    await newPro.save(err => {
        if (err) throw err;
        let data={
            done:true,
            url:"/"
        };
        res.send(data);
    });
});

router.get("/show/:id", (req, res) => {
    let id = req.params.id;
    //console.log(id);
    Product.findOne({
        id: id
    }, (err, product) => {
        if (err) throw err;
        res.render("showPro", {
            product: product
        });
    });

});
module.exports = router;