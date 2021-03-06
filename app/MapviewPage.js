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
  NetInfo,
  PanResponder,
  AlertIOS
} from 'react-native';

const {height, width} = Dimensions.get('window')

var region_init = {
  latitude: 49.261202,
  longitude: -123.248687,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}
import {GestureLogger} from 'NativeModules'
import ServerConnection from './ServerConnection'
import Queue from './Queue'
var q = new Queue.Queue();
let mySelf

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
        var force = evt.nativeEvent.force
        if (force == null) {
          force = 0
        }

      GestureLogger.retrievePanGestureData("BioAuthiOS", new Date().toString(), gestureState, force, (callback) => {
        console.log("=========TOUCH DATA =========\n")
       console.log(callback)
       console.log("  ")
       console.log("========= END TOUCH DATA =========")
       var username = "TestUser"
       if (this.props.parentProps.username != '') {
         username = this.props.parentProps.username
       }

       var data = {
         "btClientType": "iOS",
         "btClientVersion":"1.0",
         "userID":username+"_MapView",
         "domain":"team2",
         "data":callback
       }
       NetInfo.isConnected.fetch().then(isConnected => {
          if (!isConnected){
            console.log("Caching data for into the queue");
            q.enqueue(data);
          } else {
            while (q.size() > 0){
              console.log("QUEUE SIZE IS "+ q.size());
              var prevData = q.dequeue();
              console.log("Dequeuing from queue. Sending data.")
              ServerConnection.send(JSON.stringify(prevData));
              console.log("Data transmission complete.")
            }
            var errorcode = ServerConnection.send(JSON.stringify(data));
            console.log("Sending data");
            console.log("QUEUE SIZE IS "+ q.size());
            if (errorcode == 1){
              q.enqueue(data);
              console.log("ERROR> QUEING DATA")
            }

          }
       });
         })
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
      },
      onPanResponderTerminate: (evt, gestureState) => {
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return false;
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
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);

        var username = "TestUser"
        if (this.props.parentProps.username != '') {
          username = this.props.parentProps.username
        }

        var mapdata = {
         "btClientType": "iOS",
         "btClientVersion":"1.0",
         "userID":username+"_MapCoords",
         "domain":"team2",
         "data":position["coords"]
        };

        console.log("=========LOCATION DATA =========\n")
       console.log(JSON.stringify(mapdata));
       console.log("  ")
       console.log("========= END LOCATION DATA =========")

       NetInfo.isConnected.fetch().then(isConnected => {
          if (!isConnected){
            console.log("Caching data for into the queue");
            q.enqueue(data);
          } else {
            while (q.size() != 0){
              var prevData = q.dequeue();
              console.log("Dequeuing from queue. Sending data.")
              ServerConnection.send(JSON.stringify(prevData));
              console.log("Data transmission complete.")
            }
            ServerConnection.send(JSON.stringify(mapdata));
            console.log("Sending data");
            console.log("QUEUE SIZE IS "+ q.size());
          }
       });

      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
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
