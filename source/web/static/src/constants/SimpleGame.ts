const keyMirror = require('keymirror');

interface IConstants {
  INCREMENT_COUNTER: string;
  DECREMENT_COUNTER: string;
  LOGOUT_USER: string;
}

export const constants:IConstants = keyMirror({
  INCREMENT_COUNTER: null,
  DECREMENT_COUNTER: null,
  LOGOUT_USER: null
});

export default constants;