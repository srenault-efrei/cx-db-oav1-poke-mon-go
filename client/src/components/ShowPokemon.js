import React, { useEffect, useState } from 'react'
import '../profilePokemon.css';
import { useHistory } from "react-router-dom";



const ShowPokemon = () => {

    const [ pokemon, setPokemon ] = useState([])
    const [ princpalType, setPrincipalType ] = useState('')
    const history = useHistory()

    useEffect(() => {
        fetchPokemon()
    }, [])


    const fetchPokemon = async () => {
        let url = document.location.href
        let urlSplit = url.split('/')
        let id = urlSplit[urlSplit.length - 1]

        const response = await fetch(`http://localhost:4242/api/pokemons/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        setPokemon(data)
        setPrincipalType(data.types[0])
    }

    const deletePokemon = async (id) => {
        const response = await fetch(`http://localhost:4242/api/pokemons/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }  
        })
        const data = await response
        console.log(data)
        // history.push('/')
    }


    const defineNumImg = (id) => {
        if (id < 10) {
            return `00${id}`
        } else if (id < 99) {
            return `0${id}`
        }
        else {
            return id
        }
    }

    return (

        <div>
            <a href='/'>
                <img src='https://image.flaticon.com/icons/png/512/84/84339.png'
                    alt='fleche'
                    className='fleche-picture'>
                </img>
            </a>
            <div className='content'>

                <div className="profile">
                    {pokemon.types ?
                        <h2 className={` ${princpalType}-color`}>{pokemon.name} #{pokemon.id_pokemon}</h2>
                        : <h2></h2>
                    }
                    <img className='img-profile'
                        src={`http://www.serebii.net/pokemongo/pokemon/${defineNumImg(pokemon.id_pokemon)}.png`}
                        alt="Pokemon">
                    </img>
                    {
                        pokemon.types ? <div> <button className={`btn  ${princpalType}-color disabled `}>{princpalType}</button>
                            <button className={`btn  ${pokemon.types[1]}-color disabled `}>{pokemon.types[1]}</button>
                        </div>
                            :
                            <button></button>
                    }

                    <br></br>
                    <h4 className={` ${princpalType}-color`}>Profile</h4>

                    <table className='tabless'>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> <strong>Taille : </strong>{pokemon.height}</td>
                                <td> <strong>Poids :</strong> {pokemon.weight}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4 className={` ${princpalType}-color`}>Weaknesses</h4>

                    <table className='tabless'>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {
                                    pokemon.weaknesses ?
                                        pokemon.weaknesses.map(weakness => (
                                            <button className={`btn  ${weakness}-color disabled `}>{weakness}</button>
                                        ))
                                        : <td></td>
                                }
                            </tr>
                        </tbody>
                    </table>
                    <div style={{ marginTop: "100px" }}>
                    <button type="button" className="btn btn-warning">Edit</button>
                    <button type="button" className="btn btn-danger" onClick={deletePokemon(pokemon.id_pokemon)}>Delete</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ShowPokemon