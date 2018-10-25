module.exports = {
	get: {
		async index(ctx, next) {
			ctx.body = '333';
		}
	},
	post: {
		async index3() {

		}
	}
}