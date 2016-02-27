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
  PanResponder
} from 'react-native';

import {GestureLogger} from 'NativeModules'
import Swipeout from 'react-native-swipeout'

const styles = StyleSheet.create({
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
    flex: 1,
    marginBottom: 50
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
        GestureLogger.testSwiftMethod("Pan Move", gestureState)
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
        dataSource: ds.cloneWithRows(this.createRows())
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
    }

    render() {
      return (
          <ListView
            style={styles.table}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}

          />

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
        <Swipeout right={swipeoutBtns}
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
}
