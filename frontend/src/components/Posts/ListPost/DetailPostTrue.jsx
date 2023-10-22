import React, { useEffect } from "react";
import Navbar from "../../layout/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getListDetailPost } from "../../../actions/postAction";
import { useParams } from "react-router-dom";

const DetailPostTrue = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    getListDetailPostResult,
    getListDetailPostLoading,
    getListDetailPostError,
  } = useSelector((state) => state.PostReducer);

  useEffect(() => {
    dispatch(getListDetailPost(id));
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      <div className="mx-auto grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 px-6 py-2">
        {getListDetailPostResult ? (
          <div
            className="text-center shadow-lg border rounded-lg"
            key={getListDetailPostResult.id}
          >
            <img
              src={getListDetailPostResult.url}
              alt={getListDetailPostResult.title}
              className="rounded-t-lg w-full"
            />

            <h3 className="text-lg font-bold py-2">
              {getListDetailPostResult.title}
            </h3>
            <p>By: {getListDetailPostResult.user.name}</p>
            <p className="py-2">{getListDetailPostResult.content}</p>
          </div>
        ) : getListDetailPostLoading ? (
          <p className="text-center">Loading....</p>
        ) : getListDetailPostError ? (
          getListDetailPostError
        ) : (
          <p className="text-center">Data Kosong</p>
        )}
      </div>
    </>
  );
};

export default DetailPostTrue;
