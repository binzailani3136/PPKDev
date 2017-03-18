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

import {priceShort, timeAgo} from '@api/algoliaAPI';
import { Icons, Images } from '@theme';
import PropertyPreviewItem from '@components/PropertyPreviewItem';

class HomeListView extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onClickPropertyPreview() {
    console.log("onClickPropertyPreview");
  }

  renderListItem(item, index) {
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
      <View style={Styles.listContainer}>
        <ScrollView style={{ flex: 1, width: Metrics.screenWidth }}>
          { this.props.algolia.mainProperties !== null && 
            this.props.algolia.mainProperties.map((item, index) => (
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
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeListView);