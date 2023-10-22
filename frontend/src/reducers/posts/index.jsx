import { GET_LIST_POST, GET_DETAIL_POST } from "../../actions/postAction";

const initialStatePost = {
  getListPostResult: false,
  getListPostLoading: false,
  getListPostError: false,
  getListDetailPostResult: false,
  getListDetailPostLoading: false,
  getListDetailPostError: false,
};

const Post = (state = initialStatePost, action) => {
  switch (action.type) {
    case GET_LIST_POST:
      return {
        ...state,
        getListPostResult: action.payload.data,
        getListPostLoading: action.payload.loading,
        getListPostError: action.payload.errorMessage,
      };
    case GET_DETAIL_POST:
      return {
        ...state,
        getListDetailPostResult: action.payload.data,
        getListDetailPostLoading: action.payload.loading,
        getListDetailPostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default Post;
