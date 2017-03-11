import React, { Component } from 'react';
import {
  Text,
  TextInput,
  Image,
  View,
  Platform,
  TouchableOpacity,
 } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import I18n from 'react-native-i18n';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Icon from 'react-native-vector-icons/Ionicons';
import { MKButton } from 'react-native-material-kit';

import { replaceRoute } from '@actions/route';
import CommonWidgets from '@components/CommonWidgets';
import ActionSheet from '@components/ActionSheet/';
import { Metrics, Styles, Images, Colors, Fonts } from '@theme/';
import Utils from '@src/utils';
import Constants from '@src/constants';
import styles from './styles';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarUri: '',
      username: '',
      email: '',
      password1: '',
      password2: '',
    };
  }
  onTextInputFocus(value) {
    this.setState({ usernameFocus: false, emailFocus: false, password1Focus: false, password2Focus: false });
    this.setState({ [`${value}Focus`]: true });
  }

  doLogin() {
    this.props.replaceRoute('home');
  }
  doSignUp() {
    alert('signup');
  }
  showActionSheetMenu() {
    this.ActionSheet.show();
  }
  onActionSheetMenu(index) {
    const options = {
      quality: 1.0,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    switch (index) {
      case 0:
        ImagePicker.launchCamera(options, (response) => {
          this.onImagePicker(response);
        });
        break;
      case 1:
        ImagePicker.launchImageLibrary(options, (response) => {
          this.onImagePicker(response);
        });
        break;
      default:
    }
  }
  onImagePicker(response) {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else if (response.uri !== undefined) {
      let source = '';
      if (Platform.OS === 'android') {
        source = { uri: response.uri };
      } else {
        source = { uri: response.uri.replace('file://', ''), isStatic: true };
      }
      ImageResizer.createResizedImage(source.uri, 400, 300, 'JPEG', 80)
        .then((resizedImageUri) => {
          this.setState({
            avatarUri: resizedImageUri,
          });
        }).catch((err) => {
          console.log(err);
        });
    }
  }
  render() {
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        extraScrollHeight={0}
        automaticallyAdjustContentInsets={false}>

        <View style={Styles.fullScreen}>
          {CommonWidgets.renderStatusBar('transparent')}
          <Image
            resizeMode={'stretch'}
            style={Styles.fixedFullScreen}
            source={Images.bkgLogin} />
          {/* -----Avatar---- */}
          <View style={[Styles.center, { flex: 5 }]}>
            <View>
              <Image
                resizeMode={'stretch'}
                style={styles.imgAvatar}
                source={this.state.avatarUri === '' ? Images.imgAvatar : { uri: this.state.avatarUri }} />
              <TouchableOpacity
                style={{ position: 'absolute', right: 0, top: 0 }}
                onPress={() => this.showActionSheetMenu()}>
                <Icon
                  name={'ios-add-circle'}
                  color={Colors.brandPrimary}
                  size={40} />
              </TouchableOpacity>
            </View>
            <Text style={[Fonts.style.h4, { color: Colors.textPrimary }]}>
              {I18n.t('UPLOAD_PHOTO')}
            </Text>
          </View>

          {/* -----Body---- */}
          <View style={styles.bodyContainer}>
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.usernameFocus) }]}>
              <TextInput
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('USERNAME')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                onChangeText={text => this.setState({ username: text })}
                returnKeyType={'next'}
                onSubmitEditing={() => this.emailInput.focus()}
                onFocus={() => this.onTextInputFocus('username')}
              />
            </View>
            {CommonWidgets.renderSpacer()}
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.emailFocus) }]}>
              <TextInput
                ref={(c) => { this.emailInput = c; }}
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('EMAIL')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                onChangeText={text => this.setState({ email: text })}
                keyboardType={'email-address'}
                returnKeyType={'next'}
                onSubmitEditing={() => this.pwd1Input.focus()}
                onFocus={() => this.onTextInputFocus('email')}
              />
            </View>
            {CommonWidgets.renderSpacer()}
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.password1Focus) }]}>
              <TextInput
                ref={(c) => { this.pwd1Input = c; }}
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('CREATE_PASSWORD')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                secureTextEntry
                onChangeText={text => this.setState({ password1: text })}
                returnKeyType={'next'}
                onSubmitEditing={() => this.pwd2Input.focus()}
                onFocus={() => this.onTextInputFocus('password1')}
              />
            </View>
            {CommonWidgets.renderSpacer()}
            <View
              style={[styles.textInputContainerStyle,
              { borderColor: Utils.getTextInputBorderColor(this.state.password2Focus) }]}>
              <TextInput
                ref={(c) => { this.pwd2Input = c; }}
                style={[styles.textInputStyle]}
                underlineColorAndroid={'transparent'}
                placeholder={I18n.t('CONFIRM_PASSWORD')}
                placeholderTextColor={Colors.textPlaceholder}
                multiline={false}
                secureTextEntry
                onChangeText={text => this.setState({ password2: text })}
                returnKeyType={'go'}
                onSubmitEditing={() => this.doSignUp()}
                onFocus={() => this.onTextInputFocus('password2')}
              />
            </View>
            {CommonWidgets.renderSpacer()}
            {CommonWidgets.renderMaterialButton(I18n.t('CREATE_ACCOUNT'),
              Colors.brandPrimary, () => this.doSignUp())}
          </View>
          {/* -----BottomArea---- */}
          <View style={styles.bottomAreaRegister}>
            <Text style={[Fonts.style.bottomText, { color: Colors.textPrimary }]}>
              {I18n.t('BY_CREATING')}
            </Text>
            <MKButton
              backgroundColor={'transparent'}
              onPress={() => alert('TODO: TERMS & POLICY')}>
              <Text style={[Fonts.style.hyperButtonText, { color: Colors.textPrimary, marginLeft: 5 }]}>
                {I18n.t('TERMS_POLICY')}
              </Text>
            </MKButton>
          </View>

          <ActionSheet
            ref={(as) => { this.ActionSheet = as; }}
            options={Constants.IP_BUTTONS}
            cancelButtonIndex={Constants.IP_BUTTONS.length - 1}
            onPress={this.onActionSheetMenu.bind(this)}
            tintColor={Colors.textSecondary} />
          {CommonWidgets.renderCloseButton(() => this.props.replaceRoute('login'))}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

Register.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Register);
