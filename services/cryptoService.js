const axios = require('axios')



const getOne = async (req, res) => {
    let data = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest`, {
        headers: {
            'X-CMC_PRO_API_KEY': '9022ea0d-dc6b-4fb8-bb12-30c8ff5dd270'
        }
    })
    res.json(data.data)
}



module.exports = {
    getOne
}