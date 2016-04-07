// 'use strict';

var _reactNativeDeviceInfo = require('react-native-device-info');

var _reactNativeDeviceInfo2 = _interopRequireDefault(_reactNativeDeviceInfo);

var _reactNative = require('react-native');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = new WebSocket('ws://btdemo.plurilock.com:8095');

ws.onopen = function () {
  // connection opened
  console.log("CONNECTING TO SERVER");

  var deviceData = {
    "btClientType": "iOS",
    "btClientVersion": "1.0",
    "userID": "Bruce",
    "domain": "team2",
    "data": [{ "Device UID": _reactNativeDeviceInfo2.default.getUniqueID(),
      "Device Manufacturer": _reactNativeDeviceInfo2.default.getManufacturer(),
      "Device Model": _reactNativeDeviceInfo2.default.getModel(),
      "Device Version": _reactNativeDeviceInfo2.default.getSystemVersion(),
      "App Version": _reactNativeDeviceInfo2.default.getVersion(),
      "Device Name": _reactNativeDeviceInfo2.default.getDeviceName(),
      "Device Locale": _reactNativeDeviceInfo2.default.getDeviceLocale() }]
  };

  console.log("Device Unique ID: " + _reactNativeDeviceInfo2.default.getUniqueID());
  console.log("Device Manufacturer: " + _reactNativeDeviceInfo2.default.getManufacturer());
  console.log("Device Model: " + _reactNativeDeviceInfo2.default.getModel());
  console.log("Device Version: " + _reactNativeDeviceInfo2.default.getSystemVersion());
  console.log("App Version: " + _reactNativeDeviceInfo2.default.getVersion());
  console.log("Device Name: " + _reactNativeDeviceInfo2.default.getDeviceName());
  console.log("Device Locale: " + _reactNativeDeviceInfo2.default.getDeviceLocale());

  ws.send(JSON.stringify(deviceData));
};

ws.onmessage = function (e) {
  // a message was received
  console.log(e.data);
  if (e.data.indexOf("lock") > 0) {

    if (Math.random() < 0.2) {
      console.log("LOCK DEVICE!");
      _reactNative.AlertIOS.alert('Intruder Detected', 'LOCK DEVICE!!');
    }
  }
};

ws.onerror = function (e) {
  // an error occurred
  console.log(e.message);
};

ws.onclose = function (e) {
  // connection closed
  console.log(e.code, e.reason);
};

module.exports = ws;

// import DeviceInfo from "react-native-device-info";
// import {AlertIOS} from 'react-native'
// var ws = new WebSocket('ws://btdemo.plurilock.com:8095')

// ws.onopen = () => {
//   // connection opened
// console.log("CONNECTING TO SERVER")

// var deviceData = {
//   "btClientType": "iOS",
//   "btClientVersion":"1.0",
//   "userID":"Bruce",
//   "domain":"team2",
//   "data":[{"Device UID": DeviceInfo.getUniqueID(),
//   "Device Manufacturer": DeviceInfo.getManufacturer(),
//   "Device Model": DeviceInfo.getModel(),
//           "Device Version": DeviceInfo.getSystemVersion(),
//           "App Version": DeviceInfo.getVersion(),
//           "Device Name": DeviceInfo.getDeviceName(),
//           "Device Locale": DeviceInfo.getDeviceLocale()}]
// }

// console.log("Device Unique ID: " + DeviceInfo.getUniqueID());
// console.log("Device Manufacturer: " + DeviceInfo.getManufacturer());
// console.log("Device Model: " + DeviceInfo.getModel());
// console.log("Device Version: " + DeviceInfo.getSystemVersion());
// console.log("App Version: " + DeviceInfo.getVersion());
// console.log("Device Name: " + DeviceInfo.getDeviceName());
// console.log("Device Locale: " + DeviceInfo.getDeviceLocale());

//   ws.send(JSON.stringify(deviceData));
// };

//  ws.onmessage = (e) => {
//    // a message was received
//    console.log(e.data);
//    if (e.data.indexOf("lock") > 0) {

//      if (Math.random() < 0.2) {
//        console.log("LOCK DEVICE!")
//        AlertIOS.alert(
//           'Intruder Detected',
//           'LOCK DEVICE!!'
//         );
//      }
//    }
// };

//    ws.onerror = (e) => {
//      // an error occurred
//      console.log(e.message);
// };

//    ws.onclose = (e) => {
//      // connection closed
//      console.log(e.code, e.reason);
// };

// module.exports = ws
