import Pokemon from '../database/schemas/pokemon'
import { error, success } from '../helpers/display'
const data = require('../../data/pokedex.json')


  

export default async function init() {
    let isLoaded = true

    
    Pokemon.find((err, pokemons: Document[]) => {
        if (err) { error('no find collection Pokemon') }
        if (pokemons.length === 0) {
            for (const p of data.pokemon) {
                    let typeList: Array<String> = []
                    let weaknesseList: Array<String> = []
                    for (const type of p.type) {
                        typeList.push(type)
                    }
                    for(const weaknesse of p.weaknesses){
                        weaknesseList.push(weaknesse)
                    }
                    let pokemon  = new Pokemon({
                        id_pokemon: p.id,
                        name: p.name,
                        types: typeList,
                        img: p.img,
                        height: p.height,
                        weight: p.weight,
                        weaknesses: weaknesseList,
                       
                    })
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
