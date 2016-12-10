import { combineReducers } from 'redux'

module.exports = {
  DemoLevel: combineReducers({
    exampleReducer: (state = {}, action) => {
      switch (action.type) {
        default:
          return state
      }
    },
    game: (state = {
      height: 540,
      width: 540
    }, action) => {
      switch (action.type) {
        default:
          return state
      }
    }
  })
}
