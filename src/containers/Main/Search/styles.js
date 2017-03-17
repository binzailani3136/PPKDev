import { Platform, StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
    mainBody: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width:Metrics.screenWidth,
        height:Metrics.screenHeight-Metrics.navBarHeight,
    },
    
    listItemContainer: {
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
