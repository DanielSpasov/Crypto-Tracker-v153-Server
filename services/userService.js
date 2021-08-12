const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')



const signUp = async (req, res) => {
    try {

        let { email, password, rePassword, username } = req.body

        if (!email) return res.status(400).json({ message: 'Email is required' })
        if (!password) return res.status(400).json({ message: 'Password is required' })
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters long.' })
        if (password !== rePassword) return res.status(400).json({ message: 'Passwords doesn\'t match' })

        username = username ? username : email.split('@')[0]

        const existingUser = await User.findOne({ email: email })
        if (existingUser) return res.status(400).json({ message: 'A user with this email is already registered.' })

        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS))
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({ email, password: passwordHash, username })
        await newUser.save()

        res.status(200).json('Successful registration.')

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const signIn = async (req, res) => {
    try {

        let { email, password } = req.body

        if (!email || !password) return res.status(400).json({ message: 'Not all fields have been entered.' })

        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ message: 'No account with this email has been registered.' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(200).json({ token: token, _id: user._id, username: user.username })

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const getOne = async (req, res) => {
    try {

        let userID = req.params.id
        if (!userID) return res.status(401).json({ message: 'Invalid user ID' })

        let user = await User
            .findById(userID)
            .populate('createdArticles', 'title')

        res.status(200).json({
            email: user.email,
            username: user.username,
            _id: user._id,
            watchlist: user.watchlist,
            createdArticles: user.createdArticles
        })

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const changeUsername = async (req, res) => {
    try {

        const { username } = req.body
        const userID = req.params.id

        await User.findByIdAndUpdate(userID, { username: username })
    
        getOne(req, res)

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    getOne,
    signUp,
    signIn,
    changeUsername
}