const path = require('path');
const fs = require('fs');
const Strategy = require('passport-local').Strategy;
const db = require('./db');
module.exports = function (passport, router, app) {
    passport.use(new Strategy(
        function(username, password, cb) {
            db.findByUsername(username, function(err, user) {
                if (err) { return cb(err); }
                if (!user) { return cb(null, false); }
                if (user.password != password) { return cb(null, false); }
                return cb(null, user);
            });
    }));
      
    passport.serializeUser(function(user, cb) {
        cb(null, user.id);
    });
      
    passport.deserializeUser(function(id, cb) {
        db.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
    router.get('/auth/login', function(ctx, next){
        ctx.body = fs.readFileSync(path.join(__dirname, 'login.html')).toString();
    });
    router.post('/auth/login',  passport.authenticate('local', { failureRedirect: '/auth/login' }), function(ctx, next) {
        if (ctx.session['success_redirect']) {
            ctx.redirect(ctx.session['success_redirect']);
            ctx.session['success_redirect'] = null;
        } else {
            ctx.redirect('/');
        }
    });
}