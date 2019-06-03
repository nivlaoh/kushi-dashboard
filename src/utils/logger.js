import moment from 'moment';

/* eslint no-console: "off" */

export default (message, level = 'INFO', object = '', colorStrOveride = '') => {
  const prependDate = `[${moment(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}]`;
  const browserIsIE = false;
  switch (level) {
    case 'DEBUG':
      if (!process.env.production) {
        console.debug(`${browserIsIE ? '' : '%c'}${prependDate} [DEBUG] - ${message}`, browserIsIE ? '' : (colorStrOveride || 'background: #222; color: #68c1d1'), object);
      }
      break;
    case 'INFO':
      if (!process.env.production) {
        console.info(`${browserIsIE ? '' : '%c'}${prependDate} [INFO] - ${message}`, browserIsIE ? '' : (colorStrOveride || 'background: #222; color: #43ef37'), object);
      }
      break;
    case 'ERROR':
      console.error(`${browserIsIE ? '' : '%c'}${prependDate} [ERROR] - ${message}`, browserIsIE ? '' : (colorStrOveride || 'background: #222; color: #e51426'), object);
      break;
    default:
      console.debug(message);
  }
};
