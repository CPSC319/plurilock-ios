'use strict';

var React = require('react-native');

var Button = require('react-native-button');
var YourRouter = require('./app/route.js');
import MainPage from './app/MainPage'
import TabBar from './app/TabBar'
import LoginPage from './app/LoginPage'


var {
  AppRegistry,
  View,
  Text,
  Navigator,
} = React;

class BioAuthiOS extends React.Component {
  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={{
          id: 'login'
        }}
        renderScene={(route, navigator) => {
          // alert(route.prop)
          if(route.id === 'login') {
            return <LoginPage route={route} navigator={navigator} />
          } else {
            return <TabBar username={route.id} route={route} navigator={navigator} />
          }
        }}
      />
    );
  }
}



AppRegistry.registerComponent('BioAuthiOS', () => BioAuthiOS);
