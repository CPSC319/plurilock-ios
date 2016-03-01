/*
*/

'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
var { Icon, } = require('react-native-icons');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  text: {
    color: "black",
    alignSelf: "center",
    marginTop: 80,

  },
  subconts: {
      marginTop: 10,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: 'white',
        padding: 20
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  account: {
      
  },
  recent: {
      
  },
  budget: {
      
  }
})

export default class TransactionsPage extends Component {

  render() {
    return(
      <View style={styles.container}>
      <Text style={styles.text}>TRANSACTIONS PAGE</Text>
      <View style={styles.subconts}>
        <Text style={styles.header}>Alerts</Text>
        <Text style={styles.toolbarTitle}>No alerts to show</Text>
      </View>
      <View style={styles.subconts}>
        <Text style={styles.header}>Accounts</Text>
        <Text style={styles.toolbarTitle}>No accounts to show</Text>
      </View>
      <View style={styles.subconts}>
        <Text style={styles.header}>Recent Transactions</Text>
        <Text style={styles.toolbarTitle}>No transactions to show</Text>
      </View>
      <View style={styles.subconts}>
        <Text style={styles.header}>Budget</Text>
        <Text style={styles.toolbarTitle}>No budget to show</Text>
      </View>

      </View>
    );
  }

}
