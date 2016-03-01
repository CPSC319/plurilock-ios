/*
*/

'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    color: "black",
    alignSelf: "center",
    marginTop: 200
  }
})

import {GestureLogger} from 'NativeModules'

export default class SettingsPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.onTextChange = this.onTextChange.bind(this)
  }


  render() {
    return(
      <View>
      <Text style={styles.text}>SETTINGS PAGE</Text>

      <TextInput
                  style={{marginTop: 64, height: 60, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={this.onTextChange}
                  value={this.state.text}
      />
      </View>
    );
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
