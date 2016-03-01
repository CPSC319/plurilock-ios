/*
*/

'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  NativeAppEventEmitter,
  AlertIOS,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  PanResponder,
  TextInput
} from 'react-native';

import {GestureLogger} from 'NativeModules'
import Swipeout from 'react-native-swipeout'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    flex: 1,
  },
  table: {
    marginBottom: 50,
  }
});



export default class PanGesturePage extends Component {

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
      const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

      this.state = {
        dataSource: ds.cloneWithRows(this.createRows()),
        text: ""
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
      this.onTextChange = this.onTextChange.bind(this)
    }

    render() {
      return (
          <View style={styles.container}>
          <TextInput
            style={{marginTop: 64, height: 60, borderColor: 'gray', borderWidth: 1}}
            onChangeText={this.onTextChange}
            value={this.state.text}
        />
          <ListView
            style={styles.table}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
          />
          </View>

      );
    }

    renderRow(rowData: string, sectionID: number, rowID: number) {
      let swipeoutBtns = [
        {
          text: "RButton",
          backgroundColor: "red"
        },
        {
          text: "BButton",
          backgroundColor: "blue"
        }
      ]


      return (
        <Swipeout left={swipeoutBtns} right={swipeoutBtns}
          autoClose='true'>
            <View style={styles.row}
              {...this._panResponder.panHandlers}>
              <Text style={styles.text}>
                {rowData + ' - blah blah'}
              </Text>
            </View>
        </Swipeout>
      );
    }

    createRows() {
      var dataBlob = [];
      for (var ii = 0; ii < 50; ii++) {
        dataBlob.push('Row ' + ii);
      }
      return dataBlob;
    }

    onTextChange(text) {

      if (text.length > this.state.text.length) {
        var keyAddedToEnd = true
        for (var i = 0; i< this.state.text.length; i++) {
          if (text[i] != this.state.text[i]) {
            GestureLogger.retrieveKeyData("BioAuthiOS", new Date().toString(), text[i])
            keyAddedToEnd = false
          }
        }

        if (keyAddedToEnd) {
          GestureLogger.retrieveKeyData("BioAuthiOS", new Date().toString(), text[text.length-1])
        }

      }

      this.setState({text})
    }
}
