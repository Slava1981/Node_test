const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let User_actionSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        field: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
    )
;

User_actionSchema.set('toJSON', {
    virtuals: true
})

module.exports = mongoose.model('User_action', User_actionSchema)