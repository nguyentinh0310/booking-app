import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN } from 'redux/contants';

let user = JSON.parse(localStorage.getItem('userData'));
const initialState = {
  user: user ? user : {},
  isLogged: false,
  isAdmin: false,
  isLoading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogged: true,
      };
    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user.user,
        isAdmin: action.payload.isAdmin,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
