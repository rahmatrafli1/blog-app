import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListPost } from "../../../actions/postAction";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const ListPost = () => {
  function longString(params) {
    let res = params ? params.substring(0, 100) : "";
    return res + "...";
  }

  const { getListPostResult, getListPostLoading, getListPostError } =
    useSelector((state) => state.PostReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListPost());
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto my-2">
        <h1 className="text-center font-bold text-3xl">Posting Today</h1>
      </div>
      <div className="mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-6">
        {getListPostResult ? (
          getListPostResult.map((posts) => {
            return (
              <div
                className="text-center shadow-lg border rounded-lg"
                key={posts.id}
              >
                <img
                  src={posts.url}
                  alt={posts.title}
                  className="rounded-t-lg"
                />

                <h3 className="text-lg font-bold py-2">{posts.title}</h3>
                <p className="py-2">{longString(posts.content)}</p>
                <Link
                  to={`/post/detailpost/${posts.id}`}
                  className="flex items-center bg-gray-500 text-white border rounded-md mx-4 my-4 py-2 hover:scale-125 justify-center duration-500"
                >
                  <AiOutlineEye className="mr-2" /> Detail Post
                </Link>
              </div>
            );
          })
        ) : getListPostLoading ? (
          <p className="text-center">Loading....</p>
        ) : getListPostError ? (
          getListPostError
        ) : (
          <p className="text-center">Data Kosong</p>
        )}
      </div>
    </>
  );
};

export default ListPost;
