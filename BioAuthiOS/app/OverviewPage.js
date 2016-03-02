/*
  OverviewPage
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

const sampleData = [
  ["Bank of Montreal Chequing...........................$6700",
   "Bank of Montreal Savings.............................$15000",
   "Bank of Montreal MasterCard.........................-$650",
   "TD Canada Trust Chequing...........................$6700",
    "TD Canada Trust Savings.............................$15000",
    "TD Canada Trust Visa...................................-$650"],
  ["Starbucks Coffee.............................................$4.46",
   "Apple iPhone 6S........................................$1059.68",
   "H&M............................................................$78.95",
   "Miku Restaurant...........................................$114.46",
    "Cineplex.......................................................$12.99",
    "Save on Foods...............................................$28.95"],
  ["Restaurants................................$195.54 remaining",
  "Clothing......................................$21.05 remaining",
  "Electronics...............................$859.68 over budget",
  "Entertainment................................$95.54 remaining",
  "Groceries......................................$21.05 remaining",
  "Coffee Shops.................................$25.68 remaining"]
]

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
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
    backgroundColor: "#dddddd"
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1
  },
  sectionHeader: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  }
});



export default class OverviewPage extends Component {

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
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      this.state = {
        dataSource: ds.cloneWithRowsAndSections(this.createRows()),
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
      this.renderSectionHeader = this.renderSectionHeader.bind(this)
    }

    render() {
      return (
          <View style={styles.container}>
          <ListView
            style={styles.table}
            dataSource={this.state.dataSource}
            renderSectionHeader={this.renderSectionHeader}
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            {...this._panResponder.panHandlers}
          />
          </View>

      );
    }

    renderSectionHeader(rowData, sectionID, rowID) {
      if (sectionID === "0") {
        return this.renderAccountSection()
      }

      if (sectionID === "1") {
        return this.renderRecentTransactionSection()
      }

      return this.renderBudgetSection()
    }

    renderAccountSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Accounts'}
        </Text>
        </View>
      )
    }

    renderRecentTransactionSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Recent Transactions'}
        </Text>
        </View>
      )
    }

    renderBudgetSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Budget '}
        </Text>
        </View>
      )
    }

    renderRow(rowData: string) {
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

      var data = sampleData[rowData.section][rowData.row]



      return (
        <Swipeout left={swipeoutBtns} right={swipeoutBtns}
          autoClose='true'>
            <View style={styles.row}
              {...this._panResponder.panHandlers}>
              <Text style={styles.text}>
                {data}
              </Text>
            </View>
        </Swipeout>
      );
    }

    createRows() {
      const dataBlob = [];

      const listLength = 10;

      // dataBlob[ 0 ] = new Array(1);
      // dataBlob[ 1 ] = new Array(listLength);

      for (let ii = 0; ii < 3; ii++) {
          dataBlob[ ii ] = new Array(6);
        for (let j = 0; j < dataBlob[ ii ].length; j++) {

          dataBlob[ ii ][ j ] =
          {
            section: ii,
            row: j
          };
        }
      }
      return dataBlob;
    }

}
