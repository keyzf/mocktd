var GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports = function (passport, router, app) {
    passport.use(new GoogleStrategy({
        clientID: '',
        clientSecret: '',
        callbackURL: ""
      },
      function(accessToken, refreshToken, profile, cb) {
          return cb(null, profile);
      }
    ));
    router.get('/auth/login', async function (ctx, next) {
      await passport.authenticate('google', { scope: ['profile'] })(ctx, next);
    });
    router.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/auth/login' }),
        function (ctx, next) {
            if (ctx.session['success_redirect']) {
                ctx.redirect(ctx.session['success_redirect']);
                ctx.session['success_redirect'] = null;
            } else {
                ctx.redirect('/');
            }
        }
    );
}