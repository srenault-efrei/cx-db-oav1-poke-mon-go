import mongoose, { Schema } from 'mongoose'

export default mongoose.model(
  'Pokemon',
  new Schema({
    id_pokemon: Number,
    name: String,
    typeList:[String]

  })
)
