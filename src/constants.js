import I18n from 'react-native-i18n';
import { Icons } from '@theme';

const constants = {
  IP_BUTTONS: [
    { key: 0, label: I18n.t('TAKE_PHOTO') },
    { key: 1, label: I18n.t('PICK_FROM_LIBRARY') },
    { key: 2, label: I18n.t('CANCEL') },
  ],
  HOME_TABS: [
    { id: 0, title: 'WHO', icon: Icons.who },
    { id: 1, title: 'WHAT', icon: Icons.what },
    { id: 2, title: 'HOME', icon: Icons.an10na },
    { id: 3, title: 'WATCH', icon: Icons.watch },
    { id: 4, title: 'SHARE', icon: Icons.share },
  ],
  AGE: {
    MIN: 1,
    MAX: 30,
  },
  GRADE: {
    MIN: 1,
    MAX: 30,
  },
};

export default constants;

