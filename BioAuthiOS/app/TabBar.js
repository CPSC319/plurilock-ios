/**
*/
"use strict";

import React, {
  StyleSheet,
  TabBarIOS,
  NavigatorIOS,
  Component
} from "react-native";

import OverviewPage from "./OverviewPage"
import TransactionsPage from "./TransactionsPage"
import SettingsPage from "./SettingsPage"
import NotificationPage from "./NotificationPage"

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

  renderNotificationsTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "Notifications",
          component: NotificationPage
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
          title="Notification API Test"
          selected={this.state.selectedTab === "NotificationsTab"}
          onPress={() => {
            this.setState({
              selectedTab: "NotificationsTab"
            });
          }}
          >
          {this.renderNotificationsTab()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
