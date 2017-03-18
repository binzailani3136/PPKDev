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

const itemsOfPrice = [
        {caption:"Any", value:0},
        {caption:"$100,000", value:100000},
        {caption:"$150,000", value:150000},
        {caption:"$200,000", value:200000},
        {caption:"$250,000", value:250000},
        {caption:"$300,000", value:300000},
        {caption:"$350,000", value:350000},
        {caption:"$400,000", value:400000},
        {caption:"$450,000", value:450000},
        {caption:"$500,000", value:500000},
        {caption:"$550,000", value:550000},
        {caption:"$600,000", value:600000},
        {caption:"$650,000", value:650000},
        {caption:"$700,000", value:700000},
        {caption:"$750,000", value:750000},
        {caption:"$800,000", value:800000},
        {caption:"$850,000", value:850000},
        {caption:"$900,000", value:900000},
        {caption:"$950,000", value:950000},
        {caption:"$1,000,000", value:1000000},
        {caption:"$1,500,000", value:1500000},
        {caption:"$2,000,000", value:2000000},
      ];     

class Filter extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedItemOfPriceFrom: 0,
      itemsOfPriceFrom: itemsOfPrice,
      selectedItemOfPriceTo: 0,
      itemsOfPriceTo: itemsOfPrice,
    };
  }

  onChangePriceFrom(index) {
    this.setState({
      selectedItemOfPriceFrom: index,
    })
  }

  onChangePriceTo(index) {
    this.setState({
      selectedItemOfPriceTo: index,
    })
  }

  getPriceState() {
    let state = "";

  console.log(this.state.itemsOfPriceTo[this.state.selectedItemOfPriceTo]);
  console.log(this.state.itemsOfPriceFrom[this.state.selectedItemOfPriceFrom]);
  
    if( this.state.selectedItemOfPriceFrom == 0 && this.state.selectedItemOfPriceTo != 0 ) {
      state = " - " +
              this.state.itemsOfPriceTo[this.state.selectedItemOfPriceTo].caption

    }
    else if( this.state.selectedItemOfPriceFrom != 0 && this.state.selectedItemOfPriceTo == 0 ) {
      state = this.state.itemsOfPriceFrom[this.state.selectedItemOfPriceFrom].caption + 
              " + "

    }
    else if( this.state.selectedItemOfPriceFrom == 0 && this.state.selectedItemOfPriceTo == 0 ) {
      state = "No limit";
    }
    else{
      state = this.state.itemsOfPriceFrom[this.state.selectedItemOfPriceFrom].caption + 
              " - " +
              this.state.itemsOfPriceTo[this.state.selectedItemOfPriceTo].caption

    }

    return state; 
  }

  onClickCancel() {
    this.props.navigator.pop();
  }

  onClickApply() {
    this.props.navigator.pop();
  }

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

        <View style={[Styles.listContainer, { flex: 1, }]}>
          <ScrollView style={{ flex: 1, margin: 20 }}>
            <View style={{flexDirection:'row', 
                          height:30, 
                          justifyContent:'space-between',
                          borderColor:"#D0D0D0",  
                          borderBottomWidth:1}}>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:18}}>
                  Price
                </Text>
              </View>
              <View style={{justifyContent:'center'}}>
                <Text style={{fontSize:15}}>
                  {this.getPriceState()}
                </Text>
              </View>
            </View>
            <View style={{flexDirection:'row', 
                          height:100, 
                          justifyContent:'space-between'}}>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 100}}
                selectedValue={this.state.selectedItemOfPriceFrom}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangePriceFrom(index)}>
                  {this.state.itemsOfPriceFrom.map((item, i) => (
                    <PickerItem label={item.caption} value={i} key={i}/>
                  ))}
              </Picker>
              <Picker style={{width: Metrics.screenWidth * 0.4, height: 100}}
                selectedValue={this.state.selectedItemOfPriceTo}
                itemStyle={{color:"#000", fontSize:20}}
                onValueChange={(index) => this.onChangePriceTo(index)}>
                  {this.state.itemsOfPriceTo.map((item, i) => (
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
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);