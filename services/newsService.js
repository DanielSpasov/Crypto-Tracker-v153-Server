const Article = require('../models/Article')
const User = require('../models/User')



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
    createArticle,
    getLatest
}