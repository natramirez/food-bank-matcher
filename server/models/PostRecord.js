const mongoose = require('mongoose');

const PostRecordSchema = new mongoose.Schema({
    location_name: {
        type: String,
        default: ''
    },
    location_lat: {
        type: String,
        default: ''
    },
    location_lng: {
        type: String,
        default: ''
    },
    post_title: {
        type: String,
        default: ''
    },
    post_user: {
        type: String,
        default: ''
    },
    post_id: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
    status: {
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

module.exports = mongoose.model('PostRecord', PostRecordSchema);
