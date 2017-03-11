import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import { SearchBar } from 'react-native-elements';
import { MKCheckbox, MKRadioButton, MKSlider } from 'react-native-material-kit';

import { replaceRoute, pushNewRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';
import SliderPanel from '@components/SliderPanel';
import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import styles from '../styles';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import Dummy from '@src/dummydata';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',
      useFilter: true,
      searchBy: I18n.t('AGE'),
      sliderValue: 10,
      containerHeight: 0,
    };
    this.radioGroup = new MKRadioButton.Group();
    this.onSearchKeywordInputChange = this.onSearchKeywordInputChange.bind(this);
    this.onUseFilterChkBoxChange = this.onUseFilterChkBoxChange.bind(this);
    this.onSearchByRadioChange = this.onSearchByRadioChange.bind(this);
    this.onConfirmSliderValue = this.onConfirmSliderValue.bind(this);
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  onGoClick() {
    // TODO : Integrate with search API
    this.props.setSpinnerVisible(true);
    setTimeout(() => {
      this.props.setSpinnerVisible(false);
    }, 1000);
  }

  onUseFilterChkBoxChange(object) {
    this.setState({ useFilter: object.checked });
  }

  onSearchByRadioChange(object, option) {
    if (object.checked === true) {
      this.setState({ searchBy: option });
    }
  }

  onConfirmSliderValue(sliderValue) {
    this.setState({ sliderValue: Math.round(sliderValue) });
    // TODO: Search
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

  getContainerHeight(containerHeight) {
    this.setState({ containerHeight });
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
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader(I18n.t('APP_NAME'))}
          tintColor={Colors.brandSecondary} />
        <View style={styles.ppkBody}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            region={{
              latitude: 49.444433,
              longitude: 32.059767,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  pushNewRoute: React.PropTypes.func.isRequired,
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    pushNewRoute: route => dispatch(pushNewRoute(route)),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
