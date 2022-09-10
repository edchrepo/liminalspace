import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// separating all functions in routes

//async because .find in PostMessage (finding something in model) takes time, we wait for it
export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

// /posts/123 <--fills id value 

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body; //<--sent from front end

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ... post, _id }, { new : true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    //check if id is valid
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully' });

}

export const likePost = async (req, res) => {
    const { id } = req.params;

    //req value carried over from auth middleware
    if(!req.userId) return res.json({ message: 'Unauthenticated' }); 

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await PostMessage.findById(id);

    //user already liked post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    //user is not there
    if(index === -1) {
        //like the post
        post.likes.push(req.userId);
    } else {
        //dislike the post
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    
    res.json(updatedPost);
}