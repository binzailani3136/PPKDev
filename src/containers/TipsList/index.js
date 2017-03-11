import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';

import { replaceRoute, popRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Dummy from '@src/dummydata';

class TipsList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
  }

  rowPressed(item, index) {
    this.props.navigator.push({
      id: 'tipdetails',
      passProps: {
        tip: item,
      },
    });
  }
  renderTips() {
    return (
      Dummy.TIPS.map((item, index) => (
        CommonWidgets.renderTipListItem(item, () => this.rowPressed(item, index))
      ))
    );
  }

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader(I18n.t('TIPS_FOR') + this.props.topic.name)}
          tintColor={Colors.brandSecondary}
          leftButton={CommonWidgets.renderNavBarBackButton(() => this.props.popRoute())} />
        <ScrollView style={Styles.scrollViewContainer}>
          {this.renderTips()}
        </ScrollView>
      </View>
    );
  }
}

TipsList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TipsList);
