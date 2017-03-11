import { StyleSheet } from 'react-native';
import { Styles, Fonts, Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  listItemContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultPadding,
  },
  forwardIconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: Metrics.defaultPadding,
  },






  listItemHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: Metrics.listItemHeight * 0.5,
    backgroundColor: Colors.backgroundSecondary,
    paddingHorizontal: Metrics.defaultPadding,
  },
  todoListItemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Metrics.defaultPadding,
  },
  taskListItemView: {
    flex: 1,
    paddingLeft: Metrics.defaultPadding,
    paddingRight: Metrics.defaultPadding,
  },
  updatesListItemView: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Metrics.defaultPadding,
  },
  overviewRowItemContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: Metrics.listItemHeight * 0.5,
    backgroundColor: Colors.brandSecondary,
    paddingHorizontal: Metrics.defaultPadding,
  },
  rowLeftTextStyle: {
    flex: 4,
    alignItems: 'flex-start',
  },
  rowMiddleTextStyle: {
    flex: 3,
    alignItems: 'center',
  },
  rowRightTextStyle: {
    flex: 3,
    alignItems: 'flex-end',
  },
});
