import React, { useEffect, useState } from 'react'
import '../ProfilePokemon.css';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';



const ShowPokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [princpalType, setPrincipalType] = useState('')
    const [alert, setAlert] = useState(false)

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

    useEffect(() => {
        fetchPokemon()
    }, [])


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
            setAlert(true)
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
            {alert ?
            
                <div   class="alert alert-success col-md-12 centre" role="alert">
                    {pokemon.name} has been deleted
                    <p>
                        click <a href="/" class="alert-link">here</a> to go Home
                    </p>
                </div>:

                <div className='content'>

                    <div className="profile">
                        {pokemon.types ?
                            <h2 className={` ${princpalType}-color`}>{pokemon.name} #{pokemon.id_pokemon}</h2>
                            : <h2>''</h2>
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
                                {/* <button type="button" className="btn btn-warning">Edit</button> */}
                                <EditIcon style={{ fontSize: 50, marginRight: 50 }}></EditIcon>
                            </a>

                            <DeleteIcon style={{ fontSize: 50, color: "red" }} onClick={() => deletePokemon(pokemon.id_pokemon)}></DeleteIcon>
                        </div>

                    </div>
                </div>
            }

        </div>
    )
}

export default ShowPokemon