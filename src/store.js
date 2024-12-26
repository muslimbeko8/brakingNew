import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import authSlice from "./slices/authSlice";
import { articlesApi, authApi } from "./service/api";

export default configureStore({
  reducer: {
    articles: articlesSlice,
    auth: authSlice,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(articlesApi.middleware)
      .concat(authApi.middleware),
});
