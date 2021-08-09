const axios = require('axios')

const User = require('../models/User')



const getOne = async (req, res) => {
    let cryptoData = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${req.query.crypto}`, {
        headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY }
    })
    res.json(cryptoData.data.data)
}

const getLatest = async (req, res) => {
    let cryptoData = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
        headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY }
    })
    res.json(cryptoData.data.data)
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

const getWatchlist = async (req, res) => {
    try {

        if (!req.query.userID) return res.status(401).json({ message: 'Invalid user ID' })
        let user = await User.findById(req.query.userID)

        if (user.watchlist.length === 0) return res.status(404).json({ message: 'You have no cryptocurrencies in your watchlist' })

        let watchlistData = await axios
            .get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${user.watchlist.join(',')}`, {
                headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY }
            })

        let output = []
        for (let i of user.watchlist) {
            output.push(watchlistData.data.data[i])
        }

        res.json(output)

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const searchLatest = async (req, res) => {
    try {

        req.query.cryptos = req.query.cryptos.split(',')
        let cryptos = []
        for (let c of req.query.cryptos) {
            cryptos.push(c.trim().toLowerCase())
        }
        cryptos = cryptos.join(',')

        let cryptoData = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptos}`, {
            headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY }
        })

        let output = []
        for (let key of Object.keys(cryptoData.data.data)) {
            output.push(cryptoData.data.data[key])
        }

        res.json(output)

    } catch (err) {
        if (err.message === 'Request failed with status code 400') {
            let symbol = err.config.url.split('symbol=')[1].toUpperCase()
            res.status(404).json({ message: `Cryptocurrency not found: ${symbol}` })
        } else {
            res.status(500).json({ message: err.message })
        }
    }
}

const searchWatchlist = async (req, res) => {
    try {

        let user = await User.findById(req.query.userID)

        req.query.cryptos = req.query.cryptos.split(',')
        let cryptos = []
        for (let c of req.query.cryptos) {
            cryptos.push(c.trim().toUpperCase())
            if (!user.watchlist.includes(c.trim().toUpperCase())) {
                return res
                    .status(404)
                    .json({ message: `Cryptocurrency not found: ${c.toUpperCase()}` })
            }
        }
        cryptos = cryptos.join(',')

        let cryptoData = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cryptos}`, {
            headers: { 'X-CMC_PRO_API_KEY': process.env.API_KEY }
        })

        let output = []
        for (let key of Object.keys(cryptoData.data.data)) {
            output.push(cryptoData.data.data[key])
        }

        res.json(output)

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    getOne,
    getLatest,
    getWatchlist,
    searchLatest,
    searchWatchlist,
    editWatchlist
}