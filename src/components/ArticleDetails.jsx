import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import {
  articlesApi,
  deleteArticleAPI,
  useDeleteArticleMutation,
  useGetSingleArticleQuery,
} from "../service/api";
import { Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowLeft, BackHand, Delete } from "@mui/icons-material";

const ArticleDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleArticleQuery(id);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [deleteArticle] = useDeleteArticleMutation();
  const deleteHandler = async () => {
    try {
      const res = await deleteArticle(id);
      console.log(res);
      dispatch(articlesApi.util.resetApiState());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container px-5 pt-10 pb-28">
      <div className="flex max-w-[700px] mb-5 mx-auto justify-between items-center">
        <Link to="../">
          <Button
            startIcon={<ArrowBackIos />}
            variant="outlined"
            size="sm"
            color="primary"
          >
            Back
          </Button>
        </Link>
        <p className="text-sm text-gray-500">{location.pathname}</p>
      </div>
      {isLoading ? (
        <div className="py-20 text-center text-5xl text-gray-400">
          <i className="fa fa-circle-notch fa-spin"></i>
        </div>
      ) : (
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-2xl font-bold mb-7">{data.title}</h2>
          <div className="w-full">
            <img
              className="w-full object-contain max-h-[400px]"
              src={
                data.image
                  ? `https://mustafocoder.pythonanywhere.com/api${data.image}`
                  : "https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500"
              }
              alt={data.title}
            />
          </div>
          <p className="mt-7">{data.content}</p>
          {user?.username == data?.author && (
            <div className="space-x-2 mt-10">
              <button
                onClick={() => navigate(`/update-article/${data.id}`)}
                className="px-3 py-1.5 rounded hover:bg-blue-700 bg-blue-600 text-white"
              >
                <i className="fa fa-pencil"></i>
              </button>
              <button
                onClick={() => setOpen(true)}
                className="px-3 py-1.5 rounded hover:bg-red-700 bg-red-500 text-white"
              >
                <i className="fa fa-trash"></i>
              </button>
            </div>
          )}
        </div>
      )}
      {open && (
        <div className="fixed w-full top-0 start-0 h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="p-5 bg-white dark:bg-black rounded">
            <h3>Siz ushbu articleni o'chirmoqchimisz?</h3>
            <div className="flex mt-5 gap-2">
              <Button
                variant="outlined"
                onClick={() => setOpen(false)}
                color="primary"
                startIcon={<ArrowBackIos />}
              >
                Back
              </Button>
              <Button
                onClick={deleteHandler}
                variant="contained"
                color="error"
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDetails;
