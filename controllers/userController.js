const router = require('express').Router()

const userService = require('../services/userService')



router.get('/getOne', (req, res) => userService.getOne(req, res))
router.get('/getAll', (req, res) => userService.getAll(req, res))



module.exports = router