const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

const app = express()

app.use((req, res, next) => {
    const log = `${new Date().toISOString()} ${req.method} ${req.url}\n`
    fs.writeFileSync('access_logs.txt', log)
    next()
})

app.use(morgan('dev'))

const logStream = fs.createWriteStream(path.join(__dirname, 'morgan_logs.txt'), { flags: 'a' })
app.use(morgan('combined', { stream: logStream }))

app.get("/", (req, res) => {
    res.send("Rota principal")
})

app.get("/nova", (req, res) => {
    res.send("Nova rota")
})

app.get("/contato", (req, res) => {
    res.send("Contato")
})

app.listen(3000, () => {
    console.log("Rodando na porta 3000")
})
