import { SIGN_UP, SIGN_IN, AUTO_SIGN_IN, Logout } from '../types';

const authReducerDefaultState = {
  auth: {
    uid: null,
    token: null,
    refToken: null
  }
};

export default function(state = authReducerDefaultState, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        }
      };
    case SIGN_UP:
      return {
        ...state,
        auth: {
          uid: action.payload.localId || false,
          token: action.payload.idToken || false,
          refToken: action.payload.refreshToken || false,
        }
      };
    case AUTO_SIGN_IN:
      return {
        ...state,
        auth: {
          uid: action.payload.user_id || false,
          token: action.payload.id_token || false,
          refToken: action.payload.refresh_token || false
        }
      };
    case Logout:
      return {
        ...state,
        auth: {
          uid: null || false,
          token: null || false,
          refToken: null || false
        }
      };
    default:
      return state;
  }
}
