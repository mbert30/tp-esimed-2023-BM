const express = require('express')
var cors = require('cors')
const { Sequelize } = require('sequelize')
const { Utilisateur } = require('./models/user.model.js')
const app = express()
const port = 3000
let i = 1
let user = []

app.use(express.json())
app.use(cors())


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(express.static('public'));

app.get('/test-sqlite', async (req, res) => {
    const newUser = await Utilisateur.create({
        firstName: "DAVID",
        lastName: "Bernard",
        password: "yeaaa"
    })
    const users = await Utilisateur.findAll()
    console.log(users)
    res.sendStatus(201)
})

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/newUser', (req, res) => {
    let newUser = req.body
    newUser.id = i
    i++
    user.push(newUser)
    res.sendStatus(201)
})

app.get('/users', (req, res) => {
    res.send(user)
})

app.get('/findUserByFirstName/:prenom', (req, res) => {
    let UserByFirstName = []
    for(let indice of user)
    {
        if(req.params.prenom == indice.firstName)
        {
            UserByFirstName.push(indice)
        }
    }
    res.send(UserByFirstName)
})

app.put('/modifyUserById/:id/:prenom', (req, res) => {
    let valide = false
    for(let indice of user)
    {
        if(req.params.id == indice.id)
        {
            indice.firstName = req.params.prenom
            valide = true
        }
    }
    if(valide === false)
    {
        res.send('Hors du tableau')
    }
})

app.delete('/deleteUserById/:id', (req, res) => {
    let valide = false
    for(let i = 0; i < user.length; i++)
    {
        if(req.params.id == user[i].id)
        {
            user.splice(i, 1)
            valide = true
            res.send('Supprimé')
        }
    }
    if(!valide)
    {
        res.send('Hors du tableau')
    }
})
