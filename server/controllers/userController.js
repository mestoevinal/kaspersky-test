const User = require("../models/user")

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

async function getUsers(req, res) {
    const {
        limit,
        page,
        search,
        sortBy
    } = req.query

    let users
    let count
    try {
         if (!search) {
            users = await User.find()
                .populate('group', 'name')
                .sort(sortBy)
                .limit(Number(limit))
                .skip(Number(limit) * (Number(page) - 1))
            count = await User.find().count()
        } else {
            users = await User.find({$or: [{first_name: {$regex: search}}, {last_name: {$regex: search}}]})
                .populate('group', 'name')
                .sort(sortBy)
                .limit(Number(limit))
                .skip(Number(limit) * (Number(page) - 1))
            count = await User.find({$or: [{first_name: {$regex: search}}, {last_name: {$regex: search}}]}).count()
        }

        res.status(200).send({
            status: "ok",
            message: {
                users,
                count
            }
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
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

module.exports = {
    addUser,
    getUsers,
    removeUser
}
