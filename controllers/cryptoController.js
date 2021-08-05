const router = require('express').Router()

const cryptoService = require('../services/cryptoService')



router.get('/getOne', (req, res) => cryptoService.getOne(req, res))

router.get('/getLatest', (req, res) => cryptoService.getLatest(req, res))
router.get('/getWatchlist', (req, res) => cryptoService.getWatchlist(req, res))

router.get('/searchLatest', (req, res) => cryptoService.searchLatest(req, res))
router.get('/searchWatchlist', (req, res) => cryptoService.searchWatchlist(req, res))


router.post('/editWatchlist', (req, res) => cryptoService.editWatchlist(req, res))



module.exports = router