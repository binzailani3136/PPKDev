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

import SearchBar from '@components/SearchBar';

import {searchSchoolWithAlgolia, 
        searchPropertyWithAlgolia, 
        searchCommunityWithAlgolia, 
        searchCityWithAlgolia, 
        searchAlgolia, 
        priceShort} from '@api/algoliaAPI';
import { setSearchParams, 
        setSearchCommunities, 
        setSearchProperties, 
        setSearchCities, 
        setSearchSchools, 
        setSelectedProperty } from '@actions/algolia';
import { Icons, Images } from '@theme';
import styles from './styles';

import Icon from 'react-native-vector-icons/Ionicons';

class Search extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      searchKeyword:null,      
    };
  }

  componentDidMount() {
    this.showRecentSearchResult();
  }

  onClickFilter() {
  }

  onRemoveFilter() {
  }

  onClickCancel() {
    this.props.navigator.pop();
  }

  getSearchParam(text) {
    let searchParams = {
      query:text,         
      hitsPerPage : 4,
    };

    return searchParams;
  }

  onSearchKeywordInputChange(keyword) {
    this.setState({ searchKeyword: keyword });

    this.props.setSearchSchools(null);
    this.props.setSearchCommunities(null);
    this.props.setSearchCities(null);
    this.props.setSearchProperties(null);

    if( keyword == "" || keyword == null || keyword == undefined )
      return;    

    let searchParams = this.getSearchParam(keyword);

    this.props.setSearchParams(searchParams);

    searchSchoolWithAlgolia(searchParams, (respArr, error) => {
        this.props.setSearchSchools(respArr);
      })  

    searchCommunityWithAlgolia(searchParams, (respArr, error) => {
        this.props.setSearchCommunities(respArr);
      })  

    searchCityWithAlgolia(searchParams, (respArr, error) => {
        this.props.setSearchCities(respArr);
      })  

    searchPropertyWithAlgolia(searchParams, (respArr, error) => {
        this.props.setSearchProperties(respArr);
      })  

  }


  showRecentSearchResult() {
    let recentSearchText = "";
    this.onSearchKeywordInputChange(recentSearchText);
  }

  renderNavBarRightButton() {
    return (
        <TouchableOpacity style={{paddingBottom: 15}}
          onPress={ this.onClickCancel.bind(this)}>
          <Text>Cancel</Text>
        </TouchableOpacity>
     );
  };  

  renderSearchedSchools() {
    
    return (
      <View style={{width:Metrics.screenWidth }}>
        <View style={{flexDirection:'row',
                      justifyContent:'flex-start', 
                      alignItems:'center', 
                      height:30, 
                      paddingLeft:20, 
                    
                   }}>
          <View style={{flex:1}}>
            <Icon name="md-school" size={20} color={Colors.textPrimary} />
          </View>
          <View style={{flex:17}}>
            <Text style={{ fontWeight:'bold' }}> Schools </Text>
          </View>
        </View>

        {
          this.props.algolia.searchSchools !== null && this.props.algolia.searchSchools !== undefined ? 
          this.props.algolia.searchSchools.map((item, index) => (
          this.renderSearchedSchoolsItem(item, index)
          )) : 
          null
        }
        
      </View>
    ) 
  }
  renderSearchedSchoolsItem(item, index) {
    if( item.school == null )
      return null;

    return (
      <View style={{flexDirection:'row',
                    justifyContent:'flex-start', 
                    alignItems:'center', 
                    height:40, 
                    paddingLeft:20, }}
            key = {index}>
                    
        <View style={{flex:1}}>
        </View>
        <View style={{flex:17, borderColor:"#D0D0D0",  borderBottomWidth:1, paddingBottom:5}}>
          <Text style={{ width: Metrics.screenWidth * 0.85, 
                        fontSize:15 }} numberOfLines={1}> {item.school} </Text>
        </View>
      </View>
    );    
  }

  renderSearchedCities() {
    
    return (
      <View style={{width:Metrics.screenWidth }}>
        <View style={{flexDirection:'row',
                      justifyContent:'flex-start', 
                      alignItems:'center', 
                      height:30, 
                      paddingLeft:20, 
                    
                   }}>
          <View style={{flex:1}}>
            <Icon name="md-pin" size={20} color={Colors.textPrimary} />
          </View>
          <View style={{flex:17}}>
            <Text style={{ fontWeight:'bold' }}> Cities </Text>
          </View>
        </View>

        {
          this.props.algolia.searchCities !== null && this.props.algolia.searchCities !== undefined ? 
          this.props.algolia.searchCities.map((item, index) => (
          this.renderSearchedCitiesItem(item, index)
          )) : 
          null
        }
        
      </View>
    ) 
  }
  renderSearchedCitiesItem(item, index) {
    if( item.city == null )
      return null;

    return (
      <View style={{flexDirection:'row',
                    justifyContent:'flex-start', 
                    alignItems:'center', 
                    height:40, 
                    paddingLeft:20, }}
            key = {index}>
                    
        <View style={{flex:1}}>
        </View>
        <View style={{flex:17, borderColor:"#D0D0D0",  borderBottomWidth:1, paddingBottom:5}}>
          <Text style={{ width: Metrics.screenWidth * 0.85, 
                        fontSize:15 }} numberOfLines={1}> {item.city} </Text>
        </View>
      </View>
    );    
  }
  

  renderSearchedCommunities() {

    return (
      <View style={{width:Metrics.screenWidth }}>
        <View style={{flexDirection:'row',
                      justifyContent:'flex-start', 
                      alignItems:'center', 
                      height:30, 
                      paddingLeft:20, 
                    
                   }}>
          <View style={{flex:1}}>
            <Icon name="md-pin" size={20} color={Colors.textPrimary} />
          </View>
          <View style={{flex:17}}>
            <Text style={{ fontWeight:'bold' }}> Communities </Text>
          </View>
        </View>

        {
          this.props.algolia.searchCommunities !== null && this.props.algolia.searchCommunities !== undefined ? 
          this.props.algolia.searchCommunities.map((item, index) => (
          this.renderSearchedCommunitiesItem(item, index)
          )) : 
          null
        }
        
      </View>
    ) 
  }
  renderSearchedCommunitiesItem(item, index) {
      if( item.community == null )
        return null;

      return (
        <View style={{flexDirection:'row',
                      justifyContent:'flex-start', 
                      alignItems:'center', 
                      height:40, 
                      paddingLeft:20, }}
              key = {index}>
                      
          <View style={{flex:1}}>
          </View>
          <View style={{flex:17, borderColor:"#D0D0D0",  borderBottomWidth:1, paddingBottom:5}}>
            <Text style={{ width: Metrics.screenWidth * 0.85, 
                          fontSize:15 }} numberOfLines={1}> {item.community} </Text>
          </View>
        </View>
      );    
  }


  renderSearchedProperties() {

    return (
      <View style={{width:Metrics.screenWidth }}>
        <View style={{flexDirection:'row',
                      justifyContent:'flex-start', 
                      alignItems:'center', 
                      height:30, 
                      paddingLeft:20, 
                    
                   }}>
          <View style={{flex:1}}>
            <Icon name="md-pin" size={20} color={Colors.textPrimary} />
          </View>
          <View style={{flex:17}}>
            <Text style={{ fontWeight:'bold' }}> Properties </Text>
          </View>
        </View>

        {
          this.props.algolia.searchProperties !== null && this.props.algolia.searchProperties !== undefined ? 
          this.props.algolia.searchProperties.map((item, index) => (
            this.renderSearchedPropertiesItems(item, index)
          )) : 
          null
        }
        
      </View>
    ) 
  }
  getPicImagePath(item) {
    mlsid = item.mlsid;
    iterator = 1;
    resolution = "50x50";
    
    return "https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg"
  }
  renderSearchedPropertiesItems(item, index) {
    if( item.address == null )
      return null;

    return (
      <View style={{flexDirection:'row',
                    justifyContent:'flex-start', 
                    alignItems:'center', 
                    height:50, 
                    paddingLeft:20, }}
            key = {index}>
        <View style={{flex:1}}>
        </View>
        <View style={{flex:17, flexDirection:'row', borderColor:"#D0D0D0",  borderBottomWidth:1, paddingBottom:5, }}>
          <View style={{flex:1}}>
            <Image style={{height:40, width:40}}
              source={{ uri: this.getPicImagePath(item)}} />          
          </View>
          <View style={{flex:5, justifyContent: 'center'}}>
            <Text style={{width: Metrics.screenWidth * 0.85, fontSize:15 }}
                  numberOfLines={1}>
                  {item.address}
            </Text>
          </View>
        </View>
      </View>
    );    

  }

  renderRecentSearch() {
    return (
      <View style={{backgroundColor:'#0F04'}}>
        <Text> tttttt</Text>
      </View>
    )    
  }

  renderSavedSearch() {
    return (
      <View style={{backgroundColor:'#0F05'}}>
        <Text> ppp</Text>
      </View>
    )    
  }

  renderCommunities() {
    return (
      <View style={Styles.listContainer}>
        <ScrollView style={{ flex: 1, width: Metrics.screenWidth}}>
          <View style={{ flex: 1, height: 10 }}>
          </View>
            { 
              // this.state.searchKeyword !== null && this.state.searchKeyword !== "" ? 
              // this.renderRecentSearch() :
              // null
            }
            {
              //  this.state.searchKeyword !== null && this.state.searchKeyword !== ""  ? 
              // this.renderSavedSearch() :
              // null
            }
            {this.renderSearchedSchools()}
            {this.renderSearchedCities()}
            {this.renderSearchedCommunities()}
            {this.renderSearchedProperties()}
        </ScrollView>
      </View>
    )    
  }

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
          {this.renderCommunities()}
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
            focus = {true}
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

    setSearchParams: searchParams => dispatch(setSearchParams(searchParams)),
    setSearchCommunities : searchCommunities => dispatch(setSearchCommunities(searchCommunities)),
    setSearchProperties : searchProperties => dispatch(setSearchProperties(searchProperties)),
    setSearchCities : searchCities => dispatch(setSearchCities(searchCities)),
    setSearchSchools : searchSchools => dispatch(setSearchSchools(searchSchools)),
    
    setSelectedProperty : selectedProperty => dispatch(setSelectedProperty(selectedProperty)),
    
  };
}

function mapStateToProps(state) {
  const globals = state.get('globals');
  const algolia = state.get('algolia');
  return { globals, algolia };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);