import { Platform } from 'react-native';

import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';


const Styles = {
  button: {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
    backgroundColor: Colors.brandPrimary,
  },
  buttonSecondary: {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
    backgroundColor: Colors.brandSecondary,
  },
  buttonThird: {
    width: Metrics.buttonWidth,
    height: Metrics.buttonHeight,
    backgroundColor: Colors.brandThird,
  },
  sliderTrack: {
    height: 4,
    borderRadius: 2,
    marginTop: -4,
    backgroundColor: '#e3e5e1',
  },
  sliderScrollThumb: {
    width: Metrics.sliderThumbSize,
    height: Metrics.sliderThumbSize,
    borderRadius: Metrics.sliderThumbSize / 2,
    backgroundColor: 'white',
    borderColor: Colors.brandSecondary,
    borderWidth: 5,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horzCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreen: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  fixedFullScreen: {
    position: 'absolute',
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
    top: 0,
    left: 0,
  },
  listItemContainer: {
    width: Metrics.screenWidth - (Metrics.defaultMargin * 2),
    height: Metrics.listItemHeight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderPrimary,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.backgroundSecondary,
    marginBottom: 5,
  },
  bigAppleImage: {
    width: Metrics.appleSize,
    height: Metrics.appleSize,
  },
  mediumAppleImage: {
    width: Metrics.appleSize / 2,
    height: Metrics.appleSize / 2,
  },
  smallAppleImage: {
    width: Metrics.appleSize / 4,
    height: Metrics.appleSize / 4,
  },
  mediumLoveImage: {
    width: Metrics.appleSize / 3.5,
    height: Metrics.appleSize / 3.5,
  },
  smallLoveImage: {
    width: Metrics.appleSize / 4,
    height: Metrics.appleSize / 4,
  },
  navBarStyle: {
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    backgroundColor: Colors.brandPrimary,
    borderBottomWidth:1,
    borderColor: Colors.borderPrimary,
    height: Metrics.navBarHeight,
    marginTop: Platform.OS === 'ios' ? -Metrics.statusBarHeight : 0,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  imgLogo: {
    width: Metrics.logoSize,
    height: Metrics.logoSize,
  },
  scrollViewContainer: {
    flex: 1,
    paddingTop: Metrics.defaultPadding,
  },
  avatar: {
    width: Metrics.appleSize * 3 / 2,
    height: Metrics.appleSize * 3 / 2,
    borderRadius: Metrics.appleSize * 3 / 4,
  },
  avatarSmall: {
    width: Metrics.appleSize * 3 / 4,
    height: Metrics.appleSize * 3 / 4,
    borderRadius: Metrics.appleSize * 3 / 8,
  },














  buttonShadow: {
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 8,
    },
    shadowColor: '#000',
    shadowRadius: 4,
    elevation: 8,
  },
  buttonShadowSmall: {
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 3,
    },
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 3,
  },
  circleButtonShadow: {
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0, height: 4,
    },
    shadowColor: '#000',
    shadowRadius: 2,
    elevation: 4,
  },
};

export default Styles;
