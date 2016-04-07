var assert = require('assert');
var WebSocket = require('ws');
var expect = require('chai').expect;

function onOpen(evt){
  console.log("CONNECTION READY");
  ws.ping();
}

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});

describe('Server Connection', function() {
  describe('Client', function () {
    it('should be able to connect to the Plurilock server', function (done) {
      // var ws = new WebSocket('ws://btdemo.plurilock.com:8095');
      var ws = new WebSocket('ws://btdemo.plurilock.com:8095');
      ws.onopen = function(){
        console.log("CONNECTION TO PLURILOCK MADE.")
        done()
      }
    });
    it('should be able to send stringifed data to the Plurilock server', function () {
      //    var data = {
      //     "btClientType": "iOS",
      //     "btClientVersion":"1.0",
      //     "userID":"Bruce",
      //     "domain":"team2",
      //     "data":callback
        
      // ws.on('open', function open() {
      //   ws.send('something');
      // });
    });
  });
});
