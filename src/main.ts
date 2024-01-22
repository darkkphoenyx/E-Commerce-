import express, { NextFunction, Request, Response } from 'express'
import User from './routes/user.router'
import Admin from './routes/admin.router'
import buildError from './utils/build-errors'
import HttpStatus from 'http-status-codes'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server ready at : localhost:${PORT}`)
})

//swagger
const options: swaggerJsdoc.Options = {
    definition: {
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
        openapi: '3.0.0',
        info: {
            title: 'Express starter',
            version: '1.0.0',
        },

        servers: [
            {
                url: 'http://localhost:3000/api',
            },
        ],
        security: [{ BearerAuth: [] }], // Add security definition here
    },
    apis: ['./src/routes/*.ts'],
}

const specs = swaggerJsdoc(options)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, {
        explorer: true,
    })
)

//localhost
app.use('/admin', Admin)
app.use('/user', User)

//error handling for methods that are not allowed
app.use(function methodNotAllowed(req: Request, res: Response) {
    res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
        error: {
            code: HttpStatus.METHOD_NOT_ALLOWED,
            message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED),
        },
    })
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const error = buildError(err)
    res.status(error.code).json({ error })
})

export default app
