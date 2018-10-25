/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */

module.exports = {
  port: 3009,
  database: {
    // port: 3000,
    connection: {
      database: '',
      username: '',
      password: '',
    },
    extra: {
      host: '127.0.0.1',
      //default sqlite but suggest mysql in production
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
      },
    },
  },
  mail: {
    sparkpost: {
      api: 'sparpost api',
      options: {
        sandbox: false,
      },
    },
    from: 'sender email name',
  },
};
