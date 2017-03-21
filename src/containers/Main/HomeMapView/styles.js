import { Platform, StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    position:'absolute',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    height: 40,
//    height: 80,
    right:30,
    bottom:30,
  },

  bubble: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 40,
    height: 40,
    borderRadius: 5,
    marginBottom:1,
  },    

  drawContainer: {
    position:'absolute',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    height: 40,
    right:80,
    bottom:30,
  },

  drawBubble: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: 70,
    height: 40,
    borderRadius: 5,
    marginBottom:1,
  },    
  

  image: {
    width: 25,
    height: 25,
  },  

  listItemContainer: {
      position:'absolute',
      left:0,
      right:0,
      bottom:0,
      width: Metrics.screenWidth,
      height: Metrics.screenHeight / 3,
  },
  featureMark: {
      ...Styles.center, 
      width: Metrics.screenWidth / 4,
      height: 30,
      backgroundColor: Colors.brandThird,
      position: 'absolute',
      left: 5,
      top: 5, 
  },
  listItemBottomArea: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0,
      width: Metrics.screenWidth,
      height: Metrics.screenHeight / 8,
      backgroundColor: '#555A',
  },
  bottomInfoFactorsArea: {
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRightWidth: 1,
      borderColor: '#FFF',
  },
  bottomInfoFactorNumber: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 15,
  },
  bottomInfoFactorDesc: {
      color: '#FFF',
      fontSize: 14 
  },
  bottomInfoDetailsDesc: {
      color: '#FFF',
      width: Metrics.screenWidth * 0.55,
  },  
});
