import './App.css';
import Gradovi from './gradovi.json'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function App(props) {

  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const [favorite, setFavorite] = useState([]);

  const addToFavorite = city => {
    if (!favorite.includes(city)) setFavorite(favorite.concat(city));
    console.log(city);
  };

  const removeFavorite = city => {
    let index = favorite.indexOf(city);
    console.log(index);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
    console.log(temp);
  };

  let findfavorite = Gradovi.filter(val => favorite.includes(val.city));


  return (
    <div className="App">
      <div className="search">
        <input
        type="text"
        className="searchTerm"
        placeholder="Pretrazi gradove u HR"
        onChange={event => {setSearchTerm(event.target.value)}}
        value={searchTerm}
        />

        <button type="submit" class="searchButton">
        <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="search-res">
      {Gradovi.filter((val) => {
        if (searchTerm == "") {
          return val
        } else if (val.city.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).slice(0, 5)
      .map((val, key) => {
        return <ul className="Lista" key={key}>
                <input readOnly value={val.city} onClick={() => onSearch(val.city)} className="gradovi"/>
                <button  onClick={() => addToFavorite(val.city)}>
                <FontAwesomeIcon icon={faStar}/>
                </button>
               </ul>
      })}
      </div>
      <div className="favorite__list">
        <h2>favorite recipes</h2>
          {findfavorite.map(val => {
            return (
              <div key={val.city} className="favs">
              <h2 className="">{val.city}</h2>

              <button onClick={() => removeFavorite(val.city)}>
              remove favorite
              </button>
              </div>
            );
          })}
          </div>
    </div>
  );
}

export default App;
