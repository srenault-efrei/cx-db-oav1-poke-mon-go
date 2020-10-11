import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";



const EditPokemon = () => {

    const history = useHistory();

    const [pokemon, setPokemon] = useState([])
    const [name, setName] = useState('')
    const [princpalType, setPrincipalType] = useState('')
    const [secondType, setSecondType] = useState('')
    const [weaknesses, setWeaknesses] = useState([])
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')



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
        setWeaknesses(data.weaknesses)
        if (data.types[1]) {
            setSecondType(data.types[1])
        }
        setName(data.name)
        setHeight(data.height)
        setWeight(data.weight)
    }

    const updatePokemon = async (id) => {

        const response = await fetch(`http://localhost:4242/api/pokemons/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                types: [princpalType, secondType],
                height,
                weight,
                weaknesses
            })
        })
        const data = await response.json()

        if (data.status === 200) {
            history.push('/')
            alert('successful modification')
        } else {
            console.log(data.err)
        }
    }

    const handleChange = (e) => {
        let options = e.target.options;
        let values = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                values.push(options[i].value);
            }
            setWeaknesses(values)
        }
    }


    const types = ['', 'Water', 'Bug', 'Poison', 'Normal', 'Flying', 'Electric', 'Ground', 'Fire', 'Grass', 'Fighting', 'Psychic', 'Rock', 'Ice', 'Ghost', 'Dragon']
    return (
        <div className=''>

            <div className="container">
                <h1>Edit Pokemon {pokemon.id_pokemon}</h1>
                <form>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="nom">Name *</label>
                            <input type="text" required className="form-control" id="name" placeholder="Bouroi" defaultValue={pokemon.name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selection">Principal Type *</label>
                            <select id="selection" className="form-control" required
                            onChange={(e) => setPrincipalType(e.target.value)}
>
                                {
                                    types.map((i, index) => (

                                        princpalType == types[index] ? <option key={i} value={types[index]} selected> {types[index]} </option>
                                            : <option key={i} value={types[index]}> {types[index]} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selection">Second Type</label>
                            <select id="selection" className="form-control" id="secondType"
                                onChange={(e) => setSecondType(e.target.value)}
                            >
                                {types.map((i, index) => (
                                    secondType == types[index] ? <option key={i} value={types[index]} selected> {types[index]} </option>
                                        : <option key={i} value={types[index]} > {types[index]} </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nom">Height (m) *</label>
                            <input type="text" required className="form-control" id="Height" placeholder="0.50 m" defaultValue={pokemon.height}
                                onChange={(e) => setHeight(e.target.value)}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="nom">Weight (kg) *</label>
                            <input type="text" required className="form-control" id="Weight" placeholder="20 kg" defaultValue={pokemon.weight}
                                onChange={(e) => setWeight(e.target.value)}
                            ></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="selection">Weaknesses</label>
                            <select id="selection" className="form-control" multiple required
                                onChange={(e) => handleChange(e)}
                            >
                                {types.map((i, index) => (
                                    <option key={i} value={types[index]}> {types[index]} </option>
                                ))}
                            </select>
                        </div>

                        <button type="button" className="btn btn-success" onClick={() => updatePokemon(pokemon.id_pokemon)}>Confirm</button>

                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default EditPokemon