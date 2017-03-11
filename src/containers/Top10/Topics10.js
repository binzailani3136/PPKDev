import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';

import { replaceRoute, popRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import Dummy from '@src/dummydata';

class Topics10 extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onTopicItemPressed(item, index) {
    // this.props.pushNewRoute('tipslist');
    this.props.navigator.push({
      id: 'tipslist',
      passProps: {
        topic: item,
      },
    });
  }

  renderTopics() {
    return (
      Dummy.TOPICS.map((item, index) => (
        CommonWidgets.renderTopicListItem(item, () => this.onTopicItemPressed(item, index))
      ))
    );
  }

  render() {
    return (
      <View style={Styles.listContainer}>
        <ScrollView style={Styles.scrollViewContainer}>
          {this.renderTopics()}
        </ScrollView>
      </View>
    );
  }
}

Topics10.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Topics10);
