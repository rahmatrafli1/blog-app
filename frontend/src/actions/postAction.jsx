import axios from "axios";

export const GET_LIST_POST = "GET_LIST_POST";
export const GET_DETAIL_POST = "GET_DETAIL_POST";

export const getListPost = () => {
  return (dispatch) => {
    dispatch({
      type: GET_LIST_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "GET",
      url: "http://localhost:3000/posts",
      timeout: 120000,
    })
      .then((res) => {
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LIST_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};

export const getListDetailPost = (id) => {
  return (dispatch) => {
    dispatch({
      type: GET_DETAIL_POST,
      payload: {
        loading: true,
        data: false,
        errorMessage: true,
      },
    });

    axios({
      method: "GET",
      url: `http://localhost:3000/posts/${id}`,
      timeout: 120000,
    })
      .then((res) => {
        // console.log(res.data.data);
        dispatch({
          type: GET_DETAIL_POST,
          payload: {
            loading: false,
            data: res.data.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        // console.log(err.message);
        dispatch({
          type: GET_DETAIL_POST,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};
