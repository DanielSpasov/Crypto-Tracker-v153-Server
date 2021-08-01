const router = require('express').Router()

const userService = require('../services/userService')



router.get('/:id', (req, res) => userService.getOne(req, res))
router.post('/sign-up', (req, res) => userService.signUp(req, res))
router.post('/sign-in', (req, res) => userService.signIn(req, res))
router.post('/tokenIsValid', (req, res) => userService.tokenIsValid(req, res))



module.exports = router