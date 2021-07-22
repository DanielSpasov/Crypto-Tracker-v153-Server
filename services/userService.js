const User = require('../models/User')



const getOne = async (req, res) => {
    let user = await User.findOne({ username: 'ShadyGotRabies' })
    res.json(user)
}

const getAll = async (req, res) => {
    let user = await User.find({})
    res.json(user)
}



module.exports = {
    getOne,
    getAll,
}