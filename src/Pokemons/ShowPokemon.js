import { useParams } from "react-router-dom";  
import React, { useState,useEffect } from 'react'

import axios from 'axios'
import {BrowserRouter, Switch,Route,Link} from 'react-router-dom'

const Show = () => {
    let { id } = useParams(); 
    const [pokemon,setPokemon] = useState(
        {
            name:'xxx',
            sprites: {
                front_shiny: ''
            }
        },

        
    )

    async function fetchPokemon(){
        const result = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(result.data)
        setPokemon(result.data);

    }
    useEffect(() => {
        fetchPokemon()
      }, []);
    return (
        <div>
            <h1>
                {pokemon.name}
            </h1>
            <div>
                <img src={pokemon.sprites.front_shiny}/> 
            </div>


        </div>
    )
}
export default Show