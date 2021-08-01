const router = require('express').Router()

const userService = require('../services/userService')



router.post('/sign-up', (req, res) => userService.signUp(req, res))
router.post('/sign-in', (req, res) => userService.signIn(req, res))

router.get('/getOne', (req, res) => userService.getOne(req, res))
router.get('/getAll', (req, res) => userService.getAll(req, res))



module.exports = router