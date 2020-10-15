import React, { useEffect, useState } from 'react'



const ResearchPokemon = (props) => {
    const [name, setName] = useState('')

    useEffect(() => {

    })

    const GetPokemonFromName = async () => {

        if (name.length > 0) {
            const response = await fetch(`http://localhost:4242/api/pokemons/research`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name
                })
            })
            const data = await response.json()
            if (data) {
                props.setPokemons(data)
            } else {
                console.log(data.err)
            }
        }else{
            props.fetchPokemons()
        }

    }

    return (
        <div style={{ marginLeft: "800px" }}>
            <form>
                <div className="form-row align-items-center">
                    <div className="col-auto col-md-3">
                        <div className="input-group mb-2 ">
                            <div className="input-group-prepend">
                                <div className="input-group-text">Nom</div>
                            </div>
                            <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-defaults"
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <button type="button" class="btn btn-light" onClick={() => GetPokemonFromName()}>Confirm</button>
                </div>
            </form>
        </div>

    )
}

export default ResearchPokemon