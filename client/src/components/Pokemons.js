import React, { useEffect, useState } from 'react'
import '../Pokemons.css'
import Research from './ResearchPokemon'


const Pokemons = () => {


    const [pokemons, setPokemons] = useState([])

    const fetchPokemons = async () => {
        const response = await fetch('http://localhost:4242/api/pokemons', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setPokemons(data)
    }

    useEffect(() => {
        fetchPokemons()
    }, [])


    const defineNumImg = (id) => {
        if (id < 10) {
            return `00${id}`
        } else if (id <= 99) {
            return `0${id}`
        }
        else {
            return id
        }
    }

    return (

        <div>
            <div className='content'>
                <div className="big-title"> <h1> Pokedex </h1></div>
                <Research setPokemons={setPokemons} fetchPokemons={fetchPokemons}></Research>
                {
                    pokemons.map(pokemon => (
                        <div key={pokemon.id_pokemon}  className="card">
                            <a href={`/pokemons/show/${pokemon.id_pokemon}`}>
                                    <img className={`img-pokemon ${pokemon.types[0]}-color`}
                                        src={`http://www.serebii.net/pokemongo/pokemon/${defineNumImg(pokemon.id_pokemon)}.png`}
                                        alt="Pokemon">
                                    </img>
                                <div className="card-body">
                                    <span className="card-id "> #{pokemon.id_pokemon} </span>
                                    <h5 className="card-title"> {pokemon.name} </h5>
                                    <button className={`btn  ${pokemon.types[0]}-color disabled `}>{pokemon.types[0]}</button>
                                    {pokemon.types[1] === undefined ? '' :
                                        <button className={`btn  ${pokemon.types[1]}-color disabled `}>{pokemon.types[1]}</button>
                                    }
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Pokemons