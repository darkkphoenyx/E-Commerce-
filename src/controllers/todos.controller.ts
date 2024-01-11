import { NextFunction, Request, Response, response } from 'express'
import * as TodoService from '../services/todos.service'

export const getTodos = (req: Request, res: Response, next: NextFunction) => {
    const response = TodoService.getTodo()
    res.send(response)
}
