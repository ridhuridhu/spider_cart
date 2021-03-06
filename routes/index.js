const router = require('express').Router();
const multer = require("multer");
const {
    ensureGuest,
    ensureAuthenticated,
    ensureSeller,
    ensureBuyer
} = require('../libs/auth');
const Product = require("../models/Product");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Shipping=require("../models/Shipping");
const path = require('path');
const moment = require("moment");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});

// cloudinary
const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});


console.log(process.env.CLOUD_NAME);
router.get('/', ensureAuthenticated, (req, res) => {
    let user = req.user;
    if (user.type == "Buyer") {
        res.redirect("/buyer");
    } else {
        res.redirect("/seller");
    }
    //res.render('index', {user: req.user});
});

//image upload
// router.post('/profile', ensureAuthenticated,upload.single('avatar'), function (req, res, next) {
//     const file=req.file;
//     console.log(file);
//     cloudinary.uploader.upload(fi)

// });

//search
router.post("/search/:q",ensureAuthenticated, async (req, res) => {
    let q = req.params.q;
    ////console.log(q);
    let div = "<ul> ";
    await Product.find({}, (err, products) => {
        ////console.log(products.length);
        if (err) throw err;
        products.map(p => {
            let query = (p.title).search(q);
            ////console.log(p.title,query);
            if (query >= 0) {
                div += `<li class="list-group-item"><a class="searchList  " href="/show/${p.id}">${p.title}  </a></li>`;
                ////console.log(div);
            }
            else{
                let q1=((p.title).toUpperCase()).search(q.toUpperCase());
                    if(q1>=0){
                        div += `<li class="list-group-item"><a class="searchList  " href="/show/${p.id}">${p.title}  </a></li>`;
                    }
                
            }
        });
    });
    div += "</ul>";
    res.send(div);
});
router.get("/show/:id",ensureAuthenticated, (req, res) => {
    Product.findOne({
        id: req.params.id
    }, (err, product) => {
        if (err) throw err;
        res.render("showPro", ({
            user: req.user,
            product
        }));
    });
});
router.get("/cart",ensureAuthenticated, async (req, res) => {
    await Cart.findOne({
        user: req.user._id
    }, (err, cart) => {
        if (err) throw err;
        ////console.log(cart);
        res.render("cart", {
            user: req.user,
            cart: cart
        });
    });

});

router.get("/cart/show/:id",ensureAuthenticated, (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) throw err;
        res.render("showPro", ({
            user: req.user,
            product: product
        }));

    });
});
router.post("/cart/add/:id",ensureAuthenticated, async (req, res) => {
    let id = req.params.id;
    let quantity=req.body.quantity;
    //console.log(quantity);
    await Product.findOne({
        id: id
    }, async (err, product) => {
        if (err) throw err;
        await Cart.findOne({
            user: req.user._id
        }, async (err, cart) => {
            if (err) throw err;
            if (!(cart)) {
                let newCart = new Cart();
                newCart.user = req.user._id;
                newCart.items.push({
                    item: product._id,
                    title: product.title,
                    price: product.price,
                    quantity: quantity,
                    data: new Date()
                });
                newCart.total = parseInt(product.price);
                await newCart.save((err) => {
                    if (err) throw err;
                    //res.send("new cart added");
                });
            } else {
                let t = 0;
                ////console.log(cart.id);
                for (let i = 0; i < cart.items.length; i++) {
                    if (JSON.stringify(cart.items[i].item) == JSON.stringify(product._id)) {
                        (cart.items[i].quantity)+=parseInt(quantity);
                        (cart.total) += parseInt(product.price);
                        await cart.save((err) => {
                            if (err) throw err;
                            //res.send("quantity updated");
                        });
                    } else {
                        t++;
                    }
                }
                if (t == cart.items.length) {
                    cart.items.push({
                        item: product._id,
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        data: new Date()
                    });
                    (cart.total) += parseInt(product.price);
                    await cart.save((err) => {
                        if (err) throw err;
                        // res.send("new item added to cart");
                    });
                }
            }
        });
    });
    ////console.log(moment().format("LLLL"));
    res.send("added");
});

router.post("/cart/remove/",ensureAuthenticated, (req, res) => {
    let id = req.body.id;
    //console.log(id);
    Cart.findOne({
        user: req.user._id
    }, (err, cart) => {
        if (err) throw err;
        for (let i = 0; i < cart.items.length; i++) {
            //console.log(cart.items[i].item===id);
            if (JSON.stringify(cart.items[i].item) == JSON.stringify(id)) {
                ////console.log("object");
                cart.total -=parseInt(( cart.items[i].price)*cart.items[i].quantity);
                cart.items.splice(i, 1);
                cart.save(err => {
                    if (err) throw err;
                    res.send("done");
                });

            }
        }

    });



    //res.send("removed");

});

router.get("/cart/order",ensureAuthenticated,async(req,res)=>{
    let user=req.user;
  await Cart.findOne({user:user._id},async(err,cart)=>{
        if(err) throw err;
        let items=[];
        let itemsShip=[];
        let buyer=user._id;
        ////console.log(cart.items);
        for(let i=0;i<cart.items.length;i++){
            var item=cart.items[i].item;
           await Product.findById(cart.items[i].item,async(err,pro)=>{
                if(err) throw err;
                var seller=pro.seller;
                var title=cart.items[i].title;
                var price=cart.items[i].price;
                var quantity=parseInt(cart.items[i].quantity);
                var date=new Date();
                console.log(date)
                pro.quantity--;
                var x={
                    item,
                    title,
                    price,
                    quantity,
                    seller,
                    date,
                };
                var y={ 
                    item,
                    title,
                    price,
                    quantity,
                    buyer,
                    date,
                };
                items.push(x);
                itemsShip.push(y);
                await Shipping.findOne({seller:seller},(err,S)=>{
                    S.shipping.push(y);
                    S.save(err=>{
                        if(err) throw err;
                    });
                });
               await pro.save(err=>{
                    if(err) throw err;
                });
            });
        }

        for(var i=0;i<items.length;i++){
            await Order.findOne({buyer:user._id},(err,O)=>{
                O.order.push(items[i]);
                O.save(err=>{
                    if(err) throw err;
    
                });
            });

        }
        cart.items=[];
        cart.total=0;
        cart.save(err=>{
            if(err) throw err;

        });

    }); 
    res.redirect("/cart");
});
module.exports = router;