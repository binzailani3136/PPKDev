import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Picker } from 'react-native';
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

class Filter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    selected1: 'key1',
    selected2: 'key1',
    selected3: 'key1',
    color: 'red',
    mode: Picker.MODE_DIALOG,

    };
  }

  onClickCancel() {
    this.props.navigator.pop();
  }

  onClickApply() {
    this.props.navigator.pop();
  }

  onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };  

  renderNavBarLeftButton() {
    return (
        <TouchableOpacity style={{paddingBottom: 15}}
          onPress={ this.onClickCancel.bind(this)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
     );
  };  
  
  renderNavBarRightButton() {
    return (
        <TouchableOpacity style={{ paddingBottom: 15}}
          onPress={ this.onClickApply.bind(this)}>
          <Text>Apply</Text>
        </TouchableOpacity>
     );
  };  
  

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={CommonWidgets.renderNavBarHeader('Filters')}
          leftButton={this.renderNavBarLeftButton()}          
          rightButton={this.renderNavBarRightButton()}          
          tintColor={Colors.brandSecondary} />
        <View style={[Styles.center, { flex: 1 }]}>
          <Text>Filter</Text>
          <Picker
            style={{ width:100 }}
            selectedValue={this.state.selected1}
            mode="dialog"
            onValueChange={this.onValueChange.bind(this, 'selected1')}>
            <Picker.Item label="hello" value="key0" />
            <Picker.Item label="world" value="key1" />
            <Picker.Item label="world" value="key2" />
            <Picker.Item label="world" value="key3" />
            <Picker.Item label="world" value="key4" />
            <Picker.Item label="world" value="key5" />
          </Picker>          
        </View>
      </View>
    );
  }

}

Filter.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Filter);