module.exports = {
    get: {
        getUserInfo(ctx, next) {
            return ctx.session.passport.user;
        }
    }
}