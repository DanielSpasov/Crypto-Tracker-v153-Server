const router = require('express').Router()

const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')



router.use('/', homeController)
router.use('/user', userController)



router.get('*', (req, res) => {
    res.status(404).json({ message: 'Page not found' })
})

module.exports = router