const vm = require('vm');
const util = require('util');
module.exports = async function(ctx, type, content) {
    if (type == 1) {
        ctx.body = content;
    } else {
        const sandbox = { ctx, a: 1 };
        vm.createContext(sandbox);
        vm.runInNewContext(content, sandbox);
    }
}