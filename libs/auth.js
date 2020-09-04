module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/auth/login');
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated())
      res.redirect('/');
    else
      return next();
  },
  ensureBuyer:(req,res,next)=>{
    let user=req.user;
    if(user.type=="Buyer")
      return next();
    res.redirect("/");
  },
  ensureSeller:(req,res,next)=>{
    let user=req.user;
    if(!(user.type=="Buyer"))
      return next();
    res.redirect("/");
  },
};
