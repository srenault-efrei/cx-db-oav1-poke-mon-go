import React, { useEffect, useState } from 'react'
import '../ProfilePokemon.css';



const ShowPokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [princpalType, setPrincipalType] = useState('')

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
        const response = await fetch(`http://localhost:4242/api/pokemons/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()

        if (data.status === 200) {
            alert('successful deletion')
        } else {
            console.log(data.err)
        }
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
                                <td> <strong>Height : </strong>{pokemon.height}</td>
                                <td> <strong>Weight :</strong> {pokemon.weight}</td>
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
                                        pokemon.weaknesses.map((weakness, index) => (
                                            <td key={index}><button className={`btn  ${weakness}-color disabled `}>{weakness}</button></td>
                                        ))
                                        : <td></td>
                                }
                            </tr>
                        </tbody>
                    </table>

                    <div style={{ marginTop: "100px" }}>
                        <a href={`/pokemons/edit/${pokemon.id_pokemon}`}>
                            <button type="button" className="btn btn-warning">Edit</button>
                        </a>

                        <a href='/'>
                            <button type="button" className="btn btn-danger" onClick={() => deletePokemon(pokemon.id_pokemon)}>Delete</button>
                        </a>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShowPokemon