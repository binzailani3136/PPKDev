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

class Share extends Component {
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
          title={CommonWidgets.renderNavBarHeader(I18n.t('SHARE'))}
          tintColor={Colors.brandSecondary} />
        <View style={[Styles.center, { flex: 1 }]}>
          {CommonWidgets.renderLogo()}
          {CommonWidgets.renderSpacer()}
          <Text style={[Fonts.style.h5, { color: Colors.textThird }]}>
            {I18n.t('EARN_YOUR_APPLES')}
          </Text>
          {CommonWidgets.renderSpacer()}
          {CommonWidgets.renderMaterialButton(I18n.t('INVITE_YOUR_COLLEAGUES'), Colors.brandPrimary,
            () => alert('Invite_Clicked'))}
          <Text style={styles.shareDescriptionText}>
            {I18n.t('GET')}
            <Text style={[Fonts.style.h5, { color: Colors.brandPrimary }]}>20</Text>
            {I18n.t('INVITE_DESCRIPTION')}
          </Text>
          {CommonWidgets.renderSpacer()}
          {CommonWidgets.renderMaterialButton(I18n.t('SHARE_OUR_APP'), Colors.brandSecondary,
            () => alert('Share_Clicked'))}
          <Text style={styles.shareDescriptionText}>
            {I18n.t('GET')}
            <Text style={[Fonts.style.h5, { color: Colors.brandSecondary }]}>10</Text>
            {I18n.t('SHARE_DESCRIPTION')}
          </Text>
          {CommonWidgets.renderSpacer()}
          {CommonWidgets.renderMaterialButton(I18n.t('GIVE_US_FEEDBACK'), Colors.brandThird,
            () => alert('Feedback_Clicked'))}
          <Text style={[styles.shareDescriptionText, { marginTop: 3 }]}>
            {I18n.t('FEEDBACK_DESCRIPTION')}
          </Text>
        </View>
      </View>
    );
  }
}

Share.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Share);



