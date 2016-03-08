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
export default class MapviewPage extends Component {

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Show visual feedback so the user knows
        // what is happening!

        // gestureState.{x,y}0 will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}

        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        GestureLogger.retrievePanGestureData("BioAuthiOS", new Date().toString(), gestureState)
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
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
          //showsUserLocation={true}
          //followUserLocation={true}
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
