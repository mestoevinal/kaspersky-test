const {Schema, model, Types} = require('mongoose')
const paginate = require("mongoose-paginate-v2")

const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    group: { type: Types.ObjectId, ref: 'Group', required: false},
    account: { type: String, required: true},
    phone: {type: String, required: true},
})

schema.plugin(paginate);

module.exports = model('User', schema)