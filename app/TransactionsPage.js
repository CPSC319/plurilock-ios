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

var ProgressBar = require('react-native-progress-bar');

var budgets = [
  ["Entertainment", 67, 100],
  ["Restaurants", 150, 200],
  ["Electronics", 450, 500]
]

var transactions = [
  ["Starbucks Coffee", 4.76, "Restaurants"],
  ["Apple iPhone 6S", 1029.99, "Electronics"],
  ["Scotiabank Theatre", 12.99, "Entertainment"],
  ["Starbucks Coffee", 4.76, "Restaurants"],
  ["Apple iPhone 6S", 1029.99, "Electronics"],
  ["Scotiabank Theatre", 12.99, "Entertainment"]
]

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginLeft: 12,
    marginRight: 12
  },
  text: {
    flex: 1,
  },
  table: {
    marginTop: 20,
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
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: 'white',
  },
  sectionHeaderSeparator:{
    flex: 2,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#545454",
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginTop: 10
},
accountRow:{
  flex: 2,
  flexDirection: 'row',
  paddingLeft: 15,
  paddingRight: 15,
  padding: 12,
  backgroundColor: 'white',
  marginLeft: 12,
  marginRight: 12
},
accountName: {
  textAlign: "left",
  color: "#545454"

},
accountValue: {
  textAlign: "right",
  color: "green"
},
Tab:{
  flexDirection: 'row',
  flex: 1,
  width:200,
  justifyContent: 'space-between',
  padding:5,
},
transactionCategory: {
  fontSize: 12,
  color: "#bdbdbd",
},
halfbg:  {
 flexDirection: "row",
},
money: {
    fontSize:12,
    color: "green"
},
bodymsg: {
  marginBottom: 10,
  color: "#545454"
},
budget: {
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'white',
      padding: 20,
    },
    alert: {
        backgroundColor: '#ffae1a',
        padding: 5,
        paddingLeft: 7,
        paddingRight: 7,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: "#FFC04D",
    },
    alrtmsg: {
        lineHeight: 17,
        color: "white"
    },
    headerl: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: 'bold',
      justifyContent: "space-between",
    },
    subconts: {
        marginTop: 10,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: 'white',
          padding: 20
    },
    halfb:  {
      flex: 2,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#545454",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
  },
  half:  {
      flex: 2,
      flexDirection: "row",
  }
});



