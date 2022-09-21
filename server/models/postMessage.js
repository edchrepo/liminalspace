import mongoose from 'mongoose';

// exporting mongoose model

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String], //array of Ids
        default: [],
    },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;