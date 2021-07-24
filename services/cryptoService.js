const axios = require('axios')



const getTop100 = async (req, res) => {
    let data = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
        headers: {
            'X-CMC_PRO_API_KEY': '9022ea0d-dc6b-4fb8-bb12-30c8ff5dd270'
        }
    })
    res.json(data.data)
}

const addToWatchlist = async (req, res) => {
    res.json({ 'In Add To Watchlist': req.query.crypto })
}

const removeFromWatchlist = async (req, res) => {
    res.json({ 'In Remove From Watchlist': req.query.crypto })
}



module.exports = {
    getTop100,
    addToWatchlist,
    removeFromWatchlist
}