import qs from 'qs';
const axios = require('axios');
export function ajax(config) {
    return new Promise(function (resolve, reject) {
        axios(Object.assign({
            baseURL: '/api/',
            transformRequest: [function (data) {
                return data;
            }],
            transformResponse: [function (data) {
                return data;
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
            // params: {
            //     ID: 12345
            // },
            // paramsSerializer: function(params) {
            //     return Qs.stringify(params, { arrayFormat: 'brackets' })
            // },
            // data: {
            //     firstName: 'Fred'
            // },
            timeout: 300000,
            withCredentials: false, // default
            // adapter: function(config) {
            //     /* ... */
            // },
            responseType: 'json', // default
            responseEncoding: 'utf8', // default
            // xsrfCookieName: 'XSRF-TOKEN', // default
            // xsrfHeaderName: 'X-XSRF-TOKEN', // default
            maxContentLength: 2000,
            // validateStatus(status) {
            //     return status >= 200 && status < 300; // default
            // },
            maxRedirects: 15, // default
            // socketPath: null, // default
            // httpAgent: new http.Agent({ keepAlive: true }),
            // httpsAgent: new https.Agent({ keepAlive: true }),
            // cancelToken: new CancelToken(function(cancel) {})
        }, config)).then(function (data) {
            data = data.data;
            if (data.code == 200) {
                resolve(data.data);
            } else {
                reject(data);
            }
        }, function () {
            reject('服务器访问出错');
        });
    });
}
export function get(url, config) {
    config = Object.assign({
        params: {},
    }, config);
    return ajax({
        url,
        method: 'get',
        params: config.params,
    });
}
export function post(url, config) {
    config = Object.assign({
        data: {},
    }, config);
    return ajax({
        url,
        method: 'post',
        data: qs.stringify(config.data),
    });
}

