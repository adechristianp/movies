import {
  LIST_MOVIES,
  RESET_MOVIES,
  DETAIL_MOVIES,
  RESET_DETAIL_MOVIES,
} from "../_actions/movies";

const defaultState = {
  data: [],
};

export function movies(state = defaultState, action) {
  switch (action.type) {
    case LIST_MOVIES:
      return Object.assign({}, state, {
        data: action.data,
      });
    case RESET_MOVIES:
      return defaultState;
    default:
      return state;
  }
}

export function detailMovies(state = defaultState, action) {
  switch (action.type) {
    case DETAIL_MOVIES:
      return Object.assign({}, state, {
        data: action.data,
      });
    case RESET_DETAIL_MOVIES:
      return defaultState;
    default:
      return state;
  }
}
