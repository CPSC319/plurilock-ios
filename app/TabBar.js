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

import DeviceInfo from "react-native-device-info";
import OverviewPage from "./OverviewPage";
import TransactionsPage from "./TransactionsPage";
import SettingsPage from "./SettingsPage";
import PanGesturePage from "./PanGesturePage";
import MapviewPage from "./MapviewPage";
import ServerConnection from "./ServerConnection"

//import {ServerController} from 'NativeModules'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const overviewIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAKlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8KreiaAAAADHRSTlMAIiMkrK2ur+vx8vPnr4I/AAAAAWJLR0QN9rRh9QAAAOBJREFUeNrt2bENglAQgGGiCzCCJSO4ijswgSUzOIMVI1jSkDiUjRGej+suaPF95fFC/vZyTQMAAADwdrw+V+6n7XmW5f8f5/LFEMyzDFVAXz6YgnmWqQp4lA/mYJ5lrgK+X0TzLAIECBAgQIAAAQIECPi/gDFYHMa9FpOfr2ZdsDx2ey2nh8v6+63dnmdZ/g8A4F7gXmAzEiBAgAABAgQIECBAgHuBewEAgHuBe4HNSIAAAQIECBAgQIAAAe4F7gUAAO4F7gU2IwECBAgQIECAAAECBLgXuBcAAAAAAAC8ACyLOujuAh7JAAAAAElFTkSuQmCC";
const transactionsIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAAkFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD////Dn64xAAAALnRSTlMAHB0iIyQlMDEyMzQ3ODk6Ozw9PkVGR0hMTaSmrK2ur7nn6+zt7vDx8vP09vf5qLjmdQAAAAFiS0dELyPUIBEAAALWSURBVHja7ZztbtNAFAVvwYWSAOWrjYE0uG2oHTec9388fiAEVIVkqypr7px5gWhG8sbeu3aEMcYYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGGGOMMcZMiXk39p+fgP1vJWlYYAN0kiRtsQVGwQvoJ98+wgNQC4heQPQCohcQvYDoBUQvIHoB0QuIXkD0AqIXEL2A6AVELyB6AdELiF5A9AKiFxC9gOgF9OgFjr8MykTpxOT4SskoLLCS2AU2ghdQRkpWQtELiF5A9AKiFxC9gOgFRC8geoHUAbSdwwOoowcYHcCXAHsRnMH/Blv4jVALvxVu4Q9DLfxxuIVviLTwLbEWvinawrfF9/ePIaF/0WAEPxpr6MPRaC56tH+6AxJtoAOk9w+6f9D9g+4fdP+g+wfdP+j+QfcPun/Q/YPuH3T/oPsH3T/o/kH3D7p/1POfd+OwaiYV4KD7n4utJF01EwpQwV9aTidAFX/1kwlQx1+qHWCo7F89wKqyf/UAP2aZ9fyrB4jmoh+72QF/8OwP//oBDs0df9H9RfcX3V90f9H9RfcX3V90f9H9RfcX3V90f9H9RfcX3V90f9H9RfdPHmCxVSaKZ5nJ/Itnmfn8y2aZGf1LZplnGf0LFu2k/qL7i+4vur/o/qL7i+4vuv/uAPPc/rsDdIIHGOkBLukBlvQAz9bwAPH8Gh4geYGgF9jrYejkGh4gTtbwAIkLBL3A3puiL9bwAFkLFAxGXt4k9C96yStjgbLX/PIVKH3R81WuTwv2y6elBwRmXx9xUfkved3DA+wsEPQCgIOSpwM8wL8LBL1A0AswAsSbAR7g7wWCXiDoBTgB4u0GHuD+AkEvgAoQ7zbwAPcUCHqBoBfABYj3IzzAnQJBL0AMEB9u4QF+L8AM8OtAcQ8NEOdT+aRmNRbDQ2ZtmTj6dPOAWZsxxhhjjDHGGGOMMcYYY4wxxhhjjDHGHJTvnlNSyy9yaHoAAAAASUVORK5CYII=";
const settingsIcon = "data:image/png;base64,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";
const mapIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAMAAABrrFhUAAAA7VBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///9uiPDJAAAATXRSTlMAAQIDBQgLDQ8TFRgdICIjJCUnKCktMDI4PD9ARFVmd4CIkZmip6iqrK2ur7CxsrS1trm7vr/AxMfP1tzi5+vs7u/w8fLz9Pf5+vz9/j+SnHQAAAABYktHRE4ZYXHfAAAD70lEQVR42u3ZyVoTQRiF4TiiKDYOoCIzKIiKIohzJCQginX/t+NEk0DSSVf9Q7c+39mlF1Wn3s1ZpNEghBBCCCGEEEIIkWTqSauzkXV/Tz7rHLycqWc3g0ysHodfaZ7eMtn8/Tvs1oCgr5t+xpePwt+s5582Tj5UTjCgm3bGFjv5a0M7/3hw+qlSgoHddHN5/nPoSf6591t4O1vN8wu6aebi3MczTx0MUA1BYTfFzL4/99AigAoIirup5cGbvmcWAzgTDOumlHtrP0IUgCPB8G4qubnyfeAbhwI4EYzqppDrS18LXjgCwIFgdDdxri7sF75vJIAxQZluuuMaD2BIUK6b7rimABgRlO2mO65pABYEpbvpjmsqgDZBRDfdcU0H0CSI6qY7rhIALYLIbrrjKgPQIIjupjuuUgApQUI33XGVA0gIkrrpjqsGQCpBYjfdcdUBSCJI7aY7rloA0QTp3XTHVQ8gikDSTXdcNQFKE8i66Y6rLkApAmk33XHVBhhJIO+mO676AEMJNLrpjqsFQCGBTjfdcbUBGEyg1E13XK0A+gnUuhVnclPcWhEghJ3bJt0Kc/8w1AsgtO5adCvM61A3gPDColthOvUDaFl0K0yoH0Cw6AYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wnAfn5Wq34A+x4AW/lZz+sHsOUA0JnOz7qzVzeAbjc7gM2se1i2Uy+A3m5GAO8enT3u4XZ9AM53MwD4MHeh70AFArNuygCf5i8NPFJMYNhNEeDLwpXCQ4UEpt2UAA6Xrg09VkRg3E0B4NvKjZEHCwjMuwkBjteyUkcnEzh0kwBsT5c+PJHApVvqJeXGVUbg1C3lkrLjKiNw6xZ7SflxlRE4dou5JGZcZQSu3WzGVUbg2s1mXGUErt1sxlVG4NrNZlxlBK7dbMZVRuDazWZcZQSu3WzGVUbg2s1mXGUErt2shl9C4NrNbvjTCVy7WQ5/KoFrN9vhTyNw7WY9/CkErt3shz+ewLWbx/DHErh28xn+OALXbp3uP6mLY43KMrPbfWvbtdvGyRVHy+ONStMlWHftljX/jOvqRKPynBA0M99u2dP23uOpRi0y8+qgvX6rnt0IIYQQQgghhBDyz+Yn4EEWPx6mJe8AAAAASUVORK5CYII=";

export default class TabBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "OverviewTab"
    };
    
    this.renderOverviewTab = this.renderOverviewTab.bind(this)
    this.renderTransactionsTab = this.renderTransactionsTab.bind(this)
    this.renderSettingsTab = this.renderSettingsTab.bind(this)
    this.renderMapviewTab = this.renderMapviewTab.bind(this)
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
          component: OverviewPage,
          passProps: {parentProps: this.props}
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
          component: TransactionsPage,
          passProps: {parentProps: this.props}
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
          component: SettingsPage,
          passProps: {parentProps: this.props}
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
          component: MapviewPage,
          passProps: {parentProps: this.props}
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
          icon = {{uri: overviewIcon, scale: 9}}
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
          icon = {{uri: transactionsIcon, scale: 9}}
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
          icon = {{uri: settingsIcon, scale: 9}}
          onPress={() => {
            this.setState({
              selectedTab: "SettingsTab"
            });
          }}
          >
          {this.renderSettingsTab()}
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Map"
          selected={this.state.selectedTab === "MapviewTab"}
          icon = {{uri: mapIcon, scale: 9}}
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
