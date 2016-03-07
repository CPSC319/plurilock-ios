"use strict";

import React, {
  SliderIOS,
  ListView,
  View,
  Component,
  StyleSheet,
  Text
} from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    marginTop: 20
  },
  textView: {
    marginLeft: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 24,
    fontWeight: '100',
    color: 'black',
  },
  slider: {
    height: 20,
    width: 325,
    margin: 6
  }
});

export default class SettingsPage extends Component {
  constructor() {
    super();
    var testData = [{settingName:"Range", type:"Slider"}, {settingName:"Help", type:"Text"}, {settingName:"Acknowledgements", type:"Text"}]
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(testData),
      value: 0,
    };
  }

  renderRow(rowData, sectionID, rowID) {
    if (rowData.type == "Slider") {
      return (
        <View style={styles.wrapper}>
          <View style={styles.textView}>
            <Text>{rowData.settingName}</Text>
            <SliderIOS style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              onValueChange={(value) => this.setState({value: value})}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.wrapper}>
          <View style={styles.textView}>
            <Text>{rowData.settingName}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}
