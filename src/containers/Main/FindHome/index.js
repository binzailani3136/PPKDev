import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import { MKCheckbox, MKRadioButton, MKSlider } from 'react-native-material-kit';

import { replaceRoute, pushNewRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';
import SliderPanel from '@components/SliderPanel';
import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import styles from '../styles';

import SearchBar from '@components/SearchBarDisabled';
import {searchAlgolia, priceShort} from '@api/algoliaAPI';
import PriceMarker from '@components/PriceMarker';

import HomeMapView from '@containers/Main/HomeMapView';
import HomeListView from '@containers/Main/HomeListView';

class FindHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',

      isViewMode: true,
    };

    this.onSearchKeywordInputChange = this.onSearchKeywordInputChange.bind(this);
  }

  componentWillMount() {
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  onClickMap() {
    if( this.state.isViewMode == true )
      this.setState({isViewMode:false});
    else
      this.setState({isViewMode:true});
  }

  onClickFilter() {
    console.log('On Focus');

    //pushNewRoute
    this.props.navigator.push({
      id: 'search',
      passProps: {
      },
    });
  }

  onRemoveFilter() {
    console.log('On Remove');
  }

  renderViewMode() {
    if( this.state.isViewMode == true ) {
      return (
        <HomeMapView>
        </HomeMapView>
      );
      
    } 
    else {
      return (
        <HomeListView>
        </HomeListView>
      );
    }   
  }

  renderNavBarLeftButton() {
    return (
        <TouchableOpacity style={{ paddingBottom: 15}}
          onPress={ this.onClickMap.bind(this)}>
          <Text>{this.state.isViewMode ? "List" : "Map"}</Text>
        </TouchableOpacity>
     );
  };  
  
  renderNavBarRightButton() {
    return (
        <TouchableOpacity style={{ paddingBottom: 15}}
          onPress={ this.onClickFilter.bind(this)}>
          <Text>Filter</Text>
        </TouchableOpacity>
     );
  };  

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          leftButton={this.renderNavBarLeftButton()}          
          rightButton={this.renderNavBarRightButton()}          
          title={this.renderSearchBar()}
          tintColor={Colors.brandSecondary} />
        <View style={styles.mainBody}>
          {this.renderViewMode()}
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

FindHome.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(FindHome);
