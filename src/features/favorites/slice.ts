import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Show } from "../../types/show"

export type FavoritesState = {
    favorites: Show[]
}

const initialState: FavoritesState = {
    favorites: JSON.parse(localStorage.getItem("favorites") || "[]")
}

export const slice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Show>) => {
            const {favorites} = state
            if(favorites.find(show => show?.id === action?.payload?.id)) {
                state.favorites = favorites.filter(show => show?.id !== action?.payload?.id)
            } else {
                state.favorites = [...favorites, action?.payload]
            }
            localStorage.setItem("favorites", JSON.stringify(state?.favorites))
        }
    }
})


export const { toggleFavorite } = slice?.actions
export default slice.reducer
