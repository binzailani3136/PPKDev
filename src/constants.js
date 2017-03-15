import I18n from 'react-native-i18n';
import { Icons } from '@theme';

const constants = {
  IP_BUTTONS: [
    { key: 0, label: I18n.t('TAKE_PHOTO') },
    { key: 1, label: I18n.t('PICK_FROM_LIBRARY') },
    { key: 2, label: I18n.t('CANCEL') },
  ],
  HOME_TABS: [
    { id: 0, title: 'Find Homes', icon: Icons.an10na },
    { id: 1, title: 'New Homes', icon: Icons.who },
    { id: 2, title: 'My Favorites', icon: Icons.share },
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

