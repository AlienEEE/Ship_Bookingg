const { Raft, Package, Response } = require('../models')
const Upload = require('./upload')

async function getPackage(req, res) {
    const package = await Package.findByPk(req.params.id)

    if (package === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    }
    const raft = await Raft.findByPk(package.raft_id)
    Response.status = 'success'
    Response.data = {
        id: package.id,
        name: package.name,
        price: package.price,
        value: package.value,
        img: package.img,
        des: package.des,
        raft: {
            id: raft.id,
            name: raft.name,
            image: raft.img,
            des: raft.des,
        },
    }

    return res.status(200).json(Response)
}

async function getPackages(req, res) {
    const packages = await Package.findAll()

    if (packages === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    }

    let ArrayPackage = []
    for (const i of packages) {
        const raft = await Raft.findByPk(i.raft_id)

        Response.status = 'success'
        Response.data = {
            id: i.id,
            name: i.name,
            price: i.price,
            value: i.value,
            img: i.img,
            des: i.des,
            raft: {
                id: raft.id,
                name: raft.name,
                image: raft.img,
                des: raft.des,
            },
        }

        ArrayPackage.push(Response.data)
    }

    return res.status(200).json(ArrayPackage)
}
async function addPackage(req, res) {
    const { name, price, value, des, raft_id } = req.body
    const file = req.file
    console.log(name)
    try {
        const img = await Upload(file)
        const package = await Package.create({
            name: name,
            price: price,
            value: value,
            des: des,
            img: img,
            raft_id: raft_id,
        })

        Response.status = 'success'
        Response.data = package.dataValues

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors
        return res.status(400).json(Response)
    }
}

async function editPackage(req, res) {
    const { name, price, value, des, img, raftId, id } = req.body
    const file = req.file
    let package
    try {
        if (file == null) {
            package = await Package.update(
                {
                    name: name,
                    price: price,
                    value: value,
                    des: des,
                    img: img,
                    raft_id: raftId,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        } else {
            const img = await Upload(file)
            package = await Package.update(
                {
                    name: name,
                    price: price,
                    value: value,
                    des: des,
                    img: img,
                    raft_id: raftId,
                },
                {
                    where: {
                        id: id,
                    },
                }
            )
        }

        Response.status = 'success'
        Response.data = package

        res.status(200).json(Response)
    } catch (error) {
        Response.status = 'fail'
        Response.data = error.errors

        return res.status(400).json(Response)
    }
}

async function deletePackage(req, res) {
    const package = await Package.findByPk(req.params.id)
    if (package === null) {
        Response.status = 'fail'
        Response.data = 'Not found!'

        return res.status(404).json(Response)
    } else {
        await Package.destroy({
            where: {
                id: req.params.id,
            },
        })

        res.status(204).end()
    }
}

module.exports = {
    getPackage,
    getPackages,
    addPackage,
    editPackage,
    deletePackage,
}
