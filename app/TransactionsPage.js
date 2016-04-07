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
  ProgressViewIOS
} from 'react-native';

import {GestureLogger} from 'NativeModules'
import Swipeout from 'react-native-swipeout'
import ServerConnection from './ServerConnection'
import budgets from './Budgets'
import accounts from './Accounts'
import transactions from './Transactions'

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
transactionRow:{
  flex: 2,
  flexDirection: 'row',
  paddingLeft: 15,
  paddingRight: 15,
  padding: 12,
  backgroundColor: 'white',
  marginLeft: 12,
  marginRight: 12
},
transactionName: {
  textAlign: "left",
  color: "#545454"

},
transactionValue: {
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
  newtransactionField: {
    height: 64,
    borderColor: "grey",
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 10
  },
  newtransactionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100
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

    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });

      this.state = {
        dataSource: ds.cloneWithRowsAndSections(this.createRows()),
        progress: 0,
        modalVisible: false,
        budgetModalVisible: false,
      };
      this.renderRow = this.renderRow.bind(this)
      this.createRows = this.createRows.bind(this)
      this.addtransaction = this.addtransaction.bind(this)
      this.addBudget = this.addBudget.bind(this)
      this._setModalVisible = this._setModalVisible.bind(this)
      this._setBudgetModalVisible = this._setBudgetModalVisible.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.closeBudgetModal = this.closeBudgetModal.bind(this)
      this.onKeyPress = this.onKeyPress.bind(this)
      this.ontransactionNameChange = this.ontransactionNameChange.bind(this)
      this.ontransactionAmountChange = this.ontransactionAmountChange.bind(this)
      this.onAccountNameChange = this.onAccountNameChange.bind(this)
      this.onCategoryNameChange = this.onCategoryNameChange.bind(this)
      this.onBudgetNameChange = this.onBudgetNameChange.bind(this)
      this.onBudgetAmountChange = this.onBudgetAmountChange.bind(this)

    }

    _setModalVisible(visible) {
  this.setState({modalVisible: visible});
  }

    _setBudgetModalVisible(visible) {
      this.setState({budgetModalVisible: visible})
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
                        <Text style={styles.newtransactionTitle}>{"Enter a new transaction"}</Text>
                        <TextInput style={styles.newtransactionField} onChangeText={this.ontransactionNameChange}
                        onKeyPress={this.onKeyPress} value={this.state.transactionName} placeholder={"Enter transaction name"}/>
                        <TextInput style={styles.newtransactionField} onChangeText={this.onCategoryNameChange}
                        onKeyPress={this.onKeyPress} value={this.state.categoryName} placeholder={"Enter category name"}/>
                        <TextInput style={styles.newtransactionField} onChangeText={this.onAccountNameChange}
                        onKeyPress={this.onKeyPress} value={this.state.accountName} placeholder={"Enter account name"}/>
                        <TextInput style={styles.newtransactionField} onChangeText={this.ontransactionAmountChange}
                        onKeyPress={this.onKeyPress} value={this.state.transactionAmount} keyboardType={'decimal-pad'} placeholder={"Enter transaction balance"}/>
                        <TouchableOpacity
                          onPress={this.closeModal}>
                          <Text style={styles.modalButton}>{"Submit"}</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
          </Modal>

          <Modal
                    animated={true}
                    transparent={true}
                    visible={this.state.budgetModalVisible}>
                    <View style={[styles.container, modalBackgroundStyle]}>
                      <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                        <Text style={styles.newtransactionTitle}>{"Enter a new budget"}</Text>
                        <TextInput style={styles.newtransactionField} onChangeText={this.onBudgetNameChange}
                        onKeyPress={this.onKeyPress} value={this.state.budgetName} placeholder={"Enter budget name"}/>
                        <TextInput style={styles.newtransactionField} onChangeText={this.onBudgetAmountChange}
                        onKeyPress={this.onKeyPress} value={this.state.budgetAmount} keyboardType={'decimal-pad'} placeholder={"Enter budget amount"}/>
                        <TouchableOpacity
                          onPress={this.closeBudgetModal}>
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
            stickyHeaderIndices={[]}
            {...this._panResponder.panHandlers}
          />
          </View>

      );
    }


        addtransaction() {
          this._setModalVisible(true)
        }

        addBudget() {
          this._setBudgetModalVisible(true)
        }

        closeModal() {
          if (this.state.transactionName != "" && this.state.transactionAmount != "" && this.state.categoryName != "" && this.state.accountName != "") {
            transactions.push([this.state.transactionName, parseInt(this.state.transactionAmount), this.state.categoryName])

            for (let i = 0; i<accounts.length; i++) {
              if (accounts[i][0] == this.state.accountName) {
                accounts[i][1] -= parseInt(this.state.transactionAmount)
              }
            }

            this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createRows())})
            this.setState({transactionName: "", transactionAmount: "", categoryName: "", accountName: ""})
          }
          this._setModalVisible(false)
        }

        closeBudgetModal() {
          if (this.state.budgetName != "" && this.state.budgetAmount != "") {
            budgets.push([this.state.budgetName, parseInt(this.state.budgetAmount)])
            this.setState({dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createRows())})
            this.setState({budgetName: "", budgetAmount: ""})
          }
          this._setBudgetModalVisible(false)
        }

    renderTransactionSection() {
      return (
        <View style={styles.sectionHeader}>
        <View style={{flex: 2, flexDirection: "row"}}>
        <Text style={styles.sectionHeaderText}>
          {'Transactions'}
        </Text>
        <View style={styles.Tab}></View>
        <TouchableHighlight onPress={this.addtransaction} underlayColor={"white"}>
        <Text style={styles.addButtonText}>
          {'+'}
        </Text>
        </TouchableHighlight>
        </View>
        <View style={styles.sectionHeaderSeparator}></View>
        </View>
      )
    }

    renderBudgetSection() {
      return (
        <View style={styles.sectionHeader}>
        <View style={{flex: 2, flexDirection: "row"}}>
        <Text style={styles.sectionHeaderText}>
          {'Budgets'}
        </Text>
        <View style={styles.Tab}></View>
        <TouchableHighlight onPress={this.addBudget} underlayColor={"white"}>
        <Text style={styles.addButtonText}>
          {'+'}
        </Text>
        </TouchableHighlight>
        </View>
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
        <View style={styles.transactionRow}>
          <Text style={styles.transactionName}>
            {transactions[row][0]}{"\n"}
            <Text style={styles.transactionCategory}>{transactions[row][2]}</Text>
          </Text>
          <View style={styles.Tab}></View>
          <Text style={styles.transactionValue}>${transactions[row][1].toFixed(2)}</Text>
        </View>
      )
    }

    renderBudgetRows(rowData: string) {
      var row = rowData.row-1
      if (row === -1) {
        return this.renderBudgetSection()
      }

      var total = 0.00;
      for (let i = 0; i<transactions.length; i++) {
        if (transactions[i][2] == budgets[row][0]) {
          console.log("Transaction: ",transactions[i][1])
          total += transactions[i][1]
        }
      }

      console.log("TOTAL IS: ",total)

      var color = "green"
      var progress = total/budgets[row][1]
      if (progress > 1) {
        color = "red"
      }
      return (
              <View style={styles.budget}  >
              <View style={styles.halfbg}>
                  <Text style={styles.bodymsg}>{budgets[row][0]}</Text>
                  <View style={styles.Tab}></View>
              <Text style={styles.money}>${total.toFixed(2)} out of ${budgets[row][1]}</Text>
              </View>
              <ProgressViewIOS style={{marginTop: 0, width: 315, height: 40}} progressTintColor={color} progress={progress}/>

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

    ontransactionNameChange(transactionName) {
        this.setState({transactionName})
    }

    onCategoryNameChange(categoryName) {
        this.setState({categoryName})
    }

    onAccountNameChange(accountName) {
        this.setState({accountName})
    }

    ontransactionAmountChange(transactionAmount) {
        this.setState({transactionAmount})
    }

    onBudgetNameChange(budgetName) {
        this.setState({budgetName})
    }

    onBudgetAmountChange(budgetAmount) {
        this.setState({budgetAmount})
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

        ServerConnection.send(JSON.stringify(data));
      })
    }

}
