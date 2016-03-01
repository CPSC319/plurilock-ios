/**
*/
"use strict";

import React, {
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Component
} from "react-native";

var { Icon, } = require('react-native-icons');
import OverviewPage from "./OverviewPage"
import TransactionsPage from "./TransactionsPage"
import SettingsPage from "./SettingsPage"
import PanGesturePage from "./PanGesturePage"

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "OverviewTab"
    };
  }

  renderOverviewTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "Overview",
          component: OverviewPage
        }}/>
    );
  }

  renderTransactionsTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "Transactions",
          component: TransactionsPage
        }}/>
    );
  }

  renderSettingsTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "Settings",
          component: SettingsPage
        }}/>
    );
  }

  renderPanGestureTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "PanGesture",
          component: PanGesturePage
        }}/>
    );
  }

  render() {
    return (
      <TabBarIOS
        tintColor="green"
        translucent={false}
        >

        <TabBarIOS.Item
          title="Overview"
          selected={this.state.selectedTab === "OverviewTab"}
          onPress={() => {
            this.setState({
              selectedTab: "OverviewTab"
            });
          }}
          >
          {this.renderOverviewTab()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Transactions"
          selected={this.state.selectedTab === "TransactionsTab"}
          iconName={'ion|ios-home-outline'}
          selectedIconName={'ion|ios-home'}
          onPress={() => {
            this.setState({
              selectedTab: "TransactionsTab"
            });
          }}
          >
          {this.renderTransactionsTab()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === "SettingsTab"}
          onPress={() => {
            this.setState({
              selectedTab: "SettingsTab"
            });
          }}
          >
          {this.renderSettingsTab()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Pan Gesture Tab"
          selected={this.state.selectedTab === "PanGestureTab"}
          onPress={() => {
            this.setState({
              selectedTab: "PanGestureTab"
            });
          }}
          >
          {this.renderPanGestureTab()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
