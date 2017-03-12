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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import SearchBar from '@components/SearchBar';
import {searchAlgolia, defaultSearchParams} from '@api/algoliaAPI';

import Dummy from '@src/dummydata';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',

      mapRegion: {
          latitude: 38.138928192103855,
          longitude: -80.53564663281253,
          latitudeDelta: 10,
          longitudeDelta: 10,
        },
      
      searchProperties:[],
    };
    this.onSearchKeywordInputChange = this.onSearchKeywordInputChange.bind(this);
  }

  componentWillMount() {

    searchParams = defaultSearchParams;
    searchParams.type = ["Condo", "Single Family"];
    searchParams = this.getSearchParam(searchParams);

    searchAlgolia(searchParams, true, false, this.processSearchResult.bind(this));
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });
  }

  getSearchParam(searchParams) {
      delete searchParams.school;
      delete searchParams.school_type;
      delete searchParams.city;
      delete searchParams.community;

      var ne = {lat:this.state.mapRegion.latitude - this.state.mapRegion.latitudeDelta / 2,
                lng:this.state.mapRegion.longitude - this.state.mapRegion.longitudeDelta / 2};
      var sw = {lat:this.state.mapRegion.latitude + this.state.mapRegion.latitudeDelta / 2,
                lng:this.state.mapRegion.longitude + this.state.mapRegion.longitudeDelta / 2};
      strInsideBoundingBox = ne.lat + "," + ne.lng + "," + sw.lat + "," + sw.lng;
      
      searchParams.insideBoundingBox = strInsideBoundingBox;

      return searchParams;
  }

  processSearchResult(respArr, total) {
    console.log('respArr');
    console.log(respArr);
    console.log('total');
    console.log(total);

    // var mapPropertiesMark = [{key: 1, latlng: {latitude: 38.138928192103855, longitude: -80.53564663281253}, title: "test mark", description: "test test" },]
    this.setState({searchProperties:respArr});
  }

  onMapRegionChange(region) {
     this.setState({ mapRegion:region });
// console.log('onMapRegionChange');
// console.log(region);
    searchParams = defaultSearchParams;
    searchParams.type = ["Condo", "Single Family"];
    searchParams = this.getSearchParam(searchParams);

    searchAlgolia(searchParams, true, false, this.processSearchResult.bind(this));

  }

  render() {
    return (
      <View style={Styles.listContainer}>
        {CommonWidgets.renderStatusBar(Colors.brandPrimary)}
        <NavigationBar
          style={Styles.navBarStyle}
          title={this.renderSearchBar()}
          tintColor={Colors.brandSecondary} />
        <View style={styles.mainBody}>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mainMapView}
            initialRegion = {this.state.mapRegion}
            region={this.state.mapRegion}
            onRegionChange={this.onMapRegionChange.bind(this)}            
          >
            {this.state.searchProperties.map( marker => (
                <MapView.Marker
                  key= {marker.objectID}
                  coordinate={{
                  latitude: marker.locSearch[1],
                  longitude: marker.locSearch[0],
                  }}
                  title={marker.price.toString()}
                  description={marker.price.toString()}
                />
              ))}          
          </MapView>
          
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
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignItems: 'center' }}>

          <Text>Map</Text>
          <SearchBar
            onSearchChange={this.onSearchKeywordInputChange.bind(this)}
            height={20}
            width={Metrics.screenWidth * 0.75}
            onFocus={() => console.log('On Focus')}
            onBlur={() => console.log('On Blur')}
            placeholder={'City, Community, School, ZIP'}
            autoCorrect={false}
            padding={10}
            returnKeyType={'search'}
        />
          <Text>Filter</Text>
        </View>
      </View>
    );
  }

}

Home.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
