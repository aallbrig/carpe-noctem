import { combineReducers } from 'redux';
import { Game as game } from './game';
import { DemoLevel as demoLevel } from 'demoLevel';
module.exports = {
  DemoLevel: combineReducers({
    game,
    demoLevel
  })
}
