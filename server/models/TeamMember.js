const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: ''
    },
    experience: {
        type: String,
        default: ''
    },
    goals: {
        type: String,
        default: ''
    },
    hobbies: {
        type: String,
        default: ''
    },
    image_src: {
        type: String,
        default: ''
    },
    img_alt: {
        type: String,
        default: ''
    },
    img_height: {
        type: String,
        default: ''
    },
    img_width: {
        type: String,
        default: ''
    }

});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
