var assert = require('assert');
var WebSocket = require('ws');

describe('Server Connection', function() {
  describe('Client', function () {
    it('should be able to reach the Plurilock server', function (done) {
      var ws = new WebSocket('ws://btdemo.plurilock.com:8095');
      ws.onopen = function() {
        ws.ping();
        done();
      }
    });
    
    it('should be able to connect to the Plurilock server', function (done) {
      var ws = new WebSocket('ws://btdemo.plurilock.com:8095');
      ws.onopen = function() {
        ws.send("data");
        done();
      }
    });
    it('should be able to send stringifed data to the Plurilock server', function (done) {
      var ws = new WebSocket('ws://btdemo.plurilock.com:8095');
      var data = {
        "btClientType": "iOS",
        "btClientVersion":"1.0",
        "userID":"Bruce",
        "domain":"team2"
      }

      ws.onopen = function() {
        ws.send(JSON.stringify(data));
        done()
      }   
    });

    it('should be able to receive lockout message from Plurilock server', function (done) {
      var ws = new WebSocket('ws://btdemo.plurilock.com:8095');

      ws.onopen = function() {
        done();
      }   
      ws.onmessage = function(e) {
        if (e.data.indexOf("lock") > 0) {
          pass();
        }
      }
    });
  });
});
