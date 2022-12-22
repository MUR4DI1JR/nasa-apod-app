import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts, fetchTags, selectPosts} from "../redux/slices/posts";

import PostItems from "../components/Posts";
import Sidebar from "../components/Sidebar";
import {selectUser} from "../redux/slices/auth";

const Home = () => {
    const {posts, tags} = useSelector(selectPosts);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, []);


    return (
        <div className="container mx-auto flex flex-wrap py-6">
            <section className = "w-full md:w-2/3 flex flex-col items-center px-3">
                {
                    posts.items.map(item => <PostItems key={item._id} {...item} />)
                }
            </section>
            <Sidebar tags={tags}/>
        </div>

    );
};

export default Home;