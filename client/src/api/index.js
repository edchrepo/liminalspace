import axios from 'axios';

// const API = axios.create({ baseURL: 'https://cyan-victorious-clam.cyclic.app/' });
const API = axios.create({ baseURL: 'http://localhost:5000/' });

//happens to each request, happens before every req on the bottom
API.interceptors.request.use((req) => {
    //sending token back to backend so middleware can verify
    //add header to req
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})

//creating frontend functions from backend functions. API.get(xyz) is getting data from localhost:5000/xyz.
//sending to endposts ex:localhost:3000/posts
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = 
    (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}&name=${searchQuery.name}`) 
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (imgData) => API.patch('/user/update', imgData);