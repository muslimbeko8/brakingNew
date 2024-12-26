import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

axios.interceptors.request.use((config) => {
  config.baseURL = "https://mustafocoder.pythonanywhere.com";
  return config;
});

export const loginAPI = async (body) => {
  const res = await axios.post("/auth/login/", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
export const signupAPI = async (body) => {
  const res = await axios.post("/auth/signup/", body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

export const getUserAPI = async (token) => {
  const res = await axios.get("/auth/user/", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
};

export const createArticleAPI = async (body, token) => {
  const res = await axios.post("/api/articles/create/", body, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
// done
export const deleteArticleAPI = async (id, token) => {
  const res = await axios.delete(`/api/articles/${id}/delete/`, {
    credentials: "include",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
// done
export const updateArticleAPI = async (id, body, token) => {
  const res = await axios.put(`/api/articles/${id}/update/`, body, {
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

const token = localStorage.getItem("token");
export const articlesApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mustafocoder.pythonanywhere.com",
    headers: token ? { Authorization: `Token ${token}` } : {},
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => "api/articles/",
    }),
    getSingleArticle: builder.query({
      query: (id) => `api/article/${id}/`,
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `api/articles/${id}/delete/`,
        method: "DELETE",
      }),
    }),
    updateArticle: builder.mutation({
      query: (data) => ({
        url: `api/articles/${data.id}/update/`,
        method: "PUT",
        body: data.formData,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
} = articlesApi;
