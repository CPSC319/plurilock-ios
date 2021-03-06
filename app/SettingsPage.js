"use strict";

import React, {
  SliderIOS,
  ListView,
  View,
  NetInfo,
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
import Queue from './Queue';
var q = new Queue.Queue();
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
         "userID":username+"_Touch",
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
        return true;
      },
    });
  }



  constructor(props) {
    super(props);
    var testData = [{settingName:"Range", type:"Slider"}, {settingName:"", type:"Button"}]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData),
      value: 0,
    };
    this.renderRow = this.renderRow.bind(this)
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
            this.props.parentProps.navigator.replace({id: 'login'});
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
