import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import DefaultTabBar from '@components/TabBar/DefaultTabBar';

import { replaceRoute, popRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Tips10 from './Tips10';
import Topics10 from './Topics10';

import Dummy from '@src/dummydata';

class Top10 extends Component {
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
          title={CommonWidgets.renderNavBarHeader(I18n.t('TOP_10_TRENDS'))}
          tintColor={Colors.brandSecondary}
          leftButton={CommonWidgets.renderNavBarBackButton(() => this.props.popRoute())} />
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar textStyle={Fonts.style.h4} />}
          tabBarUnderlineStyle={{ backgroundColor: Colors.brandPrimary }}
          tabBarTextStyle={Fonts.style.listItemTextDefault} >
          <Topics10 tabLabel={I18n.t('TOPICS')} navigator={this.props.navigator} />
          <Tips10 tabLabel={I18n.t('TIPS')} navigator={this.props.navigator} />
        </ScrollableTabView>
      </View>
    );
  }
}

Top10.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  popRoute: React.PropTypes.func.isRequired,
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    popRoute: route => dispatch(popRoute()),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, mapDispatchToProps)(Top10);
