import React, { useEffect, useState } from 'react'



const EditPokemon = () => {

    const [pokemon, setPokemon] = useState([])
    const [name, setName] = useState('')
    const [princpalType, setPrincipalType] = useState('')
    const [secondType, setSecondType] = useState('')
    const [weaknesses, setWeaknesses] = useState([])
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
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
        setWeaknesses(data.weaknesses)
        if (data.types[1]) {
            setSecondType(data.types[1])
        }
        setName(data.name)
        setHeight(data.height)
        setWeight(data.weight)
    }

    useEffect(() => {
        fetchPokemon()
    }, [])

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
            setAlert(true)
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

            {alert ? <div class="alert alert-success col-md-12 centre" role="alert">
                {pokemon.name} has been edited
                    <p>
                    click <a href="/" class="alert-link">here</a> to go Home
                    </p>
            </div>
                : <div className="container">
                    <h1>Edit</h1>
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

                                            princpalType === types[index] ? <option key={i} value={types[index]} selected> {types[index]} </option>
                                                : <option key={i} value={types[index]}> {types[index]} </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="selection">Second Type</label>
                                <select className="form-control" id="secondType"
                                    onChange={(e) => setSecondType(e.target.value)}
                                >
                                    {types.map((i, index) => (
                                        secondType === types[index] ? <option key={i} value={types[index]} selected> {types[index]} </option>
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
                                <select id="Weaknesses" className="form-control" multiple required
                                    onChange={(e) => handleChange(e)}
                                >
                                    {types.map((i, index) => (
                                        <option key={i} value={types[index]}> {types[index]} </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <a href={`/pokemons/show/${pokemon.id_pokemon}`}>
                                    <button type="button" className="btn btn-warning">Return</button>

                                </a>
                                <button style={{ float: "right" }} type="button" className="btn btn-success" onClick={() => updatePokemon(pokemon.id_pokemon)}>Confirm</button>
                            </div>


                        </fieldset>
                    </form>
                </div>}

        </div>
    )
}

export default EditPokemon