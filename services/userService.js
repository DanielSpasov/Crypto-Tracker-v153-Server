const bcrypt = require('bcrypt')

const User = require('../models/User')



const register = async (req, res) => {
    try {

        let { email, password, rePassword } = req.body
        
        if (!email) return res.status(400).json({ message: 'Email is required' })
        if (!password) return res.status(400).json({ message: 'Password is required' })
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
        if (password !== rePassword) return res.status(400).json({ message: 'Passwords doesn\'t match' })

        const username = email.split('@')[0]
        
        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(400).json({ message: 'A user with this email is already registered.' })
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({ email, password: passwordHash, username })
        await newUser.save()
        
        res.json('Successful registration.')

    } catch (err) { res.status(500).json({ message: err.message }) }
}

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
    register
}