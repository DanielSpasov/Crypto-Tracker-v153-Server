const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const cryptoController = require('./controllers/cryptoController')
const newsController = require('./controllers/newsController')



router.use('/', homeController)
router.use('/user', userController)
router.use('/crypto', cryptoController)
router.use('/news', newsController)



router.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' })
})

module.exports = router