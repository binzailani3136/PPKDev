import { Platform, StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  mainBody: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width:Metrics.screenWidth,
    height:Metrics.screenHeight-Metrics.navBarHeight-Metrics.tabHeight,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1962dd',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
