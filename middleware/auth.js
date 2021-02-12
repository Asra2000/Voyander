var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    
    res.redirect('/login?failed=true');
}

module.exports = middlewareObj;