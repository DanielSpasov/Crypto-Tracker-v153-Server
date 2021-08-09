const Article = require('../models/Article')



const createArticle = async (req, res) => {
    try {

        const { title, content, image, userID } = req.body

        let article = new Article({
            title,
            content,
            image,
            creator: userID,
            dateCreated: new Date()
        })
        article.save()

        res.json({ message: 'Article Created' })

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const getLatest = async (req, res) => {
    try {

        let latestArticlesRes = await Article.find({}).populate('creator', 'username')

        res.json(latestArticlesRes)

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    createArticle,
    getLatest
}