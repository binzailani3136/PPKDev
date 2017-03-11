import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '@theme/';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderColor: Colors.borderPrimary,
    borderWidth: 1,
    marginBottom: Metrics.defaultPadding / 2,
  },
  buttonsContainer: {
    flex: 1,
    borderColor: Colors.borderPrimary,
    borderTopWidth: 1,
    padding: Metrics.defaultPadding / 2,
  },
});
