import express from 'express'
import cors from 'cors'
import SGDB from 'steamgriddb'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors({
    origin: '*',
    methods: ['GET'],
}))

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' })
})

/*
    GET /api/getgrid/:gamename
    Example: http://localhost:3000/api/getgrid/Team%20Fortress%202
*/
app.get('/api/getgrid/:gamename', async (req, res) => {
    try {
        const gameName = req.params.gamename
        console.log(gameName)
        if (process.env.API_KEY === undefined) {
            res.status(500)
            res.json({ error: 'API key not found' })
            return
        };

        const sgdb = new SGDB(process.env.API_KEY)
        const game = await sgdb.searchGame(gameName)
        const grid = await sgdb.getGrids({
            dimensions: ["460x215", "920x430"],
            id: game[0].id,
            type: "game"
        })

        res.status(200)        
        res.json({ url: grid[0].url })
    } catch (error) {
        res.status(400)
        res.json({ message: "something went wrong", error: error })
    }
})

app.listen(3000)