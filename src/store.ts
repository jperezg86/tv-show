import { configureStore } from "@reduxjs/toolkit";
import { showsApi } from "./services/shows";
// import { setupListeners } from "@reduxjs/toolkit/dist/query";

export default configureStore({
    reducer: {
        [showsApi.reducerPath]: showsApi.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(showsApi.middleware)
})

// setupListeners(store.dispatch)

