import React from 'react';
import {
  Platform,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import I18n from 'react-native-i18n';
import { MKButton } from 'react-native-material-kit';
import Rating from '@components/Rating';

import { Metrics, Styles, Icons, Colors, Fonts, Images } from '@theme/';
import Utils from '@src/utils';
import styles from './styles';

const CommonWidgets = {
  renderStatusBar(color) {
    return (
      <StatusBar
        backgroundColor={color}
        barStyle={'light-content'}
        translucent
      />
    );
  },
  renderNavBarHeader(headerText) {
    return (
      <View style={Styles.center}>
        <Text
          style={[Fonts.style.h4,
            { textAlign: 'center',
              width: Metrics.screenWidth * 0.7,
              color: Colors.textPrimary }]}
          numberOfLines={1}>
          {headerText}
        </Text>
      </View>
    );
  },
  renderSpacer() {
    return (
      <View style={{ height: Metrics.screenHeight / 40 }} />
    );
  },
  renderLogo() {
    return (
      <Image
        resizeMode={'stretch'}
        style={Styles.imgLogo}
        source={Images.imgLogo} />
    );
  },
  renderApple(id, size) {
    // size: big(for list item), medium(for rating), small(for rating small)
    let style = Styles.bigAppleImage;
    if (size === 'medium') {
      style = Styles.mediumAppleImage;
    } else if (size === 'small') {
      style = Styles.smallAppleImage;
    }
    return (
      <Image
        style={style}
        resizeMode={'contain'}
        source={Icons.apples[id]} />
    );
  },
  renderMaterialButton(text, color, onPress) {
    return (
      <MKButton
        style={Styles.button}
        backgroundColor={color}
        onPress={onPress}>
        <Text style={Fonts.style.buttonText}>
          {text}
        </Text>
      </MKButton>
    );
  },
  renderMaterialMenuButton(text, icon, onPress) {
    return (
      <MKButton
        style={Styles.horzCenter}
        backgroundColor={'transparent'}
        onPress={onPress}>
        <Image
          style={[Styles.mediumLoveImage, { tintColor: Colors.brandPrimary }]}
          source={icon} />
        <Text style={[Fonts.style.menuButtonText, { color: Colors.brandPrimary, marginLeft: 5 }]}>
          {text}
        </Text>
      </MKButton>
    );
  },
  renderCloseButton(onPress) {
    return (
      <TouchableOpacity
        style={{ position: 'absolute', left: 20, top: Platform.OS === 'android' ? 25 : 30 }}
        onPress={onPress}>
        <Icon name="md-close" size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderNavBarBackButton(onPress) {
    return (
      <TouchableOpacity
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 3 }}
        onPress={onPress} >
        <Icon name="ios-arrow-back" size={30} color={Colors.textPrimary} />
      </TouchableOpacity>
    );
  },
  renderFloatButton(onPress) {
    return (
      <MKButton
        style={{ position: 'absolute', bottom: 10, right: 10, padding: 15 }}
        backgroundColor={Colors.brandPrimary}
        shadowRadius={2}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.5}
        shadowColor={"black"}
        fab
        onPress={onPress}>
        <Image
          pointerEvents="none"
          source={Icons.trend}
          style={{ width: 30, height: 30 }}
          resizeMode={'contain'} />
      </MKButton>
    );
  },
  renderForwardIcon() {
    return (
      <View style={styles.forwardIconContainer}>
        <Icon
          style={{ marginTop: 5 }}
          name={'ios-arrow-forward-outline'}
          size={30}
          color={Colors.textThird}
        />
      </View>
    );
  },
  renderTopicListItem(item, onPress) {
    return (
      <MKButton
        key={item.id}
        style={Styles.listItemContainer}
        backgroundColor={Colors.backgroundSecondary}
        onPress={onPress}>

        <View style={Styles.horzCenter}>
          <View style={[Styles.center, { flex: 3 }]}>
            {item.isTop10 ?
              this.renderApple(0, 'big') : this.renderApple(2, 'big')}
          </View>
          <View style={{ flex: 12 }}>
            <Text style={Fonts.style.listItemTitleText} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={Fonts.style.listItemDescriptionText} numberOfLines={1}>
              3{I18n.t('TIPS_FOUND')}
            </Text>
          </View>
          {this.renderForwardIcon()}
        </View>
      </MKButton>
    );
  },
  renderTipListItem(item, onPress) {
    return (
      <MKButton
        key={item.id}
        style={Styles.listItemContainer}
        backgroundColor={Colors.backgroundSecondary}
        onPress={onPress}>
        <View style={Styles.horzCenter}>
          <View style={[Styles.horzCenter, { flex: 10 }]}>
            {this.renderTipDetails(item)}
          </View>
          {this.renderForwardIcon()}
        </View>
      </MKButton>
    );
  },
  renderTipDetails(item) {
    return (
      <View
        style={[Styles.horzCenter, { backgroundColor: Colors.backgroundSecondary }]}>
        <View style={[Styles.center, { flex: 1 }]}>
          {this.renderApple(item.isTop10, 'big')}
        </View>
        <View style={{ flex: 4 }}>
          <Text style={Fonts.style.listItemTitleText} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={Styles.horzCenter}>
            <Rating
              rating={4}
              max={5}
              iconWidth={Metrics.appleSize / 4}
              iconHeight={Metrics.appleSize / 4}
              editable={false} />
            <Text
              style={[Fonts.style.listItemDescriptionText, { marginLeft: 10 }]}
              numberOfLines={1}>
              14 {I18n.t('REVIEWS')}, 34 {I18n.t('APPLES')}
            </Text>
          </View>
          <View style={Styles.horzCenter}>
            <Image
              style={[Styles.smallLoveImage, { marginLeft: 3 }]}
              resizeMode={'contain'}
              source={Icons.love} />
            <Text
              style={[Fonts.style.listItemDescriptionText,
              { color: Colors.brandPrimary, marginLeft: 5 }]}
              numberOfLines={1}>
              23 {I18n.t('LOVES')}
            </Text>
          </View>
        </View>
      </View>
    );
  },
}



export default CommonWidgets;

/*renderCloseButton(onPress) {
    return (
      <MKButton
        style={{ position: 'absolute', left: 20, top: Platform.OS === 'android' ? 25 : 30 }}
        backgroundColor={'transparent'}
        onPress={onPress}>
        <Icon name="md-close" size={30} color={Colors.textPrimary} />
      </MKButton>
    );
  },
  renderNavBarBackButton(onPress) {
    return (
      <MKButton
        style={{ paddingBottom: Platform.OS === 'android' ? 5 : 3 }}
        backgroundColor={'transparent'}
        onPress={onPress}>
        <Icon name="ios-arrow-back" size={30} color={Colors.textPrimary} />
      </MKButton>
    );
  },*/
