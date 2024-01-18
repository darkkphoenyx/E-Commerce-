import {Router} from 'express'
import * as EcController from '../controller/Ecommerce.controller'
const router = Router()


//GET 
router.get('/',EcController.getData)

//POST
router.post('/')

export default router
