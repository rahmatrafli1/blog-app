import { POST_CONTACT } from "../../actions/contactAction";

const initialStatePost = {
  PostContactResult: false,
  PostContactLoading: false,
  PostContactError: false,
};

const Contact = (state = initialStatePost, action) => {
  switch (action.type) {
    case POST_CONTACT:
      return {
        ...state,
        PostContactResult: action.payload.data,
        PostContactLoading: action.payload.loading,
        PostContactError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default Contact;
