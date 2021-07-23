const router = require('express').Router()

const cryptoService = require('../services/cryptoService')



router.get('/getOne', (req, res) => cryptoService.getOne(req, res))



module.exports = router