export default class TransactionsPage extends Component {

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
        progress: 0.45
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
    }

    render() {

      return (
          <View style={styles.container}>
          <ListView
            style={styles.table}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} />}
            stickyHeaderIndices={[]}
            {...this._panResponder.panHandlers}
          />
          </View>

      );
    }

    renderTransactionSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Transactions'}
        </Text>
        <View style={styles.sectionHeaderSeparator}></View>
        </View>
      )
    }

    renderBudgetSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Budget '}
        </Text>
        <View style={styles.sectionHeaderSeparator}></View>
        </View>
      )
    }

    renderRow(rowData: string) {

      if (rowData.section === 0) {
        return this.renderTransactionRows(rowData)
      }

      return this.renderBudgetRows(rowData)
    }


    renderTransactionRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderTransactionSection()
      }
      return (
        <View style={styles.accountRow}>
          <Text style={styles.accountName}>
            {transactions[row][0]}{"\n"}
            <Text style={styles.transactionCategory}>{transactions[row][2]}</Text>
          </Text>
          <View style={styles.Tab}></View>
          <Text style={styles.accountValue}>${transactions[row][1]}</Text>
        </View>
      )
    }

    renderBudgetRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderBudgetSection()
      }

      setTimeout((function() {
        this.setState({ progress: this.state.progress + 0.0000001});
      }).bind(this), 2000);


      return (
              <View style={styles.budget}  >
              <View style={styles.halfbg}>
                  <Text style={styles.bodymsg}>{budgets[row][0]}</Text>
                  <View style={styles.Tab}></View>
              <Text style={styles.money}>${budgets[row][1]} out of ${budgets[row][2]}</Text>
              </View>
              <ProgressBar
                fillStyle={{height: 40, backgroundColor: "green"}}
                backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
                style={{marginTop: 0, width: 349, height: 40}}
                progress={this.state.progress}
              />
              </View>
      )
    }



    createRows() {
      const dataBlob = [];
      var listLength;


      for (let ii = 0; ii < 2; ii++) {
        if (ii === 0) {
          listLength = transactions.length+1
        }

        if (ii === 1) {
          listLength = budgets.length+1
        }
          dataBlob[ ii ] = new Array(listLength);
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





// /*
// old transactions page
// */

//
// 'use strict';
// import React, {
//   Component,
//   StyleSheet,
//   Text,
//   View,
//   ScrollView
// } from 'react-native';
// var { Icon, } = require('react-native-icons');
// var ProgressBar = require('react-native-progress-bar');
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6e6e6'
//   },
//   text: {
//     color: "black",
//     alignSelf: "center",
//     marginTop: 80,
//
//   },
//   subconts: {
//       marginTop: 10,
//       marginLeft: 12,
//       marginRight: 12,
//       backgroundColor: 'white',
//         padding: 20
//   },
//   header: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//   },
//   headerl: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     justifyContent: "space-between",
//   },
//   Tab:{
// flexDirection: 'row',
// flex: 1,
// width:200,
// justifyContent: 'space-between',
// padding:5,
// },
//   headerr: {
//     fontSize: 18,
//     marginBottom: 10,
//     fontWeight: 'bold',
//     justifyContent: "flex-end",
//   },
//   account: {
//
//   },
//   recent: {
//
//   },
//   budget: {
//             marginTop: 10,
//       marginLeft: 12,
//       marginRight: 12,
//       backgroundColor: 'white',
//         padding: 20,
//         marginBottom:50,
//   },
//   half:  {
//       flex: 2,
//       flexDirection: "row",
//   },
//     halfb:  {
//       flex: 2,
//       flexDirection: "row",
//       borderWidth: 1,
//       borderColor: "#545454",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//   },
//      halfbg:  {
//       flex: 2,
//       flexDirection: "row",
//       borderWidth: 1,
//       borderColor: "#545454",
//       borderBottomWidth: 0,
//       borderLeftWidth: 0,
//       borderRightWidth: 0,
//       paddingTop: 20,
//   },
//        halfg:  {
//       flex: 2,
//       flexDirection: "row",
//
//       paddingTop: 20,
//   },
//   alert: {
//       backgroundColor: '#ffae1a',
//       padding: 5,
//       paddingLeft: 7,
//       paddingRight: 7,
//       borderWidth: 1,
//       borderRadius: 2,
//       borderColor: "#FFC04D",
//   },
//   alrtmsg: {
//       lineHeight: 17,
//       color: "white"
//   },
//   bodymsg: {
//       color: "#545454"
//   },
//     bodymsghf: {
//       color: "#545454"
//   },
//     bodymsghfr: {
//       color: "green",
//       textAlign: "right",
//   },
//   redmsg :{
//             color: "red",
//       textAlign: "right",
//   },
//   smmsg: {
//       fontSize: 12,
//       color: "#bdbdbd",
//   },
//   bluebtn: {
//       color: "#0cb2f2",
//   },
//   money: {
//       fontSize:12,
//       color: "green"
//   }
// })
//
// export default class TransactionsPage extends Component {
//
//     constructor(props) {
//     super(props);
//     this.state = {
//       progress: 0,
//     };
//   }
//
//
//   render() {
//           setTimeout((function() {
//       this.setState({ progress: this.state.progress + (0.4 * Math.random())});
//     }).bind(this), 2000);
//
//     return(
//       <ScrollView style={styles.container}>
//       <View style={styles.subconts}>
//         <View style={styles.half}>
//         <Text style={styles.headerl}>Alerts</Text>
//         <View style={styles.Tab}></View>
//         <View style={styles.alert}>
//         <Text style={styles.alrtmsg}>2</Text>
//         </View>
//         </View>
//         <Text style={styles.bodymsg}>Suspicious login detected from 192.168.2.1{"\n"}You can't afford to live in Vancouver yet</Text>
//       </View>
//       <View style={styles.subconts}>
//         <Text style={styles.header}>Accounts</Text>
//         <View style={styles.halfb}>
//             <Text style={styles.bodymsghf}>{"\n"}Checking{"\n\n"}Savings{"\n\n"}AMEX Black</Text>
//             <View style={styles.Tab}></View>
//             <Text style={styles.bodymsghfr}>{"\n"}$2,736{"\n\n"}$6,666{"\n\n"}<Text style={styles.redmsg}>$293,736</Text></Text>
//         </View>
//       </View>
//       <View style={styles.subconts}>
//         <Text style={styles.header}>Recent Transactions</Text>
//         <View style={styles.halfb}>
//             <Text style={styles.bodymsghf}>{"\n"}Cafe Perugia{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}McDonald's{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}Reboot Cafe{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}<Text style={styles.bluebtn}>Clear Recent Transactions </Text></Text>
//             <Text style={styles.smmsg}></Text>
//             <View style={styles.Tab}></View>
//             <Text style={styles.bodymsghfr}>{"\n"}$11.12{"\n\n\n"}$6.33{"\n\n\n"}$9.29</Text>
//         </View>
//
//       </View>
//       <View style={styles.budget}>
//         <Text style={styles.header}>Budget</Text>
//         <View style={styles.halfbg}>
//             <Text style={styles.bodymsg}>Entertainment</Text>
//             <View style={styles.Tab}></View>
//         <Text style={styles.money}>$27 out of $120</Text>
//         </View>
//         <ProgressBar
//           fillStyle={{height: 40, backgroundColor: "green"}}
//           backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
//           style={{marginTop: 0, width: 349, height: 40}}
//           progress={this.state.progress}
//         />
//         <View style={styles.halfg}>
//             <Text style={styles.bodymsg}>Restaurants</Text>
//             <View style={styles.Tab}></View>
//         <Text style={styles.money}>$27 out of $120</Text>
//         </View>
//         <ProgressBar
//           fillStyle={{height: 40, backgroundColor: "green"}}
//           backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
//           style={{marginTop: 0, width: 349, height: 40}}
//           progress={this.state.progress}
//         />
//
//       </View>
//
//       </ScrollView>
//     );
//   }
//
// }
