const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    }, author : {
        type: String,
        required: true
    }, description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Blog = mongoose.model('data', blogSchema);
module.exports = Blog;