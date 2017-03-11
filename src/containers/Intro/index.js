import React, { Component } from 'react';
import { connect } from 'react-redux';

import { replaceRoute } from '@actions/route';
import { Text, View, Image } from 'react-native';

import AppIntro from '@components/AppIntro';
import { Styles, Images } from '@theme/';
import styles from './styles';

class Intro extends Component {

  onSlideChangeHandle(index, total) {
    console.log(index, total);
  }
  onSkipBtnHandle(index) {
    this.props.replaceRoute('login');
    console.log(index);
  }
  doneBtnHandle() {
    this.props.replaceRoute('login');
  }
  nextBtnHandle(index) {
    console.log(index);
  }

  render() {
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle.bind(this)}
        onDoneBtnClick={this.doneBtnHandle.bind(this)}
        onSkipBtnClick={this.onSkipBtnHandle.bind(this)}
        onSlideChange={this.onSlideChangeHandle.bind(this)}
      >
        <View style={[styles.slide, { backgroundColor: '#fa931d' }]}>
          <View style={styles.header}>
            <View>
              <Image style={{ width: 75 * 2.5, height: 63 * 2.5 }} source={Images.imgIntro1[0]} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={10}><Text style={styles.title}>AppIntro</Text></View>
            <View level={15}><Text style={styles.description}>Pretty Simple Useful in your app tour!</Text></View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View style={styles.header}>
            <View>
              <Image style={{ width: 75 * 2.5, height: 63 * 2.5 }} source={Images.imgIntro2[0]} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={10}><Text style={styles.title}>Title!</Text></View>
            <View level={15}><Text style={styles.description}>description!</Text></View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#406E9F' }]}>
          <View style={styles.header}>
            <View level={10}>
              <Image style={{ width: 95 * 2.5, height: 55 * 2.5 }} source={Images.imgIntro3[0]} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={10}><Text style={styles.title}>Title!</Text></View>
            <View level={15}><Text style={styles.description}>description!</Text></View>
          </View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#DB4302' }]}>
          <View style={styles.header}>
            <View>
              <Image style={{ width: 50 * 2.5, height: 63 * 2.5 }} source={Images.imgIntro4[0]} />
            </View>
          </View>
          <View style={styles.info}>
            <View level={10}><Text style={styles.title}>Title!</Text></View>
            <View level={15}><Text style={styles.description}>description!</Text></View>
          </View>
        </View>
      </AppIntro>
    );
  }
}
Intro.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  replaceRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    replaceRoute: route => dispatch(replaceRoute(route)),
  };
}
function mapStateToProps(state) {
  return { };
}
export default connect(mapStateToProps, mapDispatchToProps)(Intro);
