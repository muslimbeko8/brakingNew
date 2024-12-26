import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./slices/articlesSlice";
import authSlice from "./slices/authSlice";
import { articlesApi } from "./service/api";

export default configureStore({
  reducer: {
    articles: articlesSlice,
    auth: authSlice,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesApi.middleware),
});
