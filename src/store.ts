import { configureStore } from "@reduxjs/toolkit";
import { showsApi } from "./services/shows";
import FavoritesReducer from "./features/favorites/slice";

const store = configureStore({
  reducer: {
    favorites: FavoritesReducer,
    [showsApi.reducerPath]: showsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(showsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
