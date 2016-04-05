/*
*/

'use strict';
import React, {
  Image,
  MapView,
  PropTypes,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Component,
  Dimensions,
  PanResponder,
} from 'react-native';

const {height, width} = Dimensions.get('window')

var region_init = {
  latitude: 49.261202,
  longitude: -123.248687,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
import {GestureLogger} from 'NativeModules'
let mySelf

var ws = new WebSocket('ws://btdemo.plurilock.com:8095')

ws.onopen = () => {
  // connection opened
console.log("CONNECTING TO SERVER")
};

 ws.onmessage = (e) => {
   // a message was received
   console.log(e.data);
   if (e.data.indexOf("lock") > 0) {
     console.log("OMG LOCK DEVICE!")
     AlertIOS.alert(
        'Intruder Detected',
        'OMG LOCK DEVICE!!'
      );
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
export default class MapviewPage extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
      },
      onPanResponderMove: (evt, gestureState) => {
      GestureLogger.retrievePanGestureData("BioAuthiOS", new Date().toString(), gestureState, (callback) => {
       console.log("sending to server: ",callback)

       var data = {
         "btClientType": "iOS",
         "btClientVersion":"1.0",
         "userID":"Bruce",
         "domain":"team2",
         "data":callback
       }

       ws.send(JSON.stringify(data));
         })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    });
  }
  constructor(props) {
    super(props);
    mySelf = this
    this.state = {
      isFirstLoad: true,
      mapRegion: region_init,
      mapRegionInput: undefined,
      annotations: [],
    };
  }


  render() {
    return(
      <View
        style={styles.container}
        {...this._panResponder.panHandlers}
      >

       <MapView
          style={styles.map}
          onRegionChange={this._onRegionChange}
          onRegionChangeComplete={this._onRegionChangeComplete}
          region={this.state.mapRegion}
          annotations={this.state.annotations}
          showsUserLocation={true}
          followUserLocation={true}
        />

      </View>
    );
  }

  _getAnnotations(region) {
    return [{
      longitude: region.longitude,
      latitude: region.latitude,
      title: 'Bank of Montreal',
    },
    {
      longitude: region.longitude+0.001,
      latitude: region.latitude-0.001,
      title: 'TD Canada Trust',
    },
    {
      longitude: region.longitude+0.002,
      latitude: region.latitude+0.005,
      title: 'Royal Bank of Canada',
    } ];
  }

  _onRegionChange(region) {

    mySelf.setState({
      mapRegionInput: region,
    });
  }

  _onRegionChangeComplete(region) {
    if (mySelf.state.isFirstLoad) {
      mySelf.setState({
        mapRegionInput: region,
        annotations: mySelf._getAnnotations(region),
        isFirstLoad: false,
      });
    }
  }

  _onRegionInputChanged(region) {
    mySelf.setState({
      mapRegion: region,
      mapRegionInput: region,
      annotations: mySelf._getAnnotations(region),
    });
  }


}
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginBottom: 4,
  },
  map: {
    padding: 1,
    height: height,
    marginTop: 10,
    borderColor: '#000000',
  },
});
