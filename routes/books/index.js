const routes = require('express').Router()
const bookController = require('../../controllers/bookController')

routes.get('/', bookController.findAllBooks)
routes.get('/:isbn', bookController.findOneBook)
routes.post('/', bookController.create)
routes.put('/:isbn', bookController.update)
routes.delete('/:isbn', bookController.remove)


module.exports = routes