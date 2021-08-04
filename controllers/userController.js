const router = require('express').Router()

const userService = require('../services/userService')



router.get('/validateToken', (req, res) => userService.validateToken(req, res))

router.post('/sign-up', (req, res) => userService.signUp(req, res))
router.post('/sign-in', (req, res) => userService.signIn(req, res))

router.get('/', (req, res) => userService.getOne(req, res))

module.exports = router