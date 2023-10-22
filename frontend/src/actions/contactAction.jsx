import axios from "axios";
import Swal from "sweetalert2";

export const POST_CONTACT = "POST_CONTACT";

export const addMessage = (data) => {
  return (dispatch) => {
    dispatch({
      type: POST_CONTACT,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    axios({
      method: "POST",
      url: "http://localhost:3000/contact",
      timeout: 120000,
      data: data,
    })
      .then((res) => {
        // console.log(res.data);
        dispatch({
          type: POST_CONTACT,
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
          type: POST_CONTACT,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};
