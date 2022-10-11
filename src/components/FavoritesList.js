import React, { useState } from 'react'

function FavoritesList() {
  const [favs, setFavs] = useState([]);

  const addToFavs = fav => {
    if (!favs.text || /^\s*$/.test(favs.text)) {
      return
    }

  const newFavs = [fav, ...favs]

  setFavs(newFavs)

  }

  return(
    <div>
      <h1>Favorites</h1>
    </div>
  )
}


export default FavoritesList;
