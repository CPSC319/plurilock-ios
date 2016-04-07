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
  TextInput,
  Modal,
  NetInfo,
  ProgressViewIOS,
  RefreshControl
} from 'react-native';

import {GestureLogger} from 'NativeModules'
import Swipeout from 'react-native-swipeout'
import ServerConnection from './ServerConnection'
import accounts from './Accounts'
import transactions from './Transactions'
import budgets from './Budgets'
import Queue from './Queue';
var q = new Queue.Queue();

var ProgressBar = require('react-native-progress-bar');

var recentTransactions = transactions.slice(transactions.length-3,transactions.length)

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
Tab2:{
  flexDirection: 'row',
  flex: 1,
  width:100,
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
      marginBottom:50,
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
  },
  addButtonText: {
    textAlign: "right",
    color: "green",
    fontSize: 18,
    fontWeight: "bold"
  },
  modalButton: {
    textAlign: "center",
    marginTop: 20,
    color: "green",
    fontSize: 18,
    fontWeight: "bold"
  },
  newAccountField: {
    height: 64,
    borderColor: "grey",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10
  },
  newAccountTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100
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
      },
      onPanResponderMove: (evt, gestureState) => {

        var force = evt.nativeEvent.force
        if (force == null) {
          force = 0
        }

      GestureLogger.retrievePanGestureData("BioAuthiOS", new Date().toString(), gestureState, force, (callback) => {
       console.log("sending to server: ",callback)
       var username = "TestUser"
       if (this.props.parentProps.username != '') {
         username = this.props.parentProps.username
       }

       var data = {
         "btClientType": "iOS",
         "btClientVersion":"1.0",
         "userID":username,
         "domain":"team2",
         "data":callback
       }

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
            ServerConnection.send(JSON.stringify(data));
            console.log("Sending data");
            console.log("QUEUE SIZE IS "+ q.size());
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
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      this.state = {
        dataSource: ds.cloneWithRowsAndSections(this.createRows()),
        progress: 0.45,
        modalVisible: false,
        accounts: accounts,
        accountName: "",
        accountAmount: "",
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
      this.addAccount = this.addAccount.bind(this)
      this._setModalVisible = this._setModalVisible.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.onKeyPress = this.onKeyPress.bind(this)
      this.onAccountNameChange = this.onAccountNameChange.bind(this)
      this.onAccountAmountChange = this.onAccountAmountChange.bind(this)


      }

    _setModalVisible(visible) {
  this.setState({modalVisible: visible});
  }

    render() {

      var modalBackgroundStyle = {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      };
var innerContainerTransparentStyle = this.state.transparent
  ? {backgroundColor: '#fff', padding: 20}
  : null;

      return (
          <View style={styles.container}>

          <Modal
                    animated={true}
                    transparent={true}
                    visible={this.state.modalVisible}>
                    <View style={[styles.container, modalBackgroundStyle]}>
                      <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        <Text style={styles.newAccountTitle}>{"Enter a new account"}</Text>
                        <TextInput style={styles.newAccountField} onChangeText={this.onAccountNameChange}
                        onKeyPress={this.onKeyPress} value={this.state.accountName} placeholder={"Enter Account Name"}/>
                        <TextInput style={styles.newAccountField} onChangeText={this.onAccountAmountChange}
                        onKeyPress={this.onKeyPress} value={this.state.accountAmount} keyboardType={'decimal-pad'} placeholder={"Enter Account Balance"}/>
                        <TouchableOpacity
                          onPress={this.closeModal}>
                          <Text style={styles.modalButton}>{"Submit"}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
          </Modal>


          <ListView
            style={styles.table}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)} />
            }
            stickyHeaderIndices={[]}
            {...this._panResponder.panHandlers}
          />
          </View>

      );
    }

    _onRefresh() {
      this.setState({refreshing: true})
      recentTransactions = transactions.slice(transactions.length-3,transactions.length)
      this.setState(this.state)
      this.setState({refreshing: false})

    }

    renderSectionHeader(rowData, sectionID, rowID) {
      if (sectionID === "0") {
        return (<View/>) //this.renderAccountSection()
      }

      if (sectionID === "1") {
        return this.renderRecentTransactionSection()
      }

      return this.renderBudgetSection()
    }

    renderAccountSection() {
      return (
        <View>
        <View style={styles.sectionHeader}>
        <View style={{flex: 2, flexDirection: "row"}}>
        <Text style={styles.sectionHeaderText}>
          {'Accounts'}
        </Text>
        <View style={styles.Tab}></View>
        <TouchableHighlight onPress={this.addAccount} underlayColor={"white"}>
        <Text style={styles.addButtonText}>
          {'+'}
        </Text>
        </TouchableHighlight>
        </View>
<View style={styles.sectionHeaderSeparator}></View>
        </View>

        </View>
      )
    }


    addAccount() {
      this._setModalVisible(true)
    }

    closeModal() {
      if (this.state.accountName != "" && this.state.accountAmount != "") {
        accounts.push([this.state.accountName, this.state.accountAmount])
        this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createRows())})
        this.setState({accountName: "", accountAmount: ""})
      }

      this._setModalVisible(false)

    }

    renderRecentTransactionSection() {
      return (
        <View style={styles.sectionHeader}>
        <View style={{flex: 2, flexDirection: "row"}}>
        <Text style={styles.sectionHeaderText}>
          {'Recent Transactions'}
        </Text>
        </View>
        <View style={styles.sectionHeaderSeparator}></View>
        </View>
      )
    }

    renderBudgetSection() {
      return (
        <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>
          {'Total Budget '}
        </Text>
        <View style={styles.sectionHeaderSeparator}></View>
        </View>
      )
    }

    renderRow(rowData: string) {


      // if (rowData.section === 0) {
      //   return this.renderAlert()
      // }

      if (rowData.section === 0) {
        return this.renderAccountRows(rowData)
      }

      if (rowData.section === 1) {
        return this.renderRecentTransactionRows(rowData)
      }

      return this.renderBudgetRows(rowData)
    }

    renderAccountRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderAccountSection()
      }

      let swipeoutBtns = [
        {
          text: "Delete",
          backgroundColor: "red"
        }
      ]

      return (
        <Swipeout left={swipeoutBtns} right={swipeoutBtns}>
        <View style={styles.accountRow}>
          <Text style={styles.accountName}>{accounts[row][0]}</Text>
          <View style={styles.Tab}></View>
          <Text style={styles.accountValue}>${accounts[row][1]}</Text>
        </View>
        </Swipeout>
      )
    }

    renderRecentTransactionRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderRecentTransactionSection()
      }
      return (
        <View style={styles.accountRow}>
          <Text style={styles.accountName}>
            {recentTransactions[row][0]}{"\n"}
            <Text style={styles.transactionCategory}>{recentTransactions[row][2]}</Text>
          </Text>
          <View style={styles.Tab}></View>
          <Text style={styles.accountValue}>${recentTransactions[row][1]}</Text>
        </View>
      )
    }

    renderBudgetRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderBudgetSection()
      }

      // setTimeout((function() {
      //   this.setState({ progress: this.state.progress + 0.0000001});
      // }).bind(this), 2000);
      var totalBudget = 0;
      var alreadySpent = 0;
      for (let i = 0; i<budgets.length; i++) {

        for (let j = 0; j<transactions.length; j++) {
            if (transactions[j][2] == budgets[i][0]) {
              alreadySpent += transactions[j][1]
            }
        }

        totalBudget += budgets[i][1]

      }

      var progress = alreadySpent/totalBudget
      var color = "green"
      if (progress > 1) {
        color = "red"
      }

      return (
              <View style={styles.budget}  >
              <View style={styles.halfbg}>
                  <Text style={styles.bodymsg}>Total Budget</Text>
                  <View style={styles.Tab}></View>
              <Text style={styles.money}>${alreadySpent.toFixed(0)} out of ${totalBudget.toFixed(0)}</Text>
              </View>
              <ProgressViewIOS style={{marginTop: 0, width: 315, height: 40}} progressTintColor={color} progress={progress}/>
              </View>
      )
    }

    renderAlert() {
      return(
        <View style={styles.subconts}>
          <View style={styles.half}>
          <Text style={styles.headerl}>Alerts</Text>
          <View style={styles.Tab}></View>
          <View style={styles.alert}>
          <Text style={styles.alrtmsg}>2</Text>
          </View>
          </View>
          <Text style={styles.bodymsg}>Suspicious login detected from 192.168.2.1{"\n"}"You can't afford to live in Vancouver yet"</Text>
        </View>
      )
    }

      //var data = sampleData[rowData.section][rowData.row]
      //
      // return (
      //   <Swipeout left={swipeoutBtns} right={swipeoutBtns}
      //     autoClose='true'>
      //       <View style={styles.row}
      //         {...this._panResponder.panHandlers}>
      //         <Text style={styles.text}>
      //           {data}
      //         </Text>
      //       </View>
      //   </Swipeout>
      // );
    //}

    createRows() {
      const dataBlob = [];

      var listLength = accounts.length+1;

      for (let ii = 0; ii < 3; ii++) {
        // if (ii === 0) {
        //   listLength = 1
        // }

        if (ii === 0) {
          listLength = accounts.length+1;
        }

        if (ii === 1) {
          listLength = recentTransactions.length+1
        }

        if (ii === 2) {
          listLength = 2
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

    onAccountNameChange(accountName) {
        this.setState({accountName})
    }

    onAccountAmountChange(accountAmount) {
        this.setState({accountAmount})
    }

    onKeyPress(e) {
      GestureLogger.retrieveKeyData("BioAuthiOS", new Date().toString(), e.nativeEvent.key, (callback) => {
        console.log("sending to server: ",callback)

        var data = {
          "btClientType": "iOS",
          "btClientVersion":"1.0",
          "userID":"Bruce",
          "domain":"team2",
          "data":callback
        }

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
            ServerConnection.send(JSON.stringify(data));
            console.log("Sending data");
            console.log("QUEUE SIZE IS "+ q.size());
          }
       });
      })
    }

}
