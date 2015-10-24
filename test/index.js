var assert = require('assert');
var request = require('supertest');
var app = require('../nyaa');

describe('PUT /bluetooth', function() {
  it('should be success', function(done) {
    request(app)
      .put('/bluetooth')
      .send({
        identifier: "E9248807-978B-C794-99A3-FD24F65B0F98", // 宠物设备标识
        rssi : -92, // 信号强度
        lng : 121.148272, // 经度
        lat : 30.158372, // 纬度
        timestamp : 1445673908 // 时间戳，精确到秒
      })
      .expect(200, function(err, res) {
        done();
      });
  });

  it('should be success', function(done) {
    request(app)
      .get('/bluetooth?token=' + 'dwajk')
      .expect(200, function(err, res) {
        console.log(res.body);
        done();
      });
  });
});

