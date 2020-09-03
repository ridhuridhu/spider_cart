const router = require('express').Router();
const multer = require("multer");
const path = require('path');
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

router.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

//image upload
router.post('/profile', upload.single('avatar'), function (req, res, next) {
    res.send(req.file);
});

//search
router.post("/search/:q", async (req, res) => {
    let q = req.params.q;
    //console.log(q);
    let div = "<div class='searchList'>";
    await Product.find({}, (err, products) => {
        //console.log(products.length);
        if (err) throw err;
        products.map(p => {
            let query = (p.title).search(q);
            //console.log(p.title,query);
            if (query >= 0) {
                div += `<a class="list" href="/product/${p.id}">${p.title}  </a> `;
                //console.log(div);
            }
        });
    });
    //console.log(req.params);
    div += "</div>";
    res.send(div);
});
module.exports = router;