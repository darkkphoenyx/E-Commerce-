import express from 'express'
import todosRouter from './routes/todos.router'
const app = express()

app.use(express.json())

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server ready at : localhost:${PORT}`)
})

app.use('/todos', todosRouter)

export default app
