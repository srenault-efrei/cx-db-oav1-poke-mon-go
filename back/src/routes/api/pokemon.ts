import { Router, Request, Response } from 'express'
import Pokemon from '../../database/schemas/pokemon'
import { Document } from 'mongoose'
import { isEmpty } from 'lodash'
import { error, success } from '../../helpers/response'
import { BAD_REQUEST, OK } from '../../helpers/constants'




const api = Router()

interface IPOKEMON {
    id_pokemon: Number,
    name: String,
    types: [String],
    img: String,
    height: String,
    weight: String,
    weaknesses: [String],
}

interface DeleteOne {
    ok?: number | undefined;
    n?: number | undefined;
    deletedCount?: number | undefined;
}

interface UpdateOne {
    n?: number | undefined;
    nModified?: number | undefined;
}

interface IPokemonDoc extends IPOKEMON, Document { }


api.get('/', (req: Request, res: Response) => {
    try {
        Pokemon.find(function (err, pokemons: IPokemonDoc[]) {
            if (err) res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
            res.status(OK.status).json(success(pokemons))
        })
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})


api.get('/:id', (req: Request, res: Response) => {

    try {
        const id = parseInt(req.params.id)
        Pokemon.findOne({ id_pokemon: <Number>id }, function (err, pokemon: IPokemonDoc) {
            if (err) res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
            if (pokemon) {
                res.status(OK.status).json(success(pokemon))
            } else {
                // throw new Error(`The pokemon ${id} has not been found`)
                res.status(BAD_REQUEST.status).json({status: 400, code:"BAD_REQUEST", description:`The pokemon ${id} has not been found`})
            }
        })
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

api.put('/:id', async (req: Request, res: Response) => {
    const fields = [ 'name', 'types', 'img', 'height', 'weight', 'weaknesses']
    try {


        const id = parseInt(req.params.id)
        const missings = fields.filter((field: string) => !req.body[field])
        if (!isEmpty(missings)) {
            const isPlural = missings.length > 1
            throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
        }

        const { name, types, img, height, weight, weaknesses } = req.body
        const result: UpdateOne = await Pokemon.updateOne({ id_pokemon: id }, {
            name,
            types,
            img,
            height,
            weight,
            weaknesses

        });

        if (result.nModified === 0) {
            throw new Error(`The pokemon ${id} has not been edited`)
        } else {
            res.status(OK.status).json({description: `The pokemon ${id} was been edited`})
        }
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

api.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        const result: DeleteOne = await Pokemon.deleteOne({ id_pokemon: id })
        if (result.deletedCount === 0) {
            throw new Error(`The pokemon ${id} has not been found`)
        } else {
            res.status(OK.status).json({ description: `The pokemon ${id} was been removed` })
        }
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

export default api