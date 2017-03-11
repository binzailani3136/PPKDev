import I18n from 'react-native-i18n';
import { Metrics, Styles, Images, Colors, Fonts } from '@theme/';

const Utils = {
  getTextInputBorderColor(state) {
    return state ? Colors.borderFocused : Colors.borderSecondary;
  },
  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  clone(obj) {
    if (obj == null || typeof obj !== 'object') return obj;
    let copy = obj.constructor();
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  },
  getStringFromDate(date) {
    const month = (date.getMonth() + 1);
    const day = date.getDate();
    const year = date.getFullYear();
    // if (month.length < 2) month = '0' + month;
    // if (day.length < 2) day = '0' + day;
    return day + '/' + month + '/' + year;
  },
  getAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  },
  todayOrYesterday(date) {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();
    if (isToday) return 0;
    if (isYesterday) return 1;
    return 2;
  },
  isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  },
  getHeaderString(abbText) {
    if (abbText === 'IP') {
      return I18n.t('IN_PROGRESS');
    } else if (abbText === 'TD') {
      return I18n.t('TODO');
    } else if (abbText === 'DN') {
      return I18n.t('DONE');
    } else if (abbText === 'RR') {
      return I18n.t('REVIEW_READY');
    }
    return '';
  },
};

export default Utils;
