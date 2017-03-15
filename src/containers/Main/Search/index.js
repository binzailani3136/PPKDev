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

import SearchBar from '@components/SearchBar';


class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',      
    };
  }

  onClickFilter() {
    console.log('On Focus');
  }

  onRemoveFilter() {
    console.log('On Remove');
  }

  onClickCancel() {
    this.props.navigator.pop();
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }
  

  renderNavBarRightButton() {
    return (
        <TouchableOpacity style={{paddingBottom: 15}}
          onPress={ this.onClickCancel.bind(this)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
     );
  };  

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          rightButton={this.renderNavBarRightButton()}          
          title={this.renderSearchBar()}
          tintColor={Colors.brandSecondary} />
        <View style={styles.mainBody}>

          <Text>Search</Text>          

        </View>
      </View>
    );
  }

  renderSearchBar() {
    return (
      <View style={Styles.center}>
        <View
          style={{ flexDirection: 'row',
            marginTop: 15,
            justifyContent: 'flex-end',
            alignSelf: 'center',
            alignItems: 'center' }}>

        <TouchableOpacity
          onPress={ this.onClickFilter.bind(this)}>
          <SearchBar
            onSearchChange={this.onSearchKeywordInputChange.bind(this)}
            height={20}
            width={Metrics.screenWidth * 0.65}
            onFocus={() =>{this.onClickFilter()}}
            onClose={() =>{this.onRemoveFilter()}}
            onBlur={() => console.log('On Blur')}
            placeholder={'City, Community, School'}
            autoCorrect={false}
            padding={15}
            returnKeyType={'search'} />
        </TouchableOpacity>
            
        </View>
      </View>
    );
  }

}

Search.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);