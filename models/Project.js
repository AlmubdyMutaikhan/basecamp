const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
    title : {
        type : String
    },
    owners : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],
    goal : {
        type : String
    }
})


const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project