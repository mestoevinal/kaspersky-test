const User = require("../models/user")

async function getUsers(req, res) {
    const {
        limit_m,
        page_m,
        search,
        sortBy
    } = req.query

    let query = {};
    if (search) {
        query = {
            $or: [
                {first_name: {$regex: search}},
                {last_name: {$regex: search}}
            ]
        }
    }

    const options = {
        page: page_m,
        limit: limit_m,
        populate: [{
            path: 'group',
            select: 'name'
        }],
        sort: (sortBy)
    }

    User.paginate(query, options).then(data => {
        res.status(200).send({
            status: "ok",
            message: {
                users: data.docs,
                countPages: data.totalPages
            }
        })
    }).catch(error => {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    })
}


async function removeUser(req, res) {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "Пользователь не найден!"
            })
        }
        await user.remove()
        res.status(200).send({
            status: "ok",
            message: "Пользователь удалён!"
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
}

async function addUser(req, res) {
    const {first_name, last_name, email, group, account, phone} = req.body

    try {
        const user = await User.create({first_name, last_name, email, group, account, phone})
        res.status(200).send({
            status: "ok",
            message: user
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    addUser,
    getUsers,
    removeUser
}
