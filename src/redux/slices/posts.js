import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts');
    return data;
});

export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) => {
    await axios.delete(`/posts/${id}`);
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const {data} = await axios.get('/tags');
    return data;
});

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    }
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

    },
    extraReducers:{
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "success"
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error"
        },
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "success"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error"
        },
        [fetchRemovePosts.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg);
        },
    }
});

export const selectPosts = state => state.posts

export const postsReducer = postsSlice.reducer;