import React, { PropTypes } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  SearchBarDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#b6b6b6',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  SearchBarDisabledInput: {
    flex: 1,
    fontWeight: 'normal',
    color: '#212121',
    backgroundColor: 'transparent',
  },
});

export default class SearchBarDisabled extends React.Component {
  static propTypes = {
    height: PropTypes.number.isRequired,
    autoCorrect: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onSearchChange: PropTypes.func,
    onEndEditing: PropTypes.func,
    onSubmitEditing: PropTypes.func,
    placeholder: PropTypes.string,
    padding: PropTypes.number,
    inputStyle: PropTypes.object,
    iconCloseName: PropTypes.string,
    iconSearchName: PropTypes.string,
    iconBackName: PropTypes.string,
    placeholderColor: PropTypes.string,
    iconColor: PropTypes.string,
    textStyle: PropTypes.object
  }

  static defaultProps = {
    onSearchChange: () => {},
    onEndEditing: () => {},
    onSubmitEditing: () => {},
    inputStyle: {},
    iconCloseName: "md-close",
    iconSearchName: "md-search",
    iconBackName: "md-arrow-back",
    placeholder: "Search...",
    returnKeyType: "search",
    padding: 5,
    placeholderColor: "#bdbdbd",
    iconColor: "#737373",
    textStyle: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      isOnFocus: false,
    };
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _onClose() {
    this._textInput.setNativeProps({ text: '' });
    this.props.onSearchChange({ nativeEvent: { text : ''}});
    if (this.props.onClose) {
      this.props.onClose();
    }
  }

  _onFocus() {
    this.setState({ isOnFocus: true });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  _onBlur() {
    this.setState({ isOnFocus: false });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render() {
    const {
      height,
      width,
      autoCorrect,
      returnKeyType,
      onSearchChange,
      placeholder,
      padding,
      inputStyle,
      iconColor,
      iconBackName,
      iconSearchName,
      iconCloseName,
      placeholderColor,
      textStyle
    } = this.props;

    let { iconSize } = this.props

    iconSize = typeof iconSize !== 'undefined' ? iconSize : height

    return (
      <View
        style={{paddingLeft: padding, paddingRight: padding }}
      >
        <View
          style={
            [
              styles.SearchBarDisabled,
              {
                height: height + 10,
                width: width,
                paddingLeft: height * 0.25,
              },
              inputStyle
            ]
          } >

          <TouchableOpacity syte={{flexDirection:"row", flex:"1", backgroundColor:"red"}}>
            <Icon
              name={iconSearchName} size={height}
              color={iconColor}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onFocus}>
            <Text
              style={
                [styles.SearchBarDisabledInput,
                  {
                    paddingLeft: height * 0.5,
                    paddingTop: height * 0.2,
                    fontSize: height * 0.8,
                    width: width * 0.8,
                    color: "#bdbdbd",
                  },
                  textStyle,
                ]
              }>
              {placeholder}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this._onClose}>
            <Icon
              style={{paddingRight: height * 0.1 }}
              name={iconCloseName} size={iconSize}
              color={iconColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}