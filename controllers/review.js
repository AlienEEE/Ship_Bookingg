const { User, Review, Response } = require('../models')
const Upload = require('./upload')

async function getReview(req, res) {
    const review = await Review.findByPk(req.params.id)
    if (review === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    }
    const user = await User.findByPk(review.user_id)

    Response.status = 'success'
    Response.data = {
        id: review.id,
        detail: review.detail,
        rank: review.rank,
        img: review.img,
        user: {
            id: user.id,
            name: user.name,
            sname: user.sname,
            phone: user.phone,
            username: user.username,
            password: user.password,
        },
    }

    return res.status(200).json(Response)
}

async function getReviews(req, res) {
    const reviews = await Review.findAll()

    if (reviews === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    }

    const ArrayReview = []
    for (const i of reviews) {
        const user = await User.findByPk(i.user_id)

        Response.status = 'success'
        Response.data = {
            id: i.id,
            detail: i.detail,
            rank: i.rank,
            img: i.img,
            user: {
                id: user.id,
                name: user.name,
                sname: user.sname,
                phone: user.phone,
                username: user.username,
                password: user.password,
            },
        }

        ArrayReview.push(Response.data)
    }

    return res.status(200).json(ArrayReview)
}

async function addReview(req, res) {
    const { detail, rank, user_id } = req.body
    const file = req.file
    try {
        const img = await Upload(file)
        const review = await Review.create({
            detail: detail,
            rank: rank,
            user_id: user_id,
            img: img,
        })

        Response.status = 'success'
        Response.data = review.dataValues

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors

        return res.status(400).json(Response)
    }
}

async function deleteReview(req, res) {
    const review = await Review.findByPk(req.params.id)

    if (review === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        await Review.destroy({
            where: {
                id: req.params.id,
            },
        })

        res.status(204).end()
    }
}
module.exports = { getReview, getReviews, addReview, deleteReview }
