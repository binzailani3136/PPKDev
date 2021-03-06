import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';

import { replaceRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Constants from '@src/constants';
import Utils from '@src/utils';
import styles from '../styles';

class PropertyDetail extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader('Property Detail')}
          tintColor={Colors.brandSecondary} />
        <View style={[Styles.center, { flex: 1 }]}>
          <Text>PropertyDetail</Text>
        </View>
      </View>
    );
  }

}

PropertyDetail.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetail);