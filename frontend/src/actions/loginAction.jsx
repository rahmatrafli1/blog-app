import axios from "axios";

export const POST_LOGIN = "POST_LOGIN";

export const loginUser = (data) => {
  return (dispatch) => {
    dispatch({
      type: POST_LOGIN,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "http://localhost:3000/login",
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: POST_LOGIN,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: POST_LOGIN,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};
