import { POST_LOGIN } from "../../actions/loginAction";

const initialStatePost = {
  LoginResult: false,
  LoginLoading: false,
  LoginError: false,
};

const Login = (state = initialStatePost, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return {
        ...state,
        LoginResult: action.payload.data,
        LoginLoading: action.payload.loading,
        LoginError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default Login;
