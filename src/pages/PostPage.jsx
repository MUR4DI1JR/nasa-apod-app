import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "../axios";
import dayjs from "dayjs";
import {InstagramLogo, TwitterLogo} from "phosphor-react";

const PostPage = () => {
    const [data, setData] = useState()
    const {id} = useParams();

    useEffect(() => {
        axios.get(`/posts/${id}`)
            .then(res => setData(res.data))
            .catch(e => console.log(e))
    }, []);

    return (
        <section className="w-full md:w-2/3 flex flex-col items-center px-3">
            <article className="flex flex-col shadow my-4">
                <div className="hover:opacity-75">
                    <img src={data?.imageURL}/>
                </div>
                <div className="bg-white flex flex-col justify-start p-6">
                    <div className="flex">
                        {
                            data?.tags.map((item, i) => <a key={i} href="#"
                                                           className="text-blue-700 text-sm font-bold uppercase pb-4 mr-[5px]">#{item}</a>)
                        }
                    </div>
                    <h3 className="text-3xl font-bold hover:text-gray-700 pb-4">{data?.title}</h3>
                    <p className="text-sm pb-8">
                        By <span className="font-semibold hover:text-gray-800">{data?.user.fullName}</span>, Published
                        on {dayjs(data?.createdAt).format(
                        'MM.DD.YYYY',
                    )}
                    </p>
                    <p className="pb-3">{data?.text}</p>
                </div>
            </article>

            <div className="w-full flex pt-6">
                <div className="w-1/2 bg-white shadow hover:shadow-md text-left p-6">
                    <Link to={'/'}>
                        <p className="text-lg text-blue-800 font-bold flex items-center"><i
                            className="fas fa-arrow-left pr-1"></i> Previous</p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </Link>
                </div>
                <div className="w-1/2 bg-white shadow hover:shadow-md text-right p-6">
                    <Link to={'/'}>
                        <p className="text-lg text-blue-800 font-bold flex items-center justify-end">Next <i
                            className="fas fa-arrow-right pl-1"></i></p>
                        <p className="pt-2">Lorem Ipsum Dolor Sit Amet Dolor Sit Amet</p>
                    </Link>
                </div>
            </div>

            <div className="w-full flex flex-col text-center md:text-left md:flex-row shadow bg-white mt-10 mb-10 p-6">
                <div className="w-full md:w-1/5 flex justify-center md:justify-start pb-4">
                    <img src={data?.user.avatarURL}
                         className="rounded-full shadow h-32 w-32"/>
                </div>
                <div className="flex-1 flex flex-col justify-center md:justify-start">
                    <p className="font-semibold text-2xl">{data?.user.fullName}</p>
                    <div
                        className="flex items-center justify-center md:justify-start text-2xl no-underline text-blue-800 pt-4">
                        {/*<a className="pl-4" href="https://www.instagram.com/muradil__m/">*/}
                        {/*    <InstagramLogo size={32} />*/}
                        {/*</a>*/}
                        {/*<a className="pl-4" href="https://twitter.com/muradiljr">*/}
                        {/*    <TwitterLogo size={32} />*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default PostPage;