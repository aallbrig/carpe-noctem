const keyMirror = require('keymirror');

export interface SimpleGameConstants {
  INCREMENT_COUNTER: string;
  DECREMENT_COUNTER: string;
  LOGOUT_USER: string;
}

export const constants: SimpleGameConstants = keyMirror({
  INCREMENT_COUNTER: null,
  DECREMENT_COUNTER: null,
  LOGOUT_USER: null
});

export default constants;
