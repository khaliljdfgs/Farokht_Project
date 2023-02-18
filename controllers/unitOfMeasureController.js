
import { StatusCodes } from "http-status-codes"
import { BadRequestError, NotFoundError } from '../errors/index.js'
import UOM from "../models/item/UnitOfMeasure.js"

const createUoM = async (req, res) => {
    const {name} = req.body
    if (!name) {
        throw new BadRequestError('Please Provide Value')
    }
    const userId = req.user.userId 
    // res.send(user)
    const nameOfUoM = name.toLowerCase()
    const uomAlreadyExist = await UOM.findOne({name:nameOfUoM})
    console.log(uomAlreadyExist);
    if (uomAlreadyExist) {
        throw new BadRequestError("This unit of measure is already exist")
    }
    const uom = await UOM.create({name:nameOfUoM, createdBy:userId})

    res.status(StatusCodes.CREATED).json({
        "uom":uom.name
    })

}

const deleteUoM = async (req, res) => {
    // const {id} = req.params
    const uomId = req.params.id
    const uom = UOM.findOne({_id:uomId})
    if (!uom) {
        throw new NotFoundError(`No UoM with id:${uomId}`)
    }
    await uom.remove()
    res.status(StatusCodes.OK).json({"msg":'UoM is removed successfully'})
}

const updateUoM = async (req, res) => {
    const uomId = req.params.id
    const {name} = req.body;
    
    const uom = await UOM.findOne({_id:uomId})
    if (!uom) {
        throw new NotFoundError(`No UoM with id:${uomId}`)
    }

    const nameOfUoM = name.toLowerCase()
    const uomAlreadyExist = await UOM.findOne({name:nameOfUoM})
    // console.log(uomAlreadyExist);
    if (uomAlreadyExist) {
        throw new BadRequestError("This unit of measure is already exist")
    }
    
    uom.name = nameOfUoM
    await uom.save()
    res.status(StatusCodes.OK).json({"uom":uom.name})
}

const getAllUoM = async (req, res) => {
    const uoms = await UOM.find()
    res.status(StatusCodes.OK).json(uoms)
}


export { createUoM, deleteUoM, updateUoM, getAllUoM }