/*
*/

'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
var { Icon, } = require('react-native-icons');
var ProgressBar = require('react-native-progress-bar');
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
  headerl: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    justifyContent: "space-between",
  },
  Tab:{
flexDirection: 'row',
flex: 1,
width:200,
justifyContent: 'space-between',
padding:5,    
},
  headerr: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    justifyContent: "flex-end",
  },
  account: {
      
  },
  recent: {
      
  },
  budget: {
            marginTop: 10,
      marginLeft: 12,
      marginRight: 12,
      backgroundColor: 'white',
        padding: 20,
        marginBottom:50,
  },
  half:  {
      flex: 2,
      flexDirection: "row",
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
     halfbg:  {
      flex: 2,
      flexDirection: "row",
      borderWidth: 1,
      borderColor: "#545454",
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      paddingTop: 20,
  },
       halfg:  {
      flex: 2,
      flexDirection: "row",

      paddingTop: 20,
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
  bodymsg: {
      color: "#545454"
  },
    bodymsghf: {
      color: "#545454"
  },
    bodymsghfr: {
      color: "green",
      textAlign: "right",
  },
  redmsg :{
            color: "red",
      textAlign: "right",
  },
  smmsg: {
      fontSize: 12,
      color: "#bdbdbd",
  },
  bluebtn: {
      color: "#0cb2f2",
  },
  money: {
      fontSize:12,
      color: "green"
  }
})

export default class TransactionsPage extends Component {
    
    constructor(props) {
    super(props); 
    this.state = {
      progress: 0,
    };
  }


  render() {
          setTimeout((function() {
      this.setState({ progress: this.state.progress + (0.4 * Math.random())});
    }).bind(this), 2000);

    return(
      <ScrollView style={styles.container}>
      <View style={styles.subconts}>
        <View style={styles.half}>
        <Text style={styles.headerl}>Alerts</Text>
        <View style={styles.Tab}></View>
        <View style={styles.alert}>
        <Text style={styles.alrtmsg}>2</Text>
        </View>
        </View>
        <Text style={styles.bodymsg}>Suspicious login detected from 192.168.2.1{"\n"}You can't afford to live in Vancouver yet</Text>
      </View>
      <View style={styles.subconts}>
        <Text style={styles.header}>Accounts</Text>
        <View style={styles.halfb}>
            <Text style={styles.bodymsghf}>{"\n"}Checking{"\n\n"}Savings{"\n\n"}AMEX Black</Text>
            <View style={styles.Tab}></View>
            <Text style={styles.bodymsghfr}>{"\n"}$2,736{"\n\n"}$6,666{"\n\n"}<Text style={styles.redmsg}>$293,736</Text></Text>
        </View>
      </View>
      <View style={styles.subconts}>
        <Text style={styles.header}>Recent Transactions</Text>
        <View style={styles.halfb}>
            <Text style={styles.bodymsghf}>{"\n"}Cafe Perugia{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}McDonald's{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}Reboot Cafe{"\n"}<Text style={styles.smmsg}>Restaurants</Text>{"\n\n"}<Text style={styles.bluebtn}>Clear Recent Transactions </Text></Text>
            <Text style={styles.smmsg}></Text>
            <View style={styles.Tab}></View>
            <Text style={styles.bodymsghfr}>{"\n"}$11.12{"\n\n\n"}$6.33{"\n\n\n"}$9.29</Text>
        </View>
       
      </View>
      <View style={styles.budget}>
        <Text style={styles.header}>Budget</Text>
        <View style={styles.halfbg}>
            <Text style={styles.bodymsg}>Entertainment</Text>
            <View style={styles.Tab}></View>
        <Text style={styles.money}>$27 out of $120</Text>
        </View>
        <ProgressBar
          fillStyle={{height: 40, backgroundColor: "green"}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 0, width: 349, height: 40}}
          progress={this.state.progress}
        />
        <View style={styles.halfg}>
            <Text style={styles.bodymsg}>Restaurants</Text>
            <View style={styles.Tab}></View>
        <Text style={styles.money}>$27 out of $120</Text>
        </View>
        <ProgressBar
          fillStyle={{height: 40, backgroundColor: "green"}}
          backgroundStyle={{backgroundColor: '#cccccc', borderRadius: 2}}
          style={{marginTop: 0, width: 349, height: 40}}
          progress={this.state.progress}
        />
        
      </View>

      </ScrollView>
    );
  }

}
