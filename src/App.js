import './App.css';
import Gradovi from './gradovi.json'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

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
                <li onClick={() => onSearch(val.city)}>{val.city}</li>
                <FontAwesomeIcon icon={faStar}
                onClick
                />
               </ul>
      })}
      </div>
    </div>
  );
}

export default App;
