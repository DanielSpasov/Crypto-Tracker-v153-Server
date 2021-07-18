const router = require('express').Router()

const userService = require('../services/userService')



router.get('/getOne', async (req, res) => {
    let response = await userService.getOne(req, res)
    res.json(response)
})



module.exports = router