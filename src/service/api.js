import axios from "axios";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = localStorage.getItem("token");

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mustafocoder.pythonanywhere.com",
    headers: token ? { Authorization: `Token ${token}` } : {},
    credentials: "include",
  }),
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    signUpApi: builder.mutation({
      query: (data) => ({
        url: "/auth/signup/",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});
//
axios.interceptors.request.use((config) => {
  config.baseURL = "https://mustafocoder.pythonanywhere.com";
  return config;
});
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
//
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
    searchArticles: builder.query({
      query: (query) => `api/articles/search/?query=${query}`,
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "auth/update-profile/",
        method: "PUT",
        body: data,
      }),
    }),
    createArticle: builder.mutation({
      query: ({ body }) => ({
        url: "/api/articles/create/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginApiMutation, useSignUpApiMutation } = authApi;

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useDeleteArticleMutation,
  useUpdateArticleMutation,
  useSearchArticlesQuery,
  useUpdateProfileMutation,
  useCreateArticleMutation,
} = articlesApi;
