const router = require('express').Router()

const userService = require('../services/userService')



router.post('/register', (req, res) => userService.register(req, res))

router.get('/getOne', (req, res) => userService.getOne(req, res))
router.get('/getAll', (req, res) => userService.getAll(req, res))



module.exports = router