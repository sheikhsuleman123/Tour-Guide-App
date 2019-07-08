import {
  ADD_PLACE,
  GET_USER_PLACES,
  DELETE_USER_PLACE,
  SEARCH_PLACE,
  RATE_PLACE,
  PROCESS_PLACE_START,
  PROCESS_PLACE_END
} from '../types';

export default function(state = {}, action) {
  switch (action.type) {
    case ADD_PLACE:
      return { ...state, newPlace: action.payload };
    case GET_USER_PLACES:
      return { ...state, userPlaces: action.payload };
    case DELETE_USER_PLACE:
      return { ...state, deleteUserPlace: action.payload };
    case PROCESS_PLACE_START:
      return { ...state, processPlace: action.payload };
    case PROCESS_PLACE_END:
      return { ...state, processPlace: action.payload };
    case SEARCH_PLACE:
      return { ...state, searchPlaces: action.payload };
    case RATE_PLACE:
      return { ...state, ratePlace: action.payload };
    default:
      return state;
  }
}
