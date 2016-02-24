'use strict';

import React, {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  Component
} from 'react-native';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  text: {
    flex: 1,
  },
  table: {
    flex: 1,
    marginBottom: 50
  }
});

export default class OverviewPage extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(this.createRows())
    };
    this.renderRow = this.renderRow.bind(this)
    this.createRows = this.createRows.bind(this)
  }

  render() {
    return (
        <ListView
          style={styles.table}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />

    );
  }

  renderRow(rowData: string, sectionID: number, rowID: number) {
    return (
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData + ' - blah blah'}
            </Text>
          </View>
        </View>
    );
  }

  createRows() {
    var dataBlob = [];
    for (var ii = 0; ii < 50; ii++) {
      dataBlob.push('Row ' + ii);
    }
    return dataBlob;
  }

}
