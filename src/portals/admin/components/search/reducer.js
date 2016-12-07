import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  active: false,
  choice: null,
  query: '',
  results: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.RESET_SEARCH:
    return INITIAL_STATE

  case actionTypes.ABORT_SEARCH:
    return {
      ...state,
      active: false,
      query: '',
      results: null
    }

  case actionTypes.COMPLETE_SEARCH:
    return {
      ...state,
      active: false,
      choice: state.results[action.model][action.index],
      query: '',
      results: null
    }

  case actionTypes.LOOKUP_REQUEST:
    return {
      ...state,
      query: action.params.q
    }

  case actionTypes.LOOKUP_SUCCESS:
    return {
      ...state,
      results: (state.query.length) ? action.data : null
    }

  default:
    return state
  }

}
