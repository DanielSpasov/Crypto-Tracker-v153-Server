const router = require('express').Router()

const cryptoService = require('../services/cryptoService')



router.get('/getOne', (req, res) => cryptoService.getOne(req, res))
router.get('/getTop100', (req, res) => cryptoService.getTop100(req, res))
router.get('/getCryptos', (req, res) => cryptoService.getCryptos(req, res))
router.get('/getWatchlistCryptos', (req, res) => cryptoService.getWatchlistCryptos(req, res))

router.post('/editWatchlist', (req, res) => cryptoService.editWatchlist(req, res))



module.exports = router