import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  Animated,
} from 'react-native';
import { Icons, Colors, Fonts, Styles } from '@theme';
import { MKButton } from 'react-native-material-kit';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...Fonts.style.h5,
    flex: 9,
    color: Colors.textThird,
    paddingVertical: 5,
    marginLeft: 15,
  },
  button: {
    ...Styles.center,
    flex: 1,
    flexDirection: 'row',
  },
  buttonImage: {
    flex: 1,
    width: 15,
    height: 10,
    marginRight: 5,
    tintColor: Colors.brandPrimary,
  },
  body: {

  },
});


class SlidePanel extends Component {
  constructor(props) {
    super(props);
    this.icons = {
      'up': Icons.up,
      'down': Icons.down,
    };

    this.state = {
      title: props.title,
      expanded: true,
      animation: new Animated.Value(),
    };
  }

  componentWillMount() {

  }
  toggle() {
    const initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;
    const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

    this.setState({ expanded: !this.state.expanded });

    this.state.animation.setValue(initialValue);
    Animated.spring(this.state.animation, { toValue: finalValue }).start();
  }

  _setMaxHeight(event) {
    this.setState({ maxHeight: event.nativeEvent.layout.height });
  }

  _setMinHeight(event) {
    this.setState({ minHeight: event.nativeEvent.layout.height });
  }

  render() {
    let icon = this.icons['down'];
    if (this.state.expanded) {
      icon = this.icons['up'];
    }
    return (
      <Animated.View
        style={[styles.container, { height: this.state.animation }]}>
        <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
          <MKButton
            style={styles.button}
            backgroundColor={Colors.backgroundSecondary}
            onPress={this.toggle.bind(this)}>
            <View style={Styles.horzCenter}>
              <Text style={styles.title}>{this.state.title}</Text>
              <Image
                style={styles.buttonImage}
                source={icon}
                resizeMode={'contain'} />
            </View>
          </MKButton>
        </View>
        <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}

export default SlidePanel;
