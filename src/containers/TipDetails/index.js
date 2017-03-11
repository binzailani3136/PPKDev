import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Linking, Image } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import Hyperlink from 'react-native-hyperlink';
import { MKButton } from 'react-native-material-kit';

import { replaceRoute, popRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Icons, Metrics, Images } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import DummyData from '@src/dummydata';

class TipDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  onLovePress() {
    alert('love_clicked');
  }
  onGiveApplesPress() {
    alert('giveapples_clicked');
  }
  onWatchPress() {
    alert('watch_clicked');
  }
  onSharePress() {
    alert('share_clicked');
  }
  onOpenUrl(url) {
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  onFlag() {
    alert('flag_clicked');
  }
  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader(I18n.t('TIP_DETAILS'))}
          tintColor={Colors.brandSecondary}
          leftButton={CommonWidgets.renderNavBarBackButton(() => this.props.popRoute())} />
        <View
          style={[Styles.center, { width: Metrics.screenWidth,
            height: Metrics.screenHeight / 8,
            backgroundColor: Colors.backgroundSecondary }]}>
          {CommonWidgets.renderTipDetails(this.props.tip)}
        </View>
        <View
          style={[Styles.horzCenter, { width: Metrics.screenWidth,
            height: Metrics.screenHeight / 16,
            backgroundColor: Colors.backgroundThird,
            justifyContent: 'space-between',
            paddingHorizontal: 10 }]}>
          {CommonWidgets.renderMaterialMenuButton(I18n.t('LOVE'), Icons.love, () => this.onLovePress())}
          {CommonWidgets.renderMaterialMenuButton(I18n.t('GIVE_APPLES_L'), Icons.an10na, () => this.onGiveApplesPress())}
          {CommonWidgets.renderMaterialMenuButton(I18n.t('WATCH_L'), Icons.watch, () => this.onWatchPress())}
          {CommonWidgets.renderMaterialMenuButton(I18n.t('SHARE_L'), Icons.share, () => this.onSharePress())}
        </View>
        <View style={{ flex: 1, padding: Metrics.defaultPadding }}>
          <Text style={[Fonts.style.h5, { color: Colors.textFourth }]}>
            Reference URL
          </Text>
          <Hyperlink onPress={url => this.onOpenUrl(url)}>
            <Text style={[Fonts.style.hyperlinkText, { color: Colors.brandThird }]}>
              https://facebook.github.io/react-native/
            </Text>
          </Hyperlink>
          {CommonWidgets.renderSpacer()}
          <Text style={[Fonts.style.h5, { color: Colors.textFourth }]}>
            Description
          </Text>
          <ScrollView>
            <Text style={[Fonts.style.defaultText, { color: Colors.textThird }]}>
              {DummyData.LOREM_LONG}
            </Text>
            <View style={[Styles.horzCenter, { justifyContent: 'flex-end' }]}>
              <MKButton
                style={{ alignItems: 'flex-end' }}
                backgroundColor={'transparent'}
                onPress={() => this.onFlag()}>
                <Text style={[Fonts.style.h6, { color: Colors.textThird }]}>
                  {I18n.t('FLAG_AS_INAPPROPRIATE')}
                </Text>
              </MKButton>
            </View>
          </ScrollView>
        </View>
        <MKButton
          style={{ width: Metrics.screenWidth,
            height: Metrics.screenHeight / 7,
            borderTopWidth: 1,
            borderColor: Colors.borderPrimary,
            flexDirection: 'row',
            backgroundColor: 'transparent' }}
          onPress={() => this.onFlag()}>
          <View style={[Styles.center, { flex: 3 }]}>
            <Image
              style={Styles.avatar}
              source={Images.imgSampleAvatar} />
          </View>
          <View style={[{ flex: 8, justifyContent: 'center', marginLeft: 10 }]}>
            <Text style={[Fonts.style.h5, { color: Colors.brandPrimary }]}>
              Elsa
            </Text>
            <Text style={Fonts.style.defaultText}>
              IMUT/Art teacher
            </Text>
            <Text style={Fonts.style.listItemDescriptionText}>
              30 posts and 105 apples ate.
            </Text>
          </View>
          {CommonWidgets.renderForwardIcon()}
        </MKButton>
      </View>
    );
  }
}

TipDetails.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TipDetails);
