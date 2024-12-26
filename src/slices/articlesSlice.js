import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  articles: null,
  loading: false,
  error: null,
}

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles: (state, actions) => {
      state.articles = actions.payload
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload
    },
    setError: (state, actions) => {
      state.error = actions.payload
    },
  },
})

export const {setArticles, setLoading, setError} = articlesSlice.actions
export default articlesSlice.reducer