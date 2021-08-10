const Article = require('../models/Article')
const User = require('../models/User')



const getArticle = async (req, res) => {
    try {

        let article = await Article
            .findById(req.query.id)
            .populate('creator', 'username')

        res.json(article)

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const createArticle = async (req, res) => {
    try {

        const { title, content, image, userID } = req.body

        if (title.length < 8) return res.status(400).json({ message: 'Title must be at least 8 symbols long.' })
        if (title.length > 72) return res.status(400).json({ message: 'Title cannot be more than 72 symbols long.' })

        if (content.length < 30) return res.status(400).json({ message: 'Content must be at least 30 symbols long.' })
        if (content.length > 300) return res.status(400).json({ message: 'Content cannot be more than 300 symbols long.' })

        let article = new Article({
            title,
            content,
            image,
            creator: userID,
            dateCreated: new Date()
        })
        article.save()

        let user = await User.findById(userID)
        user.createdArticles.push(article._id)
        user.save()

        res.json({ message: 'Article Created' })

    } catch (err) { res.status(500).json({ message: err.message }) }
}

const getLatest = async (req, res) => {
    try {

        let latestArticles = await Article
            .find({})
            .populate('creator', 'username')

        latestArticles.sort((a, b) => b.dateCreated - a.dateCreated)
        res.json(latestArticles)

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    getArticle,
    createArticle,
    getLatest
}