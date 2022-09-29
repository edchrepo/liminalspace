import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

// separating all functions in routes

//async because .find in PostMessage (finding something in model) takes time, we wait for it
export const getPosts = async (req, res) => {
    const { page } = req.query;
    try {
        const LIMIT = 4;
        //convert page back to number since it is first a string in req
        // get the starting index of every page
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        //newest post first and limits to limited number of posts, skip to the startIndex
        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//QUERY -> /posts?page=1 -> page = 1
//PARAMS -> /posts/:id -> /posts/123 -> id = 123 
//query used for queries (search), params used for getting specific resource

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags, name } = req.query

    try {
        const title = new RegExp(searchQuery, 'i'); // Test test TEST -> test ('i' ignore case)

        //find title or tags with $or
        //is one of the tags in the array of tags equal to our tags
        const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } }, { name: name } ]});

        //send res back to frontend
        res.json({ data: posts });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});
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

export const commentPost = async (req, res) => {
    const { id } = req.params;
    const { value } = req.body;

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true })

    res.json(updatedPost);
}