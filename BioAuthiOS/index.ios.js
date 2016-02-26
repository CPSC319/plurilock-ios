/*
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import TabBar from "./app/TabBar"
import {LocalNotificator} from 'NativeModules'

class BioAuthiOS extends Component {
  render() {
    return (
      <TabBar/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

// request permissions
LocalNotificator.requestPermissions();

AppRegistry.registerComponent('BioAuthiOS', () => BioAuthiOS);
