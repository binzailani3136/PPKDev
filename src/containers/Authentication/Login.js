import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
 } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import { MKButton } from 'react-native-material-kit';

import { replaceRoute } from '@actions/route';
import OverlaySpinner from '@components/OverlaySpinner';
import CommonWidgets from '@components/CommonWidgets';
import { Styles, Images, Colors, Fonts, Metrics } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';

import { setSpinnerVisible } from '@actions/globals';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onTextInputFocus(value) {
    this.setState({ emailFocus: false, passwordFocus: false });
    this.setState({ [`${value}Focus`]: true });
  }

  doLogin() {
    this.props.setSpinnerVisible(true);
    setTimeout(() => {
      this.props.setSpinnerVisible(false);
      this.props.replaceRoute('home');
    }, 500);
  }
  doFacebookLogin() {
    //this.props.setSpinnerVisible(true);
    setTimeout(() => {
      this.props.setSpinnerVisible(false);
      this.props.replaceRoute('home');
    }, 500);
  }
  doRegister() {
    this.props.replaceRoute('register');
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}>
        <View style={Styles.fullScreen}>
          {CommonWidgets.renderStatusBar('transparent')}
          <Image
            resizeMode={'stretch'}
            style={Styles.fixedFullScreen}
            source={Images.bkgLogin} />
          {/* -----LOGO---- */}
          <View style={[Styles.center, { flex: 5 }]}>
            {CommonWidgets.renderLogo()}
            <Text style={[Fonts.style.h1, { color: Colors.textPrimary }]}>
              {I18n.t('WELCOME')}
            </Text>
          </View>

          {/* -----Body---- */}
          <View style={styles.bodyContainer}>
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.emailFocus) }]}>
              <TextInput
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('EMAIL')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                onChangeText={text => this.setState({ email: text })}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={() => this.loginpwd.focus()}
                onFocus={() => this.onTextInputFocus('email')}
              />
            </View>
            {CommonWidgets.renderSpacer()}
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.passwordFocus) }]}>
              <TextInput
                ref={(c) => { this.loginpwd = c; }}
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('PASSWORD')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                returnKeyType={'go'}
                onSubmitEditing={() => this.doLogin()}
                onFocus={() => this.onTextInputFocus('password')}
              />
            </View>
            <View style={styles.forgotPwdContainer}>
              <MKButton
                backgroundColor={'transparent'}
                onPress={() => this.props.replaceRoute('forgotpwd')}>
                <Text style={[Fonts.style.h6, { color: Colors.textPrimary }]}>
                  {I18n.t('FORGOT_PASSWORD')}
                </Text>
              </MKButton>
            </View>
            {CommonWidgets.renderSpacer()}
            {CommonWidgets.renderSpacer()}
            {CommonWidgets.renderMaterialButton(I18n.t('LOGIN'),
              Colors.brandSecondary, () => this.doLogin())}

            <Text style={[Fonts.style.h6, { color: Colors.textPrimary, marginVertical: 5 }]}>
              {I18n.t('OR')}
            </Text>

            {CommonWidgets.renderMaterialButton(I18n.t('CONNECT_FACEBOOK'),
              Colors.brandThird, () => this.doFacebookLogin())}

          </View>

          {/* -----BottomArea---- */}
          <View style={styles.bottomAreaLogin}>
            <Text style={[Fonts.style.bottomText, { color: Colors.textPrimary }]}>
              {I18n.t('STILL_DONT_HAVE')}
            </Text>
            <MKButton
              backgroundColor={'transparent'}
              onPress={this.doRegister.bind(this)}>
              <Text style={[Fonts.style.hyperButtonText, { color: Colors.textPrimary, marginLeft: 5 }]}>
                {I18n.t('REGISTER_NOW')}
              </Text>
            </MKButton>
          </View>
          <OverlaySpinner visible={this.props.globals.spinnerVisible} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Login.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
