/*
*/

'use strict';
import React, {
  Component,
  StyleSheet,
  Text,
  View
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

export default class SettingsPage extends Component {

  render() {
    return(
      <View>
      <Text style={styles.text}>SETTINGS PAGE</Text>
      </View>
    );
  }

}
