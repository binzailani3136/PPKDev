import React, { PropTypes } from 'react';
import {
  TextInput,
  StyleSheet,
  Platform,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Styles, Fonts, Colors, Metrics, Images } from '@theme/';
import {priceShort, timeAgo} from '@api/algoliaAPI';

const CachedImage = require('react-native-cached-image');
const {
    ImageCacheProvider
} = CachedImage;


const styles = StyleSheet.create({
    listItemContainer: {
        width: Metrics.screenWidth,
        height: Metrics.screenHeight / 3,
    },
    featureMark: {
        ...Styles.center, 
        width: Metrics.screenWidth / 4,
        height: 30,
        backgroundColor: Colors.brandThird,
        position: 'absolute',
        left: 5,
        top: 5, 
    },
    listItemBottomArea: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        width: Metrics.screenWidth,
        height: Metrics.screenHeight / 8,
        backgroundColor: '#555A',
    },
    bottomInfoFactorsArea: {
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRightWidth: 1,
        borderColor: '#FFF',
    },
    bottomInfoFactorNumber: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    bottomInfoFactorDesc: {
        color: '#FFF',
        fontSize: 14 
    },
    bottomInfoDetailsDesc: {
        color: '#FFF',
        width: Metrics.screenWidth * 0.55,
    },  
});

export default class PropertyPreviewItem extends React.Component {
  static propTypes = {
    onClickProperty: PropTypes.func,
    propertyItem: PropTypes.object,
    propertyIndex: PropTypes.number,   
  }

  static defaultProps = {
    onClickProperty: () => {},    
    propertyItem: null,
    propertyIndex: 0,   
  }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setImageLoadingByCache();
  }

  componentWillUnmount() {
    this.removeImageLoadedByCache();
  }

  componentDidMount() {
  }

  setImageLoadingByCache()
  {
      let item = this.props.propertyItem;
      let mlsid = item.mlsid;
      let resolution = "420x210";

      let imgURLs = [];
      if( item.piccount < 1 ) {
        return null;
      }
      else {
          let iterator = 1;
          let imgURL="https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg";
          imgURLs.push(imgURL);
      }

      ImageCacheProvider.cacheMultipleImages(imgURLs);
  }

  removeImageLoadedByCache(){
      let item = this.props.propertyItem;
      let mlsid = item.mlsid;
      let resolution = "420x210";

      let imgURLs = [];
      if( item.piccount < 1 ) {
        return null;
      }
      else {
          let iterator = 1;
          let imgURL="https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg";
          imgURLs.push(imgURL);
      }

      ImageCacheProvider.deleteMultipleCachedImages(imgURLs);
  }

  getImageURL(index) {
    let item = this.props.propertyItem;
    let mlsid = item.mlsid;
    let resolution = "420x210";
    if( item.piccount > 0 && index < item.piccount ){
      let iterator = index + 1;
      let imgURL="https://i.palmettopark.net/" + mlsid + "-" + iterator + "-" + resolution + ".jpg";
      return { uri: imgURL};
    }
    else {
      return require('@assets/images/darkbg.png');
    }
  }


  render() {
    let item = this.props.propertyItem;
    let index = this.props.propertyIndex;
    
    return (
      <TouchableOpacity 
        style={styles.listItemContainer} 
        key={index}
        onPress={this.props.onClickProperty} >
{
        // <Image
        //   style={styles.listItemContainer}
        //   source={Images.imgPreviewLogo} />
        // <Image style={styles.listItemContainer}
        //   source={{ uri: this.getImagePath(item) }}>
}        
        <CachedImage
            source={this.getImageURL(0)}
            defaultSource={Images.imgPreviewLogo}
            style={styles.listItemContainer}>

          {item.featured === true ?
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
                {timeAgo(item.date.listed.sec)}
              </Text>
            </View>
          </View>
        </CachedImage>
      </TouchableOpacity>
    );
  }
}