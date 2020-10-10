import React, { useState,useEffect } from 'react'
import {BrowserRouter, Switch,Route,Link} from 'react-router-dom'

import axios from 'axios'
const Index = () => {
    const [pokemons,setPokemons] = useState([
        {name: 'Pok 1'},
        {name: 'Pok 2'},
    ])

    useEffect(() => {
        axios("https://pokeapi.co/api/v2/pokemon/?limit=50")
          .then((result) => {
            setPokemons(result.data.results);
          })
          .catch((error) => {
            console.log('There was an error: ', error);
          });
      }, []);
    
    
    return (
        <div>
            <h1>Pokemon Index</h1>
            <ul>
            {pokemons.map((pokemon,i)=>{
                return(
                    <li key={i}>
                        <Link to={ `/pokemons/${i + 1}`}>
                            {pokemon.name}
                        </Link>
                    </li>
                    
                )
            } )}
            </ul>
        </div>

    )
}
export default Index