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

import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import SegmentedControlTab from 'react-native-segmented-control-tab'
import {itemsOfPrice, itemsOfRoom, itemsOfSqFtFrom, itemsOfSqFtTo} from '@api/algoliaAPI';

import { setFilters } from '@actions/algolia';

class Filter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItemOfPriceFrom: 0,
      // itemsOfPriceFrom: itemsOfPrice,
      selectedItemOfPriceTo: 0,
      // itemsOfPriceTo: itemsOfPrice,

      selectedItemOfBeds: 1,
      // itemsOfBeds: itemsOfRoom,
      selectedItemOfBaths: 1,
      // itemsOfBaths: itemsOfRoom,

      selectedItemOfSqFtFrom: 0,
      // itemsOfSqFtFrom: itemsOfSqFtFrom,
      selectedItemOfSqFtTo: 0,
      // itemsOfSqFtTo: itemsOfSqFtTo,
    };
  }

  componentWillMount() {
    let vfilters =this.props.algolia.filters;

    if( vfilters != null) {
      this.setState({
        selectedItemOfPriceFrom: vfilters.price.from,
        selectedItemOfPriceTo: vfilters.price.to,
        selectedItemOfSqFtFrom: vfilters.sqft.from,
        selectedItemOfSqFtTo: vfilters.sqft.to,
        selectedItemOfBeds : vfilters.beds,
        selectedItemOfBaths : vfilters.baths_full,

        reload: false,
      });
    }

  }

  onChangePriceFrom(index) {
    if( index != 0 ){
      if( this.state.selectedItemOfPriceTo != 0 && index>= this.state.selectedItemOfPriceTo ){
        this.setState({
          reload: !this.state.reload,
        })
        return;
      }
    }

    this.setState({
      selectedItemOfPriceFrom: index,
    })
  }

  onChangePriceTo(index) {
    if( index != 0 ){
      if( this.state.selectedItemOfPriceFrom != 0 && index<= this.state.selectedItemOfPriceFrom ){
        this.setState({
          reload: !this.state.reload,
        })
        return;
      }
    }
    
    this.setState({
      selectedItemOfPriceTo: index,
    })
  }

  getPriceState() {
    let state = "";

    if( this.state.selectedItemOfPriceFrom == 0 && this.state.selectedItemOfPriceTo != 0 ) {
      state = " - " +
              itemsOfPrice[this.state.selectedItemOfPriceTo].caption

    }
    else if( this.state.selectedItemOfPriceFrom != 0 && this.state.selectedItemOfPriceTo == 0 ) {
      state = itemsOfPrice[this.state.selectedItemOfPriceFrom].caption + 
              " + "

    }
    else if( this.state.selectedItemOfPriceFrom == 0 && this.state.selectedItemOfPriceTo == 0 ) {
      state = "No limit";
    }
    else{
      state = itemsOfPrice[this.state.selectedItemOfPriceFrom].caption + 
              " - " +
              itemsOfPrice[this.state.selectedItemOfPriceTo].caption

    }

    return state; 
  }

  onTabPressBeds(index) {
    this.setState({
      selectedItemOfBeds: index,
    })
  }

  onTabPressBaths(index) {
    this.setState({
      selectedItemOfBaths: index,
    })
  }

  onChangeSqFtFrom(index) {
    if( index != 0 ){
      if( this.state.selectedItemOfSqFtTo != 0 && index>= this.state.selectedItemOfSqFtTo ){
        this.setState({
          reload: !this.state.reload,
        })
        return;
      }
    }

    this.setState({
      selectedItemOfSqFtFrom: index,
    })
  }

  onChangeSqFtTo(index) {
    if( index != 0 ){
      if( this.state.selectedItemOfSqFtFrom != 0 && index>= this.state.selectedItemOfSqFtFrom ){
        this.setState({
          reload: !this.state.reload,
        })
        return;
      }
    }

    this.setState({
      selectedItemOfSqFtTo: index,
    })
  }

  getSqFtState() {
    let state = "";

    if( this.state.selectedItemOfSqFtFrom == 0 && this.state.selectedItemOfSqFtTo != 0 ) {
      state = " - " +
              itemsOfSqFtTo[this.state.selectedItemOfSqFtTo].caption

    }
    else if( this.state.selectedItemOfSqFtFrom != 0 && this.state.selectedItemOfSqFtTo == 0 ) {
      state = itemsOfSqFtFrom[this.state.selectedItemOfSqFtFrom].caption + 
              " + "

    }
    else if( this.state.selectedItemOfSqFtFrom == 0 && this.state.selectedItemOfSqFtTo == 0 ) {
      state = "No limit";
    }
    else{
      state = itemsOfSqFtFrom[this.state.selectedItemOfSqFtFrom].caption + 
              " - " +
              itemsOfSqFtTo[this.state.selectedItemOfSqFtTo].caption
    }

    return state; 
  }

  onClickCancel() {
    this.props.navigator.pop();
  }

  onClickApply() {
    this.props.navigator.pop();

    let filters = {
      beds : this.state.selectedItemOfBeds,
      baths_full : this.state.selectedItemOfBaths,
      price: {
        from: this.state.selectedItemOfPriceFrom,
        to: this.state.selectedItemOfPriceTo,
      },
      sqft: {
        from: this.state.selectedItemOfSqFtFrom,
        to: this.state.selectedItemOfSqFtTo,
      }      
    };

    this.props.setFilters(filters);    
  }

  renderNavBarLeftButton() {
    return (
        <TouchableOpacity style={{paddingBottom: 15}}
          onPress={ this.onClickCancel.bind(this)}>
          <Text style={{color:'black'}}>Cancel</Text>
        </TouchableOpacity>
     );
  };  
  
  renderNavBarRightButton() {
    return (
        <TouchableOpacity style={{ paddingBottom: 15}}
          onPress={ this.onClickApply.bind(this)}>
          <Text style={{color:'black'}}>Apply</Text>
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

        <View style={[Styles.listContainer, { flex: 1, }]}>
          <ScrollView style={{ flex: 1, padding: 20 }}>

            <View style={{flexDirection:'row', 
                          height:30, 
                          justifyContent:'space-between',
                          borderColor:"#D0D0D0",  
                          borderBottomWidth:1}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:18, color:'black'}}>
                  Price
                </Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:15, color:'black'}}>
                  {this.getPriceState()}
                </Text>
              </View>
            </View>

            <View style={{flexDirection:'row', 
                          height:200, 
                          justifyContent:'space-between'}}>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 200}}
                selectedValue={this.state.selectedItemOfPriceFrom}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangePriceFrom(index)}>
                  {itemsOfPrice.map((item, i) => (
                    <PickerItem label={item.caption} value={i} key={i}/>
                  ))}
              </Picker>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 200}}
                selectedValue={this.state.selectedItemOfPriceTo}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangePriceTo(index)}>
                  {itemsOfPrice.map((item, i) => (
                    <PickerItem label={item.caption} value={i} key={i}/>
                  ))}
              </Picker>
            </View>

            {CommonWidgets.renderSpacer(1)}
            <View style={{flexDirection:'row', 
                          height:30, 
                          justifyContent:'flex-start',
                          borderColor:"#D0D0D0",  
                          borderBottomWidth:1}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:18, color:'black'}}>
                  Beds
                </Text>
              </View>
            </View>
            {CommonWidgets.renderSpacer(1)}
            <SegmentedControlTab
                values={[itemsOfRoom[0].caption,
                        itemsOfRoom[1].caption,
                        itemsOfRoom[2].caption,
                        itemsOfRoom[3].caption,
                        itemsOfRoom[4].caption,
                        itemsOfRoom[5].caption, ]}
                selectedIndex = {this.state.selectedItemOfBeds}
                onTabPress={this.onTabPressBeds.bind(this)} />            
            {CommonWidgets.renderSpacer(1)}
            <View style={{flexDirection:'row', 
                          height:30, 
                          justifyContent:'flex-start',
                          borderColor:"#D0D0D0",  
                          borderBottomWidth:1}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:18, color:'black'}}>
                  Baths
                </Text>
              </View>
            </View>
            {CommonWidgets.renderSpacer(1)}
            <SegmentedControlTab
                values={[itemsOfRoom[0].caption,
                        itemsOfRoom[1].caption,
                        itemsOfRoom[2].caption,
                        itemsOfRoom[3].caption,
                        itemsOfRoom[4].caption,
                        itemsOfRoom[5].caption, ]}
                selectedIndex = {this.state.selectedItemOfBaths}
                onTabPress={this.onTabPressBaths.bind(this)} />            


            {CommonWidgets.renderSpacer(1)}
            <View style={{flexDirection:'row', 
                          height:30, 
                          justifyContent:'space-between',
                          borderColor:"#D0D0D0",  
                          borderBottomWidth:1}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:18, color:'black'}}>
                  Sq. Ft.
                </Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:15, color:'black'}}>
                  {this.getSqFtState()}
                </Text>
              </View>
            </View>

            <View style={{flexDirection:'row', 
                          height:200, 
                          justifyContent:'space-between'}}>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 200}}
                selectedValue={this.state.selectedItemOfSqFtFrom}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangeSqFtFrom(index)}>
                  {itemsOfSqFtFrom.map((item, i) => (
                    <PickerItem label={item.caption} value={i} key={i}/>
                  ))}
              </Picker>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 200}}
                selectedValue={this.state.selectedItemOfSqFtTo}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangeSqFtTo(index)}>
                  {itemsOfSqFtTo.map((item, i) => (
                    <PickerItem label={item.caption} value={i} key={i}/>
                  ))}
              </Picker>
            </View>

          </ScrollView>

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

    setFilters: filters => dispatch(setFilters(filters)),
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);