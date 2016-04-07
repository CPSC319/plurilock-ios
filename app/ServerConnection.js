import {AlertIOS} from 'react-native'
import DeviceInfo from 'react-native-device-info'
var ws = new WebSocket('ws://btdemo.plurilock.com:8095')

ws.onopen = () => {
  // connection opened
console.log("CONNECTING TO SERVER")

var deviceData = {
  "btClientType": "iOS",
  "btClientVersion":"1.0",
  "userID":"FinalDemoDeviceInfo",
  "domain":"team2",
  "data":[{"Device UID": DeviceInfo.getUniqueID(),
  "Device Manufacturer": DeviceInfo.getManufacturer(),
  "Device Model": DeviceInfo.getModel(),
          "Device Version": DeviceInfo.getSystemVersion(),
          "App Version": DeviceInfo.getVersion(),
          "Device Name": DeviceInfo.getDeviceName(),
          "Device Locale": DeviceInfo.getDeviceLocale()}]
}
console.log("======================= DEVICE INFO =========================")
console.log("Device Unique ID: " + DeviceInfo.getUniqueID());
console.log("Device Manufacturer: " + DeviceInfo.getManufacturer());
console.log("Device Model: " + DeviceInfo.getModel());
console.log("Device Version: " + DeviceInfo.getSystemVersion());
console.log("App Version: " + DeviceInfo.getVersion());
console.log("Device Name: " + DeviceInfo.getDeviceName());
console.log("Device Locale: " + DeviceInfo.getDeviceLocale());
console.log("======================= END DEVICE INFO =========================")

  ws.send(JSON.stringify(deviceData));

};

 ws.onmessage = (e) => {
   // a message was received
   console.log(e.data);
   if (e.data.indexOf("lock") > 0) {

     if (Math.random() < 0.1) {
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
