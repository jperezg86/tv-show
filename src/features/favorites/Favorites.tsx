import React from 'react'
import { FavoritesPropsFromRedux } from './FavoritesConnected'

const Favorites = ({
    favorites
}: FavoritesPropsFromRedux) => {
    return <h1>"the favorites here"</h1>
}

export default Favorites
