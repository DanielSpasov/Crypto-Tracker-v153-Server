const router = require('express').Router()

const userService = require('../services/userService')



router.get('/tokenIsValid', (req, res) => userService.tokenIsValid(req, res))

router.post('/sign-up', (req, res) => userService.signUp(req, res))
router.post('/sign-in', (req, res) => userService.signIn(req, res))

router.get('/:id', (req, res) => userService.getOne(req, res)) // AT THE BOTTOM 100%


module.exports = router