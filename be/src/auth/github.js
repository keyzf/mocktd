const GitHubStrategy = require('passport-github').Strategy;
module.exports = function (passport, router) {
    passport.use(
        new GitHubStrategy({
            clientID: '',
            clientSecret: ''
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    ));
    router.get('/auth/login', async function (ctx, next) {
      await passport.authenticate('github')(ctx, next);
    });
    router.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/auth/login' }),
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