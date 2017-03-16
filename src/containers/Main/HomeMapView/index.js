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

import {searchAlgolia, priceShort} from '@api/algoliaAPI';
import PriceMarker from '@components/PriceMarker';

import { setProperies, setSearchParams, setSelectedProperty } from '@actions/algolia';
import { Icons, Images } from '@theme';
import styles from './styles';

class HomeMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
          latitude: 38.138928192103855,
          longitude: -80.53564663281253,
          latitudeDelta: 10,//Zoom of Map = 20
          longitudeDelta: (10 * Metrics.screenWidth) / Metrics.screenHeight,
        },      

      IsDraw: false,
      isPreviewVisible: false,
    };
  }

  componentWillMount() {
    this.onMapRegionChangeComplete(this.state.mapRegion)
  }

  getSearchParam(region) {

      let searchParams = {
        type: ["Condo", "Single Family"],
        hitsPerPage : 20,
      };
      var ne = {lat:region.latitude - region.latitudeDelta / 2,
                lng:region.longitude - region.longitudeDelta / 2};
      var sw = {lat:region.latitude + region.latitudeDelta / 2,
                lng:region.longitude + region.longitudeDelta / 2};
      strInsideBoundingBox = ne.lat + "," + ne.lng + "," + sw.lat + "," + sw.lng;
      
      searchParams.insideBoundingBox = strInsideBoundingBox;

      return searchParams;
  }

  onMapRegionChange(region) {
    // this.setState({ mapRegion:region });
    this.setState({isPreviewVisible:false});
  }

  onMapRegionChangeComplete(region) {
    this.setState({ mapRegion:region });

    let searchParams = this.getSearchParam(region);
    this.props.setSearchParams(searchParams);

    searchAlgolia(searchParams, (respArr, total) => {
        this.props.setProperies(respArr);//properties;
      })  
  }
  
  onPressMapView() {
  }

  onMapMarkerSelected(marker) {
    this.props.setSelectedProperty(marker);
    this.setState({isPreviewVisible:true});    
  }

  onClickDraw() {
    this.setState({IsDraw:true});
  }

  onClickDrawRemove() {
    this.setState({IsDraw:false});
  }
  

  onClickCurrentPosition() {
    this.setCurrentPosition();
  }

  setCurrentPosition() {
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

        this.mapView && this.mapView.animateToRegion(locationMe);
        // mapView.animateToCoordinate
        // this.setState({mapRegion:locationMe});
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

          this.mapView && this.mapView.animateToRegion(locationMe);
          // this.setState({mapRegion:locationMe});

        },
        (error) => {
          console.log(error);
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }  

  getImagePath(item) {
    mlsid = item.mlsid;
    iterator = 1;
    resolution = "420x210";
    
    return "https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg"
  }

  renderPreivew() {
    item = this.props.algolia.selectedProperty;
    let featured = item.featured;
    return (
      <View style={styles.listItemContainer}>
        <Image
          style={styles.listItemContainer}
          source={Images.imgPreviewLogo} />
        <Image style={styles.listItemContainer}
          onLoadStart={(e) => this.setState({loading: true})}
          onLoadEnd={(e) => this.setState({loading: false})}
          source={{ uri: this.getImagePath(item) }}>
          {featured === true ?
          <View style={styles.featureMark}>
            <Text style={{ color: '#FFF' }}>FEATURED</Text>
          </View> : null}
          <View style={styles.listItemBottomArea}>
            <View style={{ flex: 3 }}>
              <View style={{ flex: 3, paddingLeft: 10 }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 18 }}>
                  {priceShort(item.price)}
                </Text>
              </View>
              <View style={{ flex: 5, flexDirection: 'row' }}>
                <View style={{ flex: 4, justifyContent: 'space-between', paddingLeft: 10 }}>
                  <Text
                    style={[styles.bottomInfoDetailsDesc, { fontSize: 14 }]}
                    numberOfLines={1}>
                    {item.heading || item.beds + " Beds / " + item.baths_full + " Baths" }
                  </Text>
                  <Text
                    style={[styles.bottomInfoDetailsDesc, { fontSize: 15 }]}
                    numberOfLines={1}>
                    {item.address}
                  </Text>
                </View>
                <View style={{ flex: 3, flexDirection: 'row', paddingRight: 10 }}>
                  <View style={[styles.bottomInfoFactorsArea, { flex: 4 }]}>
                    <Text style={styles.bottomInfoFactorNumber}>
                      {item.beds}
                    </Text>
                    <Text style={styles.bottomInfoFactorDesc}>
                      Beds
                    </Text>
                  </View>
                  <View style={[styles.bottomInfoFactorsArea, { flex: 4 }]}>
                    <Text style={styles.bottomInfoFactorNumber}>
                      {item.baths_full}
                    </Text>
                    <Text style={styles.bottomInfoFactorDesc}>
                      Baths
                    </Text>
                  </View>
                  <View style={[styles.bottomInfoFactorsArea, { flex: 5 }]}>
                    <Text style={styles.bottomInfoFactorNumber}>
                      {item.sqft}
                    </Text>
                    <Text style={styles.bottomInfoFactorDesc}>
                      Sq.Ft.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
              backgroundColor: '#6A6A6A',  paddingHorizontal: 10}}>
              <Text style={{ color: '#CCC', fontSize: 12 }}>
                  {item.city + " * " + ( item.community ? item.community : "" ) }
              </Text>
              <Text style={{ color: '#FFF', fontSize: 12 }}>
                4 days ago
              </Text>
            </View>
          </View>
        </Image>
      </View>
    );
  }
  

  render() {
    return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={ref => { this.mapView = ref; }}
            initialRegion = {this.state.mapRegion}
            onRegionChange={this.onMapRegionChange.bind(this)}            
            onRegionChangeComplete={this.onMapRegionChangeComplete.bind(this)}    
            onPress={this.onPressMapView.bind(this)}        
          >
            { this.props.algolia.properties !== null && 
              this.props.algolia.properties.map( marker => (
                <MapView.Marker
                  key= {marker.objectID}
                  onPress = {()=>this.onMapMarkerSelected(marker)}
                  coordinate={{
                  latitude: marker.locSearch[1],
                  longitude: marker.locSearch[0],
                  }}
                >
                    <PriceMarker
                      amount={priceShort(marker.price)}
                      data = {marker}
                    />
                </MapView.Marker>
                
              ))}          
          </MapView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bubble}
              onPress={ this.onClickDraw.bind(this)}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={Icons.pencil} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bubble}
              onPress={ this.onClickCurrentPosition.bind(this)}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={Icons.location} />
            </TouchableOpacity>
          </View>
          {
            this.state.IsDraw && (
              <View style={styles.drawContainer}>
                <TouchableOpacity style={styles.drawBubble}
                  onPress={ this.onClickDrawRemove.bind(this)}>
                  <Text>Remove</Text>
                </TouchableOpacity>
              </View>
            )
          }

          {
            this.state.isPreviewVisible ? this.renderPreivew() : null
          }
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
    setSelectedProperty : selectedProperty => dispatch(setSelectedProperty(selectedProperty)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView);
