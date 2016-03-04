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
import PanGesturePage from "./PanGesturePage"
import MapviewPage from "./MapviewPage"

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

  renderMapviewTab() {
    return (
      <NavigatorIOS
        style={styles.container}
        tintColor= "white"
        barTintColor= "green"
        titleTextColor= "white"
        initialRoute={{
          title: "Map",
          component: MapviewPage
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


        <TabBarIOS.Item
          title="Map"
          selected={this.state.selectedTab === "MapviewTab"}
          onPress={() => {
            this.setState({
              selectedTab: "MapviewTab"
            });
          }}
          >
          {this.renderMapviewTab()}
        </TabBarIOS.Item>

      </TabBarIOS>
    );
  }
}
