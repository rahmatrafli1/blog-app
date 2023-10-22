import axios from "axios";
import Swal from "sweetalert2";

export const POST_REGISTER = "POST_REGISTER";

export const RegisterUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: POST_REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    await axios({
      method: "POST",
      url: "http://localhost:3000/register",
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: POST_REGISTER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
        Swal.fire("Sukses", res.data.message, "success");
      })
      .catch((err) => {
        // console.log(err.message);
        dispatch({
          type: POST_REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};
