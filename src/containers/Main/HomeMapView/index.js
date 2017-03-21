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
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

import {searchAlgolia, priceShort} from '@api/algoliaAPI';
import PriceMarker from '@components/PriceMarker';

import { setMainParams, setMainProperies, setSelectedProperty, setMapRegion } from '@actions/algolia';
import { Icons, Images } from '@theme';
import styles from './styles';

import PropertyPreviewItem from '@components/PropertyPreviewItem';
import {itemsOfPrice, itemsOfRoom, itemsOfSqFtFrom, itemsOfSqFtTo} from '@api/algoliaAPI';



class HomeMapView extends Component {
  constructor(props) {

    super(props);
    this.state = {
      IsDraw: false,
      isPreviewVisible: false,
    };
  }

  componentWillMount() {
    this.SearchPropertiesByAlgolia(this.props.algolia.mapRegion,
                                    this.props.algolia.filters);
  }

  componentWillReceiveProps(nextProps){
    if( JSON.stringify(nextProps.algolia.filters) != JSON.stringify(this.props.algolia.filters) ){
      this.SearchPropertiesByAlgolia(this.props.algolia.mapRegion,
                                      nextProps.algolia.filters);
    }
  }

  onMapRegionChange(region) {
    // this.setState({ mapRegion:region });
    this.setState({isPreviewVisible:false});
  }

  getSearchParam(region, filter) {
      let searchParams = {
        type: ["Condo", "Single Family"],
        hitsPerPage : 20,
      };
      var ne = {lat:region.latitude - region.latitudeDelta / 2,
                lng:region.longitude - region.longitudeDelta / 2};
      var sw = {lat:region.latitude + region.latitudeDelta / 2,
                lng:region.longitude + region.longitudeDelta / 2};
      var strInsideBoundingBox = ne.lat + "," + ne.lng + "," + sw.lat + "," + sw.lng;
      
      searchParams.insideBoundingBox = strInsideBoundingBox;

      if(filter != null) {
        searchParams['beds'] = itemsOfRoom[filter.beds].value;
        searchParams['baths_full'] = itemsOfRoom[filter.baths_full].value;

        if( filter.price.from != 0 ){//Any
          if( searchParams['price'] == null )
            searchParams['price'] = [];
          searchParams['price'].from = itemsOfPrice[filter.price.from].value;
        }
        if( filter.price.to != 0 ) {
          if( searchParams['price'] == null )
            searchParams['price'] = [];
          searchParams['price'].to = itemsOfPrice[filter.price.to].value;
        }

        if( filter.sqft.from != 0 ){
          if( searchParams['sqft'] == null )
            searchParams['sqft'] = [];
          searchParams['sqft'].from = itemsOfSqFtFrom[filter.sqft.from].value;
        }
        if( filter.sqft.to != 0 ){
          if( searchParams['sqft'] == null )
            searchParams['sqft'] = [];
          searchParams['sqft'].to = itemsOfSqFtTo[filter.sqft.to].value;
        }
      }

      return searchParams;
  }

  SearchPropertiesByAlgolia(region, filter){
    // this.setState({ mapRegion:region });
    this.props.setMapRegion(region);

    let searchParams = this.getSearchParam(region, filter);
    this.props.setMainParams(searchParams);

    searchAlgolia(searchParams, (respArr, total) => {
      this.props.setMainProperies(respArr);
    })

  }

  onMapRegionChangeComplete(region) {
    this.SearchPropertiesByAlgolia(region, this.props.algolia.filters);
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

  onClickPropertyPreview() {
console.log("onClickPropertyPreview");
  }

  renderPreivew() {
    let item = this.props.algolia.selectedProperty;
    let index = 0;
    return (
      <PropertyPreviewItem 
        key={index}
        propertyItem={item} 
        propertyIndex={index}
        onClickProperty={this.onClickPropertyPreview.bind(this)} > 
      </PropertyPreviewItem>

    );
  }

  render() {

    return (
      <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            ref={ref => { this.mapView = ref; }}
            initialRegion = {this.props.algolia.mapRegion}
            onRegionChange={this.onMapRegionChange.bind(this)}            
            onRegionChangeComplete={this.onMapRegionChangeComplete.bind(this)}    
            onPress={this.onPressMapView.bind(this)}>
            { this.props.algolia.mainProperties !== null &&
              this.props.algolia.mainProperties.map( marker => (
                <MapView.Marker
                  key= {marker.objectID}
                  onPress = {()=>this.onMapMarkerSelected(marker)}
                  coordinate={{
                  latitude: marker.locSearch[1],
                  longitude: marker.locSearch[0],
                  }}>
                    <PriceMarker
                      amount={priceShort(marker.price)}
                      data = {marker}/>
                </MapView.Marker>
              ))}          
          </MapView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.bubble}
              onPress={ this.onClickCurrentPosition.bind(this)}>
                <Image
                  style={styles.image}
                  resizeMode={'contain'}
                  source={Icons.location} />
            </TouchableOpacity>
          </View>
{
          // <View style={styles.buttonContainer}>
          //   <TouchableOpacity style={styles.bubble}
          //     onPress={ this.onClickCurrentPosition.bind(this)}>
          //       <Image
          //         style={styles.image}
          //         resizeMode={'contain'}
          //         source={Icons.location} />
          //   </TouchableOpacity>
          //   <TouchableOpacity style={styles.bubble}
          //     onPress={ this.onClickDraw.bind(this)}>
          //       <Image
          //         style={styles.image}
          //         resizeMode={'contain'}
          //         source={Icons.pencil} />
          //   </TouchableOpacity>
          // </View>
          // {
          //   this.state.IsDraw && (
          //     <View style={styles.drawContainer}>
          //       <TouchableOpacity style={styles.drawBubble}
          //         onPress={ this.onClickDrawRemove.bind(this)}>
          //         <Text>Remove</Text>
          //       </TouchableOpacity>
          //     </View>
          //   )
          // }
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

    setMainParams: mainParams => dispatch(setMainParams(mainParams)),
    setMainProperies : mainProperties => dispatch(setMainProperies(mainProperties)),
    setSelectedProperty : selectedProperty => dispatch(setSelectedProperty(selectedProperty)),
    setMapRegion: mapRegion => dispatch(setMapRegion(mapRegion)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeMapView);
