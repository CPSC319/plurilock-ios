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
        translucent={false}
        navigationBarHidden={false}
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
        translucent={false}
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
        translucent={false}
        initialRoute={{
          title: "Settings",
          component: SettingsPage
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
          //icon={Icons.FeaturedIcon}
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
          //icon={Icons.NearbyIcon}
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
          //icon={Icons.ChatIcon}
          selected={this.state.selectedTab === "SettingsTab"}
          onPress={() => {
            this.setState({
              selectedTab: "SettingsTab"
            });
          }}
          >
          {this.renderSettingsTab()}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}
