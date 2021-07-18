const User = require('../models/User')



const getOne = async (req, res) => {
    let user = await User.findOne({ username: 'ShadyGotRabies' })
    return user
}



module.exports = {
    getOne,
}