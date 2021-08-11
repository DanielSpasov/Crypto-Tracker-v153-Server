const router = require('express').Router()



router.get('/', (req, res) => res.status(200).json({ 'home': 'page' }))
router.get('/test', (req, res) => res.status(200).json({ 'test': 'successful' }))



module.exports = router