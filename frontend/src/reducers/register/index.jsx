import { POST_REGISTER } from "../../actions/registerAction";

const initialStatePost = {
  PostRegisterResult: false,
  PostRegisterLoading: false,
  PostRegisterError: false,
};

const Register = (state = initialStatePost, action) => {
  switch (action.type) {
    case POST_REGISTER:
      return {
        ...state,
        PostRegisterResult: action.payload.data,
        PostRegisterLoading: action.payload.loading,
        PostRegisterError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default Register;
