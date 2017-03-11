import { Image } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import settings from 'react-native-simple-store';
import { setTheme } from 'react-native-material-kit';

import { replaceRoute } from '@actions/route';
import { Styles, Images, Colors } from '@theme/';
import CONFIGS from '@src/configs';


class Splash extends Component {
  constructor(props) {
    super(props);
    setTheme({
      checkboxStyle: {
        fillColor: Colors.brandSecondary,
        borderOnColor: Colors.brandSecondary,
        borderOffColor: Colors.brandSecondary,
        rippleColor: Colors.rippleSecondary,
      },
      radioStyle: {
        fillColor: Colors.brandSecondary,
        borderOnColor: Colors.brandSecondary,
        borderOffColor: Colors.brandSecondary,
        rippleColor: Colors.rippleSecondary,
      },
      primaryColor: Colors.brandSecondary,
      accentColor: 'transparent',
    });
  }
  componentWillMount() {
    setTimeout(() => {
      settings.get(CONFIGS.SECOND_RUN).then((secondRun) => {
        if (secondRun === true) {
          this.props.replaceRoute('login');
        } else {
          settings.save(CONFIGS.SECOND_RUN, true).then(() => this.props.replaceRoute('intro'));
        }
      });
    }, 1500);
  }

  render() {
    return (
      <Image
        resizeMode={'cover'}
        style={[Styles.fullScreen]}
        source={Images.bkgSplash} />
    );
  }
}

Splash.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
