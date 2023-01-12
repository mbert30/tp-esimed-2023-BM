const express = require('express')
const app = express()
const port = 3000
let i = 1

app.use(express.json())

let user = []

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
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

app.get('/allUser', (req, res) => {
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
