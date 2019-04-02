const routes = require('express').Router()
const books = require('./books')

routes.use('/books', books )



module.exports = routes