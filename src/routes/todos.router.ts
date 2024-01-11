import { Router } from 'express'
import * as TodoController from '../controllers/todos.controller'
const router = Router()

router.get('/', TodoController.getTodos)

export default router
