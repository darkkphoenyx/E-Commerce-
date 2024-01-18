import express from 'express'
import EcRouter from './routes/Ecommerce.router'
const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server ready at : localhost:${PORT}`)
})

app.use('/Ecommerce',EcRouter)


export default app
