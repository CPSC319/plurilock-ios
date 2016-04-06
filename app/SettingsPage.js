"use strict";

import React, {
  SliderIOS,
  ListView,
  View,
  Component,
  StyleSheet,
  TouchableOpacity,
  Text,
  PanResponder,
  AlertIOS
} from "react-native";

import {GestureLogger} from 'NativeModules';
import ServerConnection from './ServerConnection';
import Button from 'react-native-button';
var YourRouter = require('./route.js');

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    marginTop: 20
  },
  textView: {
    marginLeft: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '100',
    color: 'black',
  },
  slider: {
    height: 20,
    width: 325,
    margin: 6
  },
  button: {
    marginTop: 20,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'green'
  },

  buttontext: {
    color: 'white',
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  }
});

export default class SettingsPage extends Component {

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

       ServerConnection.send(JSON.stringify(data));
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



  constructor() {
    super();
    var testData = [{settingName:"Range", type:"Slider"}, {settingName:"Help", type:"Text"}, {settingName:"Acknowledgements", type:"Text"}, {settingName:"", type:"Button"}]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData),
      value: 0,
    };
  }

  renderRow(rowData, sectionID, rowID) {
    if (rowData.type == "Slider") {
      return (
        <View style={styles.wrapper}>
          <View style={styles.textView}>
            <Text>{rowData.settingName}</Text>
            <SliderIOS style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              onValueChange={(value) => this.setState({value: value})}
            />
          </View>
        </View>
      );
    } else if (rowData.type == "Button") {
      return (
        <TouchableOpacity style={styles.button}>
          <Button
          style={styles.buttontext}
          onPress={() => {
            //let route = YourRouter.getHomeRoute();
            //this.props.navigator.push(route);
          }}>
            Logout
          </Button>
        </TouchableOpacity>
      );

    } else {
      return (
        <View style={styles.wrapper}>
          <View style={styles.textView}>
            <Text>{rowData.settingName}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  }
}
