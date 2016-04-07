import {AlertIOS} from 'react-native'
var ws = new WebSocket('ws://btdemo.plurilock.com:8095')
       
ws.onopen = () => {
  // connection opened
console.log("CONNECTING TO SERVER")
};

 ws.onmessage = (e) => {
   // a message was received
   console.log(e.data);
   if (e.data.indexOf("lock") > 0) {

     if (Math.random() < 0.2) {
       console.log("LOCK DEVICE!")
       AlertIOS.alert(
          'Intruder Detected',
          'LOCK DEVICE!!'
        );
     }
   }
};

   ws.onerror = (e) => {
     // an error occurred
     console.log(e.message);
};

   ws.onclose = (e) => {
     // connection closed
     console.log(e.code, e.reason);
};

module.exports = ws
