const router = require('express').Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Order = require("../models/Order");
const Shipping=require("../models/Shipping");
const {
	ensureGuest,
	ensureAuthenticated
} = require('../libs/auth');


router.get('/login', ensureGuest, (req, res) => {
	res.render("login",{message:req.flash("error"),msg:req.flash("success")});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: 'login',
		failureFlash: true
	})(req, res, next);
});

router.get('/register', ensureGuest, (req, res) => {
	res.render('register');
});


router.post('/register', (req, res) => {
	let errors = [];
	if (req.body.password != req.body.rpassword)
		errors.push({
			text: 'Password do not match'
		});
	if (req.body.password.length < 4)
		errors.push({
			text: 'Password must be at least 4 characters!'
		});
	// verify if errors exist
	if (errors.length > 0) {
		res.render('register', {
			errors,
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			rpassword: req.body.rpassword
		});
	} else {
		User.findOne({
				email: req.body.email
			})
			.then(user => {
				if (user) {
					errors.push({
						text: 'Email already exist!'
					});
					res.render('register', {
						errors,
						name: '',
						email: '',
						password: '',
						rpassword: ''
					});
					
				} 
		User.findOne({username:req.body.username})
				.then(user=>{
					if(user){
						errors.push({
							text:"User name already exist"
						});
						res.render('register', {
							errors,
							name: '',
							email: '',
							password: '',
							rpassword: ''
						});
					}
					else {
						const newUser = new User({
							name: req.body.name,
							email: req.body.email,
							password: req.body.password,
							type:req.body.type,
							username:req.body.username,
						});
		
						bcrypt.genSalt(10, (err, salt) => {
							bcrypt.hash(newUser.password, salt, (err, hash) => {
								if (err) throw err;
								newUser.password = hash;
								newUser.save()
									.then(user => {
										if(newUser.type=="Buyer"){
											//console.log("buyer");
											let newOrder=new Order();
											newOrder.buyer=user._id;
											newOrder.save(err=>{
												if(err) throw err;
											});
				
										}
										else{
											let newShip=new Shipping();
											newShip.seller=user._id;
											newShip.save(err=>{
												if(err) throw err;
											});
										}
	
										//console.log(`User ${user._id} register!`);
										req.flash("success","you have successfully registered ! Login Now ");
										res.redirect('login');
	
									})
									.catch(err => console.log(err));
							});
						});
					}
				});
				
			});
	}
});




router.get('/logout', ensureAuthenticated, (req, res) => {
	req.logOut();
	req.flash('success', "You have logged out");
	res.redirect("/auth/login");
});



module.exports = router;