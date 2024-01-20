import { Request, Response, NextFunction } from 'express'
import * as EcService from '../service/Ecommerce.service'

//GET
export const getData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const Response = await EcService.getData()
}
