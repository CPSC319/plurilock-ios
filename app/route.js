'use strict';

var React = require('react-native');
var {
  View,
  Text,
  Image
} = React;

var Button = require('react-native-button');

let YourRouter = {
  getHomeRoute() {
    return {
      // Return a React component class for the scene. It receives a prop
      // called `navigator` that you can use to push on more routes.
      getSceneClass() {
        return require('./LoginPage');
      },

      // When this scene receives focus, you can run some code. We're just
      // proxying the `didfocus` event that Navigator emits, so refer to
      // Navigator's source code for the semantics.
      onDidFocus(event) {
        console.log('Home Scene received focus.');
      },

      // Return a string to display in the title section of the navigation bar.
      // This route's title is displayed next to the back button when you push
      // a new route on top of this one.
    };
  },


  getMainRoute() {
    return {
      // You can also render a scene yourself when you need more control over
      // the props of the scene component
      renderScene(navigator) {
        let MainPage = require('./MainPage');
        return <MainPage/>;
      },

      // There are onWillBlur and onDidBlur events when the scene loses focus.
      // These events occur when another scene will focus or did focus,
      // respectively. The difference between "will" and "did" is the start and
      // end of the scene transition.
      onDidBlur(event) {
        console.log(`Scene lost focus.`);
      },

      // You can render arbitrary views for the title component. Note that you
      // also need to implement getTitle if you want the title of this route to
      // show up in the back button to it.



    };
  },
};

var styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleName: {
    marginLeft: 5,
    fontWeight: 'bold'
  },
  titlePhoto: {
    height: 30,
    width: 30,
    borderRadius: 15,

  }

};

module.exports = YourRouter