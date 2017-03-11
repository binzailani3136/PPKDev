import React, { Component } from 'react';
import I18n from 'react-native-i18n';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import { Styles, Metrics } from '@theme/';
import styles from './styles';
import CommonWidgets from '@components/CommonWidgets';
import Utils from '@src/utils';

class CardItemOverview extends Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.container}>
        {CommonWidgets.renderListHeader(I18n.t('VERSION') + ' ' + item.id, Utils.getStringFromDate(item.date))}
        {CommonWidgets.renderOverviewSubHeader(I18n.t('STATUS'), I18n.t('ISSUES'), '%')}
        { // Render Table Data
          item.data.map((obj, index) => (
            CommonWidgets.renderOverviewRowItem(index, Utils.getHeaderString(obj.status), obj.issues, obj.percent + '%')
          ))
        }
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[Styles.center, Styles.buttonStyle1]}
            onPress={this.props.onPressTopButton}
          >
            <Text style={Styles.buttonTextStyle1}>{I18n.t('BURNDOWN_CHART')}</Text>
          </TouchableOpacity>
          <View style={{ height: Metrics.defaultPadding / 2 }} />
          <TouchableOpacity
            style={[Styles.center, Styles.buttonStyle2]}
            onPress={this.props.onPressBottomButton}
          >
            <Text style={Styles.buttonTextStyle2}>{I18n.t('TIME_TRACKING_REPORT')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
CardItemOverview.propTypes = {
  onPressTopButton: React.PropTypes.func.isRequired,
  onPressBottomButton: React.PropTypes.func.isRequired,
};
CardItemOverview.defaultProps = {
  onPressTopButton: () => { alert('TopPressed'); },
  onPressBottomButton: () => { alert('BottomPressed'); },
};
function mapStateToProps(state) {
  const globals = state.get('globals');
  return { globals };
}

export default connect(mapStateToProps, null)(CardItemOverview);
