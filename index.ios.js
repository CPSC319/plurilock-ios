// /*
//  */
// 'use strict';
// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';

// import Button from 'react-native-button'
// import ExNavigator from '@exponent/react-native-navigator';
// // import MainPage from "./app/MainPage"

// let YourRouter = {
// getMainRoute() {
//     return {
//       // You can also render a scene yourself when you need more control over
//       // the props of the scene component
//       renderScene(navigator) {
//         let MainPage = require('./app/MainPage');
//         return <MainPage navigator={navigator}/>;
//       },

//       // There are onWillBlur and onDidBlur events when the scene loses focus.
//       // These events occur when another scene will focus or did focus,
//       // respectively. The difference between "will" and "did" is the start and
//       // end of the scene transition.
//       onDidBlur(event) {
//         console.log(`Profile Scene for lost focus.`);
//       },

//       // You can render arbitrary views for the title component. Note that you
//       // also need to implement getTitle if you want the title of this route to
//       // show up in the back button to it.


//     };
//   },

// };

// class BioAuthiOS extends Component {
//   render() {
//     return (
//         <View style={styles.toppad}>
//         <Button onPress={() => {
//           // Get a route object from the router

//           let route = YourRouter.getMainRoute();

//           this.props.navigator.push(route);
//         }}>
//           Navigate to a profile
//         </Button>
//         </View>
//     );
//   }


// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   toppad: {
//       marginTop: 40,
//   }
// });

'use strict';

var React = require('react-native');

//import ExNavigator from '@exponent/react-native-navigator';

var Button = require('react-native-button');
var YourRouter = require('./app/route.js');
import MainPage from './app/MainPage'
import TabBar from './app/TabBar'
import LoginPage from './app/LoginPage'


var {
  AppRegistry,
  View,
  Text,
  Navigator,
} = React;

class BioAuthiOS extends React.Component {
  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={{
          id: 'login'
        }}
        renderScene={(route, navigator) => {
          // alert(route.prop)
          if(route.id === 'login') {
            return <LoginPage route={route} navigator={navigator} />
          } else if(route.id === 'tabBar') {
            return <TabBar route={route} navigator={navigator} />
          } 
        }}
      />
      //<MainPage/>
      // <ExNavigator
      //   initialRoute={YourRouter.getHomeRoute()}
      //   style={{ flex: 1 }}
      //   sceneStyle={{ paddingTop: 20}}
      //   showNavigationBar={false}
      // />
    );
  }
}



AppRegistry.registerComponent('BioAuthiOS', () => BioAuthiOS);
