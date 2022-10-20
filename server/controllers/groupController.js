const Group = require("../models/group");

async function addGroup(req, res) {
    const {name} = req.body

    try {
        const group = await Group.create({name})
        res.status(200).send({
            status: "ok",
            message: group
        })
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message,
        });
    }
}

module.exports = {
    addGroup
}