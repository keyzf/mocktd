var Redis = require('ioredis');
var redis = new Redis({
  port: 6379,          // Redis port
  host: '47.100.101.70',   // Redis host
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'rongping.lrp',
});

redis.set('foo', 'bar');
redis.get('foo', function (err, result) {
  console.log(result);
});
