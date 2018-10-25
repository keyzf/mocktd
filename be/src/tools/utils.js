export async function water(...args) {
    let index = 0;
    let result = null;
    const results = [];
    while(true) {
        const fn = args[index];
        if (fn) {
            result = await fn(result, results);
            results.push(result);
            if (['create', 'update', 'delete'].includes(fn.name)) {
            }
        } else {
            return result;
        }
        index++;
    }
}