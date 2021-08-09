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

    } catch (err) { res.status(500).json({ message: err.message }) }
}



module.exports = {
    createArticle
}