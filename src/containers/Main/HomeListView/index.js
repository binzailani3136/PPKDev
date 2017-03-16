import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import NavigationBar from 'react-native-navbar';

import { replaceRoute } from '@actions/route';
import { setSpinnerVisible } from '@actions/globals';

import { Styles, Colors, Fonts, Metrics } from '@theme/';
import CommonWidgets from '@components/CommonWidgets';
import Constants from '@src/constants';
import Utils from '@src/utils';
import styles from './styles';

import { setProperies } from '@actions/algolia';
import {priceShort} from '@api/algoliaAPI';



class HomeListView extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  getImagePath(item) {
    mlsid = item.mlsid;
    iterator = 1;
    resolution = "420x210";
    
    return "https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg"
  }

  renderListItem(item, index) {
    let featured = item.featured;
    return (
      <Image style={styles.listItemContainer} key={index}
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
    );
  }

  render() {
console.log("HomeListView")
console.log(this.props.algolia.properties)
    
    return (
      <View style={Styles.listContainer}>
        <ScrollView style={{ flex: 1, width: Metrics.screenWidth }}>
          { this.props.algolia.properties !== null && 
            this.props.algolia.properties.map((item, index) => (
            this.renderListItem(item, index)
           ))}
        </ScrollView>
      </View>
    );
  }

}

HomeListView.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
  setSpinnerVisible: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
    setSpinnerVisible: spinnerVisible => dispatch(setSpinnerVisible(spinnerVisible)),

    setProperies : properties => dispatch(setProperies(properties)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeListView);