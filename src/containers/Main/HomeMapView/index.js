import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image, StyleSheet,
        Platform, NativeModules, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';
import { MKCheckbox, MKRadioButton, MKSlider } from 'react-native-material-kit';

import { replaceRoute, pushNewRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';
import SliderPanel from '@components/SliderPanel';
import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {searchAlgolia, defaultSearchParams, priceShort} from '@api/algoliaAPI';
import PriceMarker from '@components/PriceMarker';

import { setProperies, setSearchParams } from '@actions/algolia';

class HomeMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword: '',

      mapRegion: {
          latitude: 38.138928192103855,
          longitude: -80.53564663281253,
            latitudeDelta: 10,//Zoom of Map = 20
            longitudeDelta: (10 * Metrics.screenWidth) / Metrics.screenHeight,
        },      

      searchProperties:[],
    };
  }

  componentWillMount() {
    searchParams = defaultSearchParams;
    searchParams = this.getSearchParam(searchParams, this.state.mapRegion);
    this.props.setSearchParams(searchParams);

    searchAlgolia(searchParams, (respArr, total) => {
        this.props.setProperies(respArr);//properties;
      })  
  }

  getSearchParam(searchParams, region) {
      delete searchParams.school;
      delete searchParams.school_type;
      delete searchParams.city;
      delete searchParams.community;

      searchParams.type = ["Condo", "Single Family"];

      var ne = {lat:region.latitude - region.latitudeDelta / 2,
                lng:region.longitude - region.longitudeDelta / 2};
      var sw = {lat:region.latitude + region.latitudeDelta / 2,
                lng:region.longitude + region.longitudeDelta / 2};
      strInsideBoundingBox = ne.lat + "," + ne.lng + "," + sw.lat + "," + sw.lng;
      
      searchParams.insideBoundingBox = strInsideBoundingBox;

      return searchParams;
  }

  onMapRegionChange(region) {
    this.setState({ mapRegion:region });
  }

  onMapRegionChangeComplete(region) {
    // this.setState({ mapRegion:region });

    searchParams = defaultSearchParams;
    searchParams = this.getSearchParam(searchParams, region);
    this.props.setSearchParams(searchParams);

    searchAlgolia(searchParams, (respArr, total) => {
        this.props.setProperies(respArr);//properties;
      })  
  }
  

  onMapMarkerSelected(marker) {
  }

  onClickDraw() {
  }

  onClickCurrentPosition() {
console.log("onClickCurrentPosition");    
    this.getCurrentPosition();
  }

  getCurrentPosition() {
    if (Platform.OS === 'ios') {
      NativeModules.RNLocation.requestAlwaysAuthorization();
      NativeModules.RNLocation.startUpdatingLocation();
      NativeModules.RNLocation.setDistanceFilter(5.0);
      DeviceEventEmitter.addListener('locationUpdated', (location) => {
        const locationMe = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 10,
          longitudeDelta: (10 * Metrics.screenWidth) / Metrics.screenHeight,
        };
        this.setState({mapRegion:locationMe});
        // this.onMapRegionChange(locationMe);
      });
    } else {
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message: '<h6>Use Location?</h6>This app wants to change your device settings.',
        ok: 'YES',
        cancel: 'NO',
      }).then(function(success) {
        this.watchID = navigator.geolocation.watchPosition((position) => {
          const locationMe = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 10,
            longitudeDelta: (10 * Metrics.screenWidth) / Metrics.screenHeight,
          };
          // _this.props.setLocation(locationMe);
          this.setState({mapRegion:locationMe});
          // this.onMapRegionChange(locationMe);

        },
        (error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }  

  render() {
console.log("searchAlgolia");    
console.log(this.props.algolia.properties);        
//console.log(this.props.algolia.searchParams);        

    return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion = {this.state.mapRegion}
            region = {this.state.mapRegion}
            onRegionChange={this.onMapRegionChange.bind(this)}            
            onRegionChangeComplete={this.onMapRegionChangeComplete.bind(this)}            
          >
            { this.props.algolia.properties !== null && 
              this.props.algolia.properties.map( marker => (
                <MapView.Marker
                  key= {marker.objectID}
                  coordinate={{
                  latitude: marker.locSearch[1],
                  longitude: marker.locSearch[0],
                  }}
                  title={ priceShort(marker.price) }
                  description={priceShort(marker.price) }
                >
                  <PriceMarker
                    amount={priceShort(marker.price)}
                    selected={this.onMapMarkerSelected.bind(this)}
                  />
                </MapView.Marker>
                
              ))}          
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bubble}
              onPress={ this.onClickDraw.bind(this)}>
                <Text>D</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubble}
              onPress={ this.onClickCurrentPosition.bind(this)}>
                <Text>P</Text>
            </TouchableOpacity>
          </View>
      </View>
          
    );
  }

}

HomeMapView.propTypes = {
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

    setSearchParams: searchParams => dispatch(setSearchParams(searchParams)),
    setProperies : properties => dispatch(setProperies(properties)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  return { globals, algolia };
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    position:'absolute',
    flexDirection: 'column',
    backgroundColor: 'transparent',
    height: 100,
    right:30,
    bottom:30,
  },

  bubble: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(255,255,255,0.7)',
    // paddingHorizontal: 18,
    // paddingVertical: 12,
    width: 50,
    height: 50,
    borderRadius: 5,
    marginBottom:1,
  },    
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView);
