import { model, Schema, Document } from 'mongoose'



interface IPOKEMON {
  id_pokemon: Number,
  name: String,
  types: Array<String>,
  img: String,
  height: String,
  weight: String,
  weaknesses: Array<String>,
}

interface IPokemonDoc extends IPOKEMON, Document {}

const PokemonFields: Record<keyof IPOKEMON, any> = {
  id_pokemon: Number,
  name: String,
  types: [String],
  img: String,
  height: String,
  weight: String,
  weaknesses: [String],
}

const PokemonSchema: Schema<IPOKEMON> = new Schema(PokemonFields)
const Pokemon = model<IPokemonDoc>('Pokemon', PokemonSchema)

export default Pokemon