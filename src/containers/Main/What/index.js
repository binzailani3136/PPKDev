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
import DummyData from '@src/dummydata';

class What extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentWillMount() {
  }

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader(I18n.t('DO_IT_YOURSELF'))}
          tintColor={Colors.brandSecondary} />
        <View style={[Styles.center, { flex: 1, padding: 15 }]}>
          <View>
            <Text style={[Fonts.style.h4, { color: Colors.textThird }]}>
              {I18n.t('DIY_TOPIC_RULES')}
            </Text>
            <Text style={[Fonts.style.defaultText, { color: Colors.textThird }]}>
              {DummyData.LOREM_SHORT}
            </Text>
            {CommonWidgets.renderSpacer()}
            <Text style={[Fonts.style.h4, { color: Colors.textThird }]}>
              {I18n.t('DIY_TIP_RULES')}
            </Text>
            <Text style={[Fonts.style.defaultText, { color: Colors.textThird }]}>
              {DummyData.LOREM_NORMAL}
            </Text>
          </View>
          {CommonWidgets.renderSpacer()}
          {CommonWidgets.renderSpacer()}
          {CommonWidgets.renderSpacer()}
          <View style={[Styles.center]}>
            {CommonWidgets.renderMaterialButton(I18n.t('SUGGEST_NEW_TOPIC'), Colors.brandPrimary, () => alert('SUGGEST_CLICK'))}
            {CommonWidgets.renderSpacer()}
            {CommonWidgets.renderMaterialButton(I18n.t('POST_NEW_TIP'), Colors.brandPrimary, () => alert('POST_CLICK'))}
          </View>

        </View>
      </View>
    );
  }
}

What.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(What);



