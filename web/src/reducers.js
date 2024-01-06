import initialState from './initialState'

import { 
  SHOW_LOADING_MODAL, SIDE_BAR_TOGGLE, 
} from './actionTypes'


function rootReducer(state = initialState, { type, ...rest }) {
  switch (type) {
    default:
      return {...state, ...rest };
  }
}

export default rootReducer
