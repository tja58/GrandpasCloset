import { FETCH_ADMIN } from "../actions/types";

export default function adminReducer(state = null, action) {
  switch (action.type) {
    case FETCH_ADMIN:
      return action.payload || false;
    default:
      return state;
  }
}
