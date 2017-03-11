import { Text, View, Image, Platform } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Tabs, Tab } from 'react-native-elements';


import { setMainTab } from '@actions/globals';
import Constants from '@src/constants';
import { Metrics, Styles, Colors, Fonts } from '@theme/';
import styles from './styles';

import Home from './Home';
import Who from './Who';
import What from './What';
import Watch from './Watch';
import Share from './Share';

class Main extends Component {

  renderTabButtonIcon(icon, selected) {
    return (
      <View
        style={styles.tabIconsContainer}>
        <Image
          style={{
            marginTop: Platform.OS === 'ios' ? 10 : 5,
            width: Metrics.screenHeight / 25,
            height: Metrics.screenHeight / 25,
            tintColor: selected === true ? Colors.brandPrimary : Colors.textFourth }}
          resizeMode={'contain'}
          source={icon}
        />
      </View>
    );
  }
  renderBody(name) {
    switch (name) {
      case 0:
        return <Who navigator={this.props.navigator} />;
      case 1:
        return <What navigator={this.props.navigator} />;
      case 2:
        return <Home navigator={this.props.navigator} />;
      case 3:
        return <Watch navigator={this.props.navigator} />;
      case 4:
        return <Share navigator={this.props.navigator} />;
      default :
        return <Home navigator={this.props.navigator} />;
    }
  }
  render() {
    const selectedTab = this.props.globals.mainTab;
    const selectedTabButtonStyle = { backgroundColor: Colors.textPrimary };
    const unselectedTabButtonStyle = { backgroundColor: Colors.backgroundPrimary };
    return (
      <View style={[Styles.fullScreen, { backgroundColor: Colors.backgroundPrimary }]}>
        <Tabs tabBarStyle={styles.tabBarStyle}>
          {
            Constants.HOME_TABS.map(item => (
              <Tab
                key={item.id}
                selected={item.title === selectedTab}
                tabStyle={selectedTab === item.title ? selectedTabButtonStyle : unselectedTabButtonStyle}
                title={item.title}
                titleStyle={[Fonts.style.tabButtonText, { color: Colors.textFourth }]}
                selectedTitleStyle={[Fonts.style.tabButtonText, { color: Colors.brandPrimary }]}
                renderIcon={() => this.renderTabButtonIcon(item.icon, false)}
                renderSelectedIcon={() => this.renderTabButtonIcon(item.icon, true)}
                onPress={() => this.props.setMainTab(item.title)}>
                {this.renderBody(item.id)}
              </Tab>
            ))
          }
        </Tabs>
      </View>
    );
  }
}

Main.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  setMainTab: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setMainTab: mainTab => dispatch(setMainTab(mainTab)),
  };
}
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
