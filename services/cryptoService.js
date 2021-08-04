const axios = require('axios')

const User = require('../models/User')



const getOne = async (req, res) => {
    let data = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.query.crypto}`, {
        headers: { 'X-CMC_PRO_API_KEY': '9022ea0d-dc6b-4fb8-bb12-30c8ff5dd270' }
    })
    res.json(data.data)
}

const getTop100 = async (req, res) => {
    let data = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
        headers: { 'X-CMC_PRO_API_KEY': '9022ea0d-dc6b-4fb8-bb12-30c8ff5dd270' }
    })
    res.json(data.data)
}

const editWatchlist = async (req, res) => {
    try {

        let user = await User.findById(req.body.userID)

        if (user.watchlist.includes(req.body.crypto)) {
            user.watchlist.splice(user.watchlist.indexOf(req.body.crypto), 1)
            user.save()
            res.json({ email: user.email, username: user.username, id: user._id, watchlist: user.watchlist })
        } else {
            user.watchlist.push(req.body.crypto)
            user.save()
            res.json({ email: user.email, username: user.username, id: user._id, watchlist: user.watchlist })
        }

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const getWatchlistCryptos = async (req, res) => {
    try {

        if (!req.query.userID) return res.status(401).json({ message: 'Invalid user ID' })
        let user = await User.findById(req.query.userID)

        let watchlistData = await axios
            .get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${user.watchlist.join(',')}`, {
                headers: { 'X-CMC_PRO_API_KEY': '9022ea0d-dc6b-4fb8-bb12-30c8ff5dd270' }
            })

        let output = []
        for (let i of user.watchlist) {
            output.push(watchlistData.data.data[i])
        }

        res.json(output)

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    getOne,
    getTop100,
    editWatchlist,
    getWatchlistCryptos
}