const getPokemons = require('json-pokemon/getPokemon');
import Pokemon from '../database/schemas/pokemon'
import { error, success } from '../helpers/display'


export default function init() {
    let isLoaded = true

    Pokemon.find((err, pokemons: Document[]) => {
        if (err) { error('no find collection Pokemon') }
        if (pokemons.length === 0) {
            for (const p of getPokemons()) {
                let typeList: Array<String> = []
                for (const type of p.typeList) {
                    typeList.push(type)
                }
                let pokemon = new Pokemon({ id_pokemon: p.id, name: p.name, typeList })
                pokemon.save((err) => {
                    if (err) {
                        isLoaded = false
                        error('error pokemon no saved')
                    }
                })
            }
            if (isLoaded) {
                success('Great!, all pokemons have been loaded')
            }
        }
    })


}